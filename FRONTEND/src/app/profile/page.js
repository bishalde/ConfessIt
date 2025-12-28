'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { userAPI } from '@/utils/api';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getProfile();
      const userData = response.data.user || response.data;
      setUser(userData);
      setFormData({
        username: userData.username || '',
        email: userData.email || '',
        bio: userData.bio || '',
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      // If API fails, use localStorage data
      const localUser = localStorage.getItem('user');
      if (localUser) {
        const userData = JSON.parse(localUser);
        setUser(userData);
        setFormData({
          username: userData.username || '',
          email: userData.email || '',
          bio: userData.bio || '',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const response = await userAPI.updateProfile(formData);
      const updatedUser = response.data.user || response.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user.username || '',
      email: user.email || '',
      bio: user.bio || '',
    });
    setIsEditing(false);
    setMessage('');
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-poppins text-gray-800 mb-2">
              My Profile
            </h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {formData.username?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            {message && (
              <div className={`mb-6 px-4 py-3 rounded-lg ${
                message.includes('success')
                  ? 'bg-green-50 border border-green-200 text-green-600'
                  : 'bg-red-50 border border-red-200 text-red-600'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg outline-none transition ${
                      isEditing
                        ? 'border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg outline-none transition ${
                      isEditing
                        ? 'border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                    required
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg outline-none transition resize-none ${
                      isEditing
                        ? 'border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {/* Buttons */}
                <div className="flex space-x-4 pt-4">
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => {
                        console.log('Edit Profile clicked');
                        setIsEditing(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition duration-300 flex items-center justify-center space-x-2"
                    >
                      <FiEdit2 size={18} />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <>
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        <FiSave size={18} />
                        <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 flex items-center justify-center space-x-2"
                      >
                        <FiX size={18} />
                        <span>Cancel</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
