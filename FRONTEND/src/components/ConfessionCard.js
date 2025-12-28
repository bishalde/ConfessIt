'use client';

import { useState, useEffect } from 'react';
import { FiHeart, FiTrash2, FiClock, FiMessageCircle, FiSend } from 'react-icons/fi';
import { confessionAPI } from '@/utils/api';

export default function ConfessionCard({ confession, onDelete, currentUserId }) {
  const [likes, setLikes] = useState(confession.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(confession.comments || []);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  // Load comments when component mounts or when toggling comments
  useEffect(() => {
    if (showComments && comments.length === 0) {
      loadComments();
    }
  }, [showComments]);

  const categoryColors = {
    love: 'bg-pink-100 text-pink-700',
    work: 'bg-blue-100 text-blue-700',
    family: 'bg-green-100 text-green-700',
    friendship: 'bg-yellow-100 text-yellow-700',
    secret: 'bg-purple-100 text-purple-700',
    regret: 'bg-red-100 text-red-700',
    achievement: 'bg-teal-100 text-teal-700',
    other: 'bg-gray-100 text-gray-700',
  };

  const handleLike = async () => {
    try {
      await confessionAPI.like(confession._id);
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Failed to like confession:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this confession?')) {
      try {
        await confessionAPI.delete(confession._id);
        onDelete(confession._id);
      } catch (error) {
        console.error('Failed to delete confession:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    
    // Format time
    const timeString = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago • ${timeString}`;
    if (diffHours < 48) return `Yesterday at ${timeString}`;
    if (diffHours < 168) {
      const days = Math.floor(diffHours / 24);
      return `${days}d ago • ${timeString}`;
    }
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    }) + ` at ${timeString}`;
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      setCommentLoading(true);
      try {
        const response = await confessionAPI.addComment(confession._id, { text: newComment });
        const newCommentData = response.data.comment;
        setComments([...comments, newCommentData]);
        setNewComment('');
      } catch (error) {
        console.error('Failed to add comment:', error);
        alert('Failed to add comment. Please try again.');
      } finally {
        setCommentLoading(false);
      }
    }
  };

  const loadComments = async () => {
    try {
      const response = await confessionAPI.getComments(confession._id);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  };

  const getUsername = () => {
    return confession.user?.username || confession.username || 'Anonymous';
  };

  const getInitial = () => {
    const username = getUsername();
    return username.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 mb-5 border border-purple-100 transform hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-base font-bold">{getInitial()}</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">{getUsername()}</div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                categoryColors[confession.category] || categoryColors.other
              }`}
            >
              {confession.category}
            </span>
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-sm bg-gray-50 px-3 py-1 rounded-full">
          <FiClock size={14} className="mr-1" />
          <span className="font-medium">{formatDate(confession.createdAt)}</span>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 mb-4 leading-relaxed font-inter text-base">{confession.content}</p>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition duration-300 transform hover:scale-110 ${
              isLiked 
                ? 'text-rose-500 bg-rose-50' 
                : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
            }`}
          >
            <FiHeart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{likes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-gray-600 hover:text-violet-600 hover:bg-violet-50 transition duration-300"
          >
            <FiMessageCircle size={20} />
            <span>{comments.length}</span>
          </button>
        </div>

        {currentUserId === confession.userId && (
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition duration-300 font-semibold"
          >
            <FiTrash2 size={18} />
            <span className="text-sm">Delete</span>
          </button>
        )}
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-3 mb-4">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{comment.username.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm text-gray-800">{comment.username}</span>
                        <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Comment */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
            />
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="bg-gradient-to-r from-violet-600 to-rose-600 text-white p-2 rounded-lg hover:from-violet-700 hover:to-rose-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
