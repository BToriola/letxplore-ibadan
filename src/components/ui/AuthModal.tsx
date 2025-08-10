"use client";

import React, { useState } from 'react';
import { FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

type AuthTab = 'signin' | 'signup';
type AuthStep = 'auth' | 'google-complete';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthenticated }) => {
  const [activeTab, setActiveTab] = useState<AuthTab>('signin');
  const [authStep, setAuthStep] = useState<AuthStep>('auth');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',
    password: '',
    confirmPassword: '',
  });

  const cities = ['Ibadan', 'Lagos', 'Abeokuta', 'Abuja', 'Port Harcourt', 'Kano'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoogleAuth = () => {
    // Simulate Google auth
    if (activeTab === 'signup') {
      // For Google signup, move to completion step
      setAuthStep('google-complete');
      setFormData(prev => ({ ...prev, email: 'user@gmail.com' })); // Simulate Google email
    } else {
      // For Google signin, directly authenticate
      onAuthenticated();
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthenticated();
    onClose();
  };

  const handleTabSwitch = (tab: AuthTab) => {
    setActiveTab(tab);
    setAuthStep('auth');
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      city: '',
      password: '',
      confirmPassword: '',
    });
  };

  const resetModal = () => {
    setActiveTab('signin');
    setAuthStep('auth');
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      city: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-[9999] p-4 sm:p-6 pt-24 sm:pt-6">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[75vh] sm:max-h-[90vh] overflow-y-auto relative mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {authStep === 'google-complete' ? 'Complete Your Profile' : 'Welcome'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {authStep === 'auth' && (
          <>
            {/* Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => handleTabSwitch('signin')}
                className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                  activeTab === 'signin'
                    ? 'text-[#0063BF] border-b-2 border-[#0063BF]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => handleTabSwitch('signup')}
                className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                  activeTab === 'signup'
                    ? 'text-[#0063BF] border-b-2 border-[#0063BF]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              {/* Google Auth Button */}
              <button
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-4"
              >
                <FcGoogle className="w-5 h-5" />
                <span className="font-medium text-gray-700">
                  Continue with Google
                </span>
              </button>

              <div className="relative flex items-center justify-center mb-4">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="bg-white px-3 text-sm text-gray-500">or</span>
                <div className="border-t border-gray-300 w-full"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {activeTab === 'signup' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent"
                        required
                      >
                        <option value="">Select your city</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {activeTab === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#0063BF] text-white py-3 px-4 rounded-lg hover:bg-[#0056a3] transition-colors font-medium"
                >
                  {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              {/* Switch tab link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                {activeTab === 'signin' ? (
                  <>
                    Don&apos;t have an account?{' '}
                    <button
                      onClick={() => handleTabSwitch('signup')}
                      className="text-[#0063BF] hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => handleTabSwitch('signin')}
                      className="text-[#0063BF] hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </div>
          </>
        )}

        {/* Google Sign Up Completion */}
        {authStep === 'google-complete' && (
          <div className="p-4 sm:p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Please complete your profile to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent"
                  required
                >
                  <option value="">Select your city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0063BF] text-white py-3 px-4 rounded-lg hover:bg-[#0056a3] transition-colors font-medium"
              >
                Complete Registration
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
