import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id, name, content, isApproved } = comment;
  const BlogDate = new Date(createdAt);

  const {axios} = useAppContext();


  const approveComment = async () => {
    try {
      const {data} = await axios.post('/api/admin/comment/approve', {id: _id});
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message);
    }
  }

  const deleteComment = async () => {
    try {
      const confirm = window.confirm('are you sure you want to delete this comment?');

      const {data} = await axios.post('/api/admin/comment/delete', {id: _id});
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message);
    }
  }


  return (
    <tr className='border-y border-gray-300'>
      <td className='px-6 py-4'>
        <b>Blog</b>: {blog.title}
        <br />
        <br />
        <b className='font-medium text-gray-600'>Name</b>: {name}
        <br />
        <b className='font-medium text-gray-600'>Comment</b>: {content}
      </td>

      <td className='px-6 py-4 hidden sm:table-cell'>
        {blogDate.toLocaleDateString()}
      </td>

      <td className='px-6 py-4'>
        <div className='inline-flex items-center gap-4'>
          {!isApproved ? (
            <img
              src={assets.tick_icon}
              className='w-5 hover:scale-110 transition-all cursor-pointer'
              alt="Approve"
              onClick={() => {
                approveComment
              }}
            />
          ) : (
            <p className='text-xs border border-green-600 text-green-600 rounded-full px-3 py-1'>
              Approved
            </p>
          )}
          <img 
            src={assets.bin_icon}
            alt="Delete"
            className='w-5 hover:scale-110 transition-all cursor-pointer'
            onClick={() => {
              deleteComment
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
