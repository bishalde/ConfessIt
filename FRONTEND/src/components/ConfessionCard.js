'use client';

import { useState } from 'react';
import { FiHeart, FiTrash2, FiClock } from 'react-icons/fi';
import { confessionAPI } from '@/utils/api';

export default function ConfessionCard({ confession, onDelete, currentUserId }) {
  const [likes, setLikes] = useState(confession.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 mb-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              categoryColors[confession.category] || categoryColors.other
            }`}
          >
            {confession.category}
          </span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <FiClock size={14} className="mr-1" />
          <span>{formatDate(confession.createdAt)}</span>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 mb-4 leading-relaxed font-inter">{confession.content}</p>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 transition ${
            isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          <FiHeart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          <span className="font-semibold">{likes}</span>
        </button>

        {currentUserId === confession.userId && (
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition"
          >
            <FiTrash2 size={18} />
            <span className="text-sm">Delete</span>
          </button>
        )}
      </div>
    </div>
  );
}
