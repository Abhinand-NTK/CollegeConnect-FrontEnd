// BlogComment.js

import React, { useState } from 'react';
import { useFormik } from 'formik';

const BlogComment = ({ postId }) => {
  const [comments, setComments] = useState([]);

  // Example: Fetch comments for the postId and update the state
  // This is a placeholder function; replace it with your actual API call.
  const fetchComments = async () => {
    // Implement your API call to fetch comments based on the postId
    // For example:
    // const response = await fetch(`/api/comments/${postId}`);
    // const data = await response.json();
    // setComments(data);
  };

  // Use Formik for comment submission
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    onSubmit: async (values, { resetForm }) => {
      // Example: Send the comment to the server and update the state
      // This is a placeholder function; replace it with your actual API call.
      const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: values.comment }),
      });

      const data = await response.json();
      setComments(data);

      // Reset the form after submission
      resetForm();
    },
  });

  // useEffect to fetch comments when the component mounts
  useEffect(() => {
    fetchComments();
  }, [postId]); // Fetch comments whenever the postId changes

  return (
    <div className="comment-section">
      {/* Render comments here */}
      {comments.map((comment) => (
        <div key={comment.id}>{comment.text}</div>
      ))}

      {/* Form for adding new comments */}
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          id="comment"
          name="comment"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default BlogComment;
