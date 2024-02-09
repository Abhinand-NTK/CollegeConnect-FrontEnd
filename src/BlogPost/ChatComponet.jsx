
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { AuthContext } from '../context/contex';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from '../services/authservices';
import { FiSend } from "react-icons/fi";
import { useNavigate, useParams } from 'react-router-dom';
import { RiMailSendFill } from "react-icons/ri";
import { FcNext } from "react-icons/fc";


const ChatComponent = () => {
    const navigate = useNavigate()
    const { receiver } = useContext(AuthContext);
    const [connection, setConnections] = useState()
    // const scrollref=useRef()
    const token = localStorage.getItem('Token');
    const data_user = jwtDecode(token);
    const [message, setMessage] = useState('');
    const [resmessage, setResMessage] = useState('');
    const { re } = useParams()
    const [messageData, setMessageData] = useState('');


    const sendMessage = async () => {

        const updatedMessageData = {
            sender: data_user.user_id,
            receiver: re,
            content: message,
            timestamp: new Date().toISOString(),
        };
        // setResMessage(sendMessage);

        setResMessage((prev) => [...prev, updatedMessageData])



        const response = await MessageService.Messaging(updatedMessageData);

    };

    const getmessages = async () => {
        try {
            const messages_his = await MessageService.GetMessaging(re);
            const sortedMessages = messages_his?.data.sort((a, b) => {
                // Assuming 'timestamp' is a string in the format "2024-02-03T07:18:39.171461Z"
                const timestampA = new Date(a.timestamp).getTime();
                const timestampB = new Date(b.timestamp).getTime();

                // Sort in ascending order (oldest first), modify the comparison for descending order
                return timestampA - timestampB;
            });

            setResMessage(sortedMessages);

        } catch (error) {

        }
    }

    const cconnections = async () => {
        try {
            const connections = await MessageService.Connections()
            setConnections(connections?.data)
        } catch (error) {

        }
    }


    useEffect(() => {
        getmessages()
        cconnections()

        // const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${data_user.user_id}/`);
        const socket = new WebSocket(`wss://studentconnect.tech/ws/chat/${data_user.user_id}/`);


        socket.onopen = (event) => {
            console.log('WebSocket connection opened:', event);

            socket.send(JSON.stringify({
                type: 'private',
                message: message,
                sender: 'John',
                receiver: receiver,
            }));
        };

        socket.onmessage = (event) => {
            console.log("Working the event")
            const receivedMessage = JSON.parse(event.data);
            console.log('Received message:', receivedMessage);
            setResMessage((prev) => [...prev, receivedMessage])
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };


    }, [data_user?.user_id]);



    const extractTimeFromTimestamp = (timestamp) => {
        if (!timestamp) {
            // Handle case where timestamp is undefined or null
            return "No timestamp provided";
        }

        const timePart = timestamp.split('T')[1];

        if (!timePart) {
            // Handle case where the time part is missing
            return "Invalid timestamp format";
        }

        const extractedTime = timePart.split('.')[0];

        return extractedTime;
    };


    const handleClick = (id) => {
        navigate(`/users/messages/${id}`);
        getmessages()
    };



    return (
        <section className='bg-white p-4 md:p-10 lg:p-16 mt-8 md:mt-24 h-auto md:h-[600px]'>
            <Layout />
            <div className='flex ml-20'>
                <div
                    className='flex-1 scrollNone p-2 w-full sm:w-1/2  sm:p-6 overflow-y-scroll 
                    items-center border-4  flex flex-col h-screen'>
                    {connection && connection.map((item, index) => (
                        <div
                            onClick={() => (handleClick(item.id))}
                            style={{cursor:'pointer'}}
                            className='w-full flex gap-5 text-center  p-4   shadow-md shadow-gray-600 rounded-sm '>
                            <img
                                key={index}
                                className='h-5 w-5'
                                src="https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg" alt="" />
                            <span>
                                {item?.first_name}
                                {item?.last_name}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex-1 p-2 w-full sm:w-1/2 border-4 sm:p-6 justify-between  flex flex-col h-screen">
                    {/* <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                        <div className="relative flex items-center space-x-4">
                            <div className="relative">
                                <span className="absolute text-green-500 right-0 bottom-0">
                                    <svg width="20" height="20">
                                        <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                                    </svg>
                                </span>
                                <img
                                    src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                                    alt=""
                                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                                />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <div className="text-2xl mt-1 flex items-center">
                                    <span className="text-gray-700 mr-3">Anderson Vanhron</span>
                                </div>
                                <span className="text-lg text-gray-600">Junior Developer</span>
                            </div>
                        </div>
                    </div> */}


                    <div className='overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch focus:outline-none focus:placeholder-gray-40'>
                        {resmessage && resmessage.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-col w-48 space-y-2 p-3 mt-2  text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md py-1
                                ${item?.sender === data_user?.user_id ? "" : "ml-48"}`}
                            >
                                <div className="w-full ">
                                    <p>{item?.content}</p>
                                    <p className='text-xs text-end'>{extractTimeFromTimestamp(item?.timestamp)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                        <div className="relative flex">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write your message!"
                                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                            />
                            <div
                                onClick={sendMessage}
                                className="cursor-pointer h-12 w-12 items-center flex justify-center bg-red-300"

                            >
                                {/* <RiMailSendFill  /> */}
                                <FcNext />
                            </div>
                            {/* You can add more components or options here */}
                        </div>
                    </div>

                    {/* <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                        <div className="relative flex">
                            <input
                                type="text"
                                onChange={(e) => { setMessage(e.target.value) }}
                                placeholder="Write your message!"
                                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                            />
                            <div
                                onClick={sendMessage}
                            >
                                <FiSend />
                            </div>
                            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                            </div>
                        </div>
                    </div> */}
                </div>

            </div>

        </section>
    );
};

export default ChatComponent;
