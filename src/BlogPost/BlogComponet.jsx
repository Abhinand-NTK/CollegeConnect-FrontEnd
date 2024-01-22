import React from 'react';

const BlogPostComponent = ({ title, content }) => {
  return (
    <div className='bg-white p-6 mb-8 rounded-lg shadow-md'>
      <div className="relative overflow-hidden rounded-xl h-52">
        <img
          src="https://pic.onlinewebfonts.com/thumbnails/icons_241614.svg"
          alt=""
          className='absolute top-2 left-2 w-10 h-10 rounded-xl'
        />
        <img
          className='w-full h-full object-cover rounded-xl'
          src="https://via.placeholder.com/800x400"  // Placeholder image
          alt=""
        />
      </div>
      <div className="mt-4">
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>{title}</h2>
        <p className='text-gray-700'>{content}</p>
      </div>
    </div>
  );
};

export default BlogPostComponent;
