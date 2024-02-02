
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { StudentUserServices } from '../services/authservices';
import toast from 'react-hot-toast';
import { MdDeleteOutline } from "react-icons/md";
import { jwtDecode } from 'jwt-decode';


const BlogComment = ({ id, click }) => {
    const [comments, setComments] = useState([]);
    const [commentDates, setCommentDates] = useState([]);
    const token = localStorage.getItem('Token')
    const [user_id, setUser_id] = useState(jwtDecode(token).user_id)

    const delcomment = async (comment_id) => {
        try {
            const response = await StudentUserServices.deletecomment(comment_id)
            const updatedDatas = comments?.filter(item => item.id !== comment_id);
            setComments(updatedDatas)
            console.log("the deleted response", response)
            if (response.status == 204) {
                toast.success("The comment is delted successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = async (id) => {
        try {
            const response = await StudentUserServices.GetCommentsForThePost(id);
            setComments(response?.data);
            const dates = response?.data.map((comment) => {
                const commentDate = new Date(comment?.date_commented);
                return {
                    day: commentDate.getDate(),
                    month: commentDate.toLocaleString('default', { month: 'long' }),
                    year: commentDate.getFullYear(),
                };
            });

            setCommentDates(dates);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };


    const formik = useFormik({
        initialValues: {
            content: '',
            blogid: id,
        },
        onSubmit: async (values, { resetForm }) => {
            const response = await StudentUserServices.CommentsForThePost(values)
            if (response.status == 201) {
                toast.success('Comment is added successfully')
                setComments(response?.data)
                const dates = response?.data.map((comment) => {
                    const commentDate = new Date(comment?.date_commented);
                    return {
                        day: commentDate.getDate(),
                        month: commentDate.toLocaleString('default', { month: 'long' }), // Use 'short' for abbreviated month
                        year: commentDate.getFullYear(),
                    };
                });
                setCommentDates(dates);
            }
            resetForm();
        },
    });


    console.log("comments are this", comments)

    useEffect(() => {
        if (click) {
            fetchComments(id);
        }
    }, [click]);

    return (
        <div>
            {
                click &&
                <div className="comment-section bg-white p-4 rounded-md">
                    {comments && comments.map((comment, index) => (
                        <div key={comment.id} className="bg-white shadow-md p-4 mb-4 rounded-lg">
                            <div className="text-lg font-semibold mb-2">{comment?.content}</div>
                            <div className="flex justify-between items-center text-gray-500">
                                <div className="text-sm">{`${commentDates[index]?.day} ${commentDates[index]?.month} ${commentDates[index]?.year}`}</div>
                                <div className="flex items-center">
                                    <span className="mr-2">{comment?.user_commented?.first_name}</span>
                                    <span className="font-bold">{comment?.user_commented?.last_name}</span>
                                </div>
                                {
                                    comment?.author === user_id &&
                                    <div
                                        onClick={() => { delcomment(comment?.id) }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <MdDeleteOutline />
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                    <form onSubmit={formik.handleSubmit} className="mt-4">
                        <input
                            type="text"
                            id="content"
                            name="content"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.content}
                            className="w-full p-2 border rounded-md"
                            placeholder="Add a comment..."
                        />
                        <button
                            type="submit"
                            className="mt-2 bg-indigo-900 text-white p-2 rounded-md hover:bg-indigo-950  focus:outline-none focus:ring focus:border-indigo-300"
                        >
                            Add Comment
                        </button>
                    </form>
                </div>

            }
        </div>
    );
};

export default BlogComment;
