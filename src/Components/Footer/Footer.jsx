import React from 'react'
import { FaSquarePhone } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";

const Footer = () => {
    return (
        <div className='bg-grey-200  border-t-2 border-b-2  flex flex-col md:flex-row justify-between items-center p-4 space-y-4 md:space-y-0'>
            <div className='flex flex-col w-80 justify-center items-center text-white border-r-2 border-white p-12 m-2'>
                <div className='flex flex-row justify-center items-center'>
                    <FaSquarePhone />
                    <p>Logo</p>
                </div>
                <p>Text</p>
            </div>

            <div className='-500 w-80 text-white border-r-2 border-white p-12 m-2'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-row justify-center items-center'>
                        <FaSquarePhone />
                        <p>Part 1</p>
                    </div>
                    <p>965644343</p>
                </div>
            </div>

            <div className='-500 w-80 text-white border-r-2 border-white p-12 m-2'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-row justify-center items-center'>
                        <FaSquarePhone />
                        <p>Part 1</p>
                    </div>
                    <p>965644343</p>
                </div>
            </div>

            <div className='-500 w-80 text-white border-r-2 border-white p-12 m-2'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-row justify-center items-center'>
                        <FaSquarePhone />
                        <p>Part 1</p>
                    </div>
                    <p>965644343</p>
                </div>
            </div>

            <div className='-500 w-80 text-white border-r-2 border-white p-12 m-2'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-row justify-center items-center'>
                        <FaSquarePhone />
                        <p>Part 1</p>
                    </div>
                    <p>965644343</p>
                </div>
            </div>
        </div>

    )
}

export default Footer
