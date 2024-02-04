import React, { useContext, useEffect, useState } from 'react';
import { LinkedInEmbed } from 'react-social-media-embed';
import { FaUserPen } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { TfiComments } from "react-icons/tfi";
import { IoMdShareAlt } from "react-icons/io";
import { StaffUserServices, StudentUserServices } from '../services/authservices';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/contex';
import io from 'socket.io-client';
import BlogComment from './BlogComment';

const BlogPostComponent = ({ title, content, id, data, setdata, item, setShowForm, showForm, user_id }) => {

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser_id] = useState('');
  const { setblogpost, blogpost } = useContext(AuthContext);
  const [likeCount, setLikeCount] = useState(0);
  const [socket, setSocket] = useState(null);
  const [click, setclick] = useState(false)

  console.log("This is the item", item?.image_url)
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const likebutton = async (id) => {

    try {
      // Send a like for the post
      const response = await StudentUserServices.LikesForThePost(id);
      setdata(response?.data);
    } catch (error) {
      console.log(error);
    }
  };




  const UserDetail = async () => {
    try {
      const response = await StaffUserServices.UserDetails();
      setUser_id(response?.user_id?.id)
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    UserDetail()

  }, [])

  const deletepost = async () => {
    try {
      const response = await StudentUserServices.removeBlogPost(id)
      if (response?.status == 204) {
        toast.success("Post is deleted Successfully")
        const updatedDatas = data?.filter(item => item.id !== id);
        setdata(updatedDatas)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const editpost = () => {

    const edited_data = data?.filter(item => item.id === id)
    if (edited_data && edited_data.length > 0) {
      setblogpost(edited_data);
    } else {
      // Handle the case when no matching data is found (optional)
      console.error("No matching data found for the specified ID");
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: smooth scrolling animation
    });
    setShowForm(!showForm)
    try {
    } catch (error) {

    }
  }


  const formattedDate = new Date(item.date_posted).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });






  return (
    <div>
      <div className='bg-white p-6 mb-8  shadow-md'>
        <div className=' flex'>
          <div className="flex items-center">
            <img
              src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
              alt=""
              className="ml-2 w-10 h-10 rounded-xl"
            />
            <div>
              <p className='text-xs'>{item?.author?.first_name} {item.author.last_name}</p>
              <p className='text-xs'>{formattedDate}</p>
            </div>
            {
              user && user == user_id &&
              <button
                id="dropdownMenuIconButton"
                data-dropdown-toggle="dropdownDots"
                data-dropdown-placement="bottom-start"
                className="flex-shrink-0 inline-flex self-center items-center p-2 text-sm font-medium 
              text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 
              focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800
              dark:focus:ring-gray-600"
                type="button"
                onClick={toggleDropdown}
              >
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 4 15"
                >
                  <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </button>
            }
          </div>

          <div

            id="dropdownDots"
            className={`z-10 ${isDropdownVisible ? '' : 'hidden'}   absolute left-44 `}
          >
            <ul className="text-xs flex-col">
              <li>
                <button
                  onClick={editpost}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => { deletepost(id) }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Remove
                </button>
              </li>
            </ul>


          </div>
        </div>

        {item?.image_url &&
          <div className='h-60'>
            <img
              src={item?.image_url}
              className="img-fluid rounded-top"
              alt=""
            />
          </div>
        }
        <div className="mt-4">
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>{title}</h2>
          <p className='text-gray-700'>{content}</p>
        </div>
        <div className='flex'>
          <div className='p-4'
            onClick={() => { likebutton(id) }}
            style={{ cursor: 'pointer' }}
          >
            {item.user_like_status ?
              <FcLike style={{ fontSize: '24px' }} /> :
              <FcLikePlaceholder style={{ color: 'black', fontSize: '24px' }} />}
          </div>
          <div className='p-4'
            onClick={() => { setclick(!click) }}
            style={{ cursor: 'pointer' }}
          >
            <TfiComments style={{ fontSize: '24px' }} />
          </div>
          <div className='p-4'
            style={{ cursor: 'pointer' }}
          >
            <IoMdShareAlt style={{ fontSize: '24px' }} />
          </div>
        </div>
        <BlogComment click={click} id={id} />
      </div>
    </div >
  );
};

export default BlogPostComponent;
