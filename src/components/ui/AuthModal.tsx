"use client";

import React, { useState } from 'react';
import { FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Portal from './Portal';
import { auth, db, rtdb } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, set } from 'firebase/database';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');
    // Guard: auth may be null if Firebase wasn't initialized (e.g. during prerender or missing env)
    if (!auth) {
      setError('Authentication service is unavailable.');
      setLoading(false);
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (activeTab === 'signup') {
        // Check if user already exists in Firestore
          if (!db) {
            // If Firestore isn't initialized, proceed to completion step so user can finish profile locally.
            setAuthStep('google-complete');
            setFormData(prev => ({ 
              ...prev, 
              email: user.email || '',
              fullName: user.displayName || ''
            }));
            setLoading(false);
            return;
          }

          const userDoc = await getDoc(doc(db, "users", user.uid));
        
          if (!userDoc.exists()) {
          // For Google signup, move to completion step to get additional info
          setAuthStep('google-complete');
          setFormData(prev => ({ 
            ...prev, 
            email: user.email || '',
            fullName: user.displayName || ''
          }));
          setLoading(false);
          return;
        }
      }
      
      // For signin or existing user, directly authenticate
      onAuthenticated();
      onClose();
    } catch (error: unknown) {
      const message = typeof error === 'object' && error !== null && 'message' in error ? (error as { message?: unknown }).message : undefined;
      setError(typeof message === 'string' ? message : 'Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Guard: ensure auth and db are available before calling Firebase APIs
    if (!auth || !db) {
      setError('Authentication service is unavailable.');
      setLoading(false);
      return;
    }

    try {
      if (activeTab === 'signup') {
        // Signup functionality
        const { fullName, email, phoneNumber, password, confirmPassword, city } = formData;

        // Validate passwords match
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

  // 1. Create user in Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Update profile with full name
        await updateProfile(user, { displayName: fullName });

  // 3. Store additional info in Firestore and Realtime Database
  if (!db) throw new Error('Firestore not initialized');
  if (!rtdb) throw new Error('Realtime Database not initialized');

  const userData = {
    fullname: fullName,
    email,
    phone: phoneNumber,
    city,
    uid: user.uid,
    createdAt: new Date().toISOString(),
  };

  // // Save to Firestore
  // await setDoc(doc(db, "users", user.uid), userData);
  
  // Save to Realtime Database
  await set(ref(rtdb, `users/${user.uid}`), userData);

        onAuthenticated();
        onClose();
      } else {
  // Signin functionality
  const { email, password } = formData;
  await signInWithEmailAndPassword(auth, email, password);
        
        onAuthenticated();
        onClose();
      }
    } catch (error: unknown) {
      const message = typeof error === 'object' && error !== null && 'message' in error ? (error as { message?: unknown }).message : undefined;
      setError(typeof message === 'string' ? message : 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleTabSwitch = (tab: AuthTab) => {
    setActiveTab(tab);
    setAuthStep('auth');
    setError('');
    setLoading(false);
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
    setError('');
    setLoading(false);
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

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div 
        className="fixed inset-0 bg-black bg-opacity-80 flex items-start sm:items-center justify-center p-4 sm:p-6 pt-20 sm:pt-6"
        onClick={handleClose}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          zIndex: 999999,
          pointerEvents: 'auto'
        }}
      >
        <div 
          className="bg-white rounded-lg w-full max-w-md max-h-[80vh] sm:max-h-[90vh] overflow-y-auto relative mx-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
      >
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
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FcGoogle className="w-5 h-5" />
                <span className="font-medium text-gray-700">
                  {loading ? 'Processing...' : 'Continue with Google'}
                </span>
              </button>

              <div className="relative flex items-center justify-center mb-4">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="bg-white px-3 text-sm text-gray-500">or</span>
                <div className="border-t border-gray-300 w-full"></div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent text-black"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent text-black"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent text-black"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent text-black"
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
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent text-black"
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
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent text-black"
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
                  disabled={loading}
                  className="w-full bg-[#0063BF] text-white py-3 px-4 rounded-lg hover:bg-[#0056a3] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading 
                    ? (activeTab === 'signin' ? 'Signing In...' : 'Creating Account...') 
                    : (activeTab === 'signin' ? 'Sign In' : 'Create Account')
                  }
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

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setError('');

              try {
                // Guard: ensure auth and db are still available
                if (!auth || !db) {
                  setError('Authentication service is unavailable.');
                  setLoading(false);
                  return;
                }

                const user = auth.currentUser;
                    if (user) {
                      // Store additional info in Firestore
                  if (!db) throw new Error('Firestore not initialized');
                  if (!rtdb) throw new Error('Realtime Database not initialized');

                  const userData = {
                    fullname: formData.fullName,
                    email: formData.email,
                    phone: formData.phoneNumber,
                    city: formData.city,
                    uid: user.uid,
                    createdAt: new Date().toISOString(),
                    provider: 'google'
                  };

                  // Save to Firestore
                  await setDoc(doc(db, "users", user.uid), userData);
                  
                  // Save to Realtime Database
                  await set(ref(rtdb, `users/${user.uid}`), userData);                  onAuthenticated();
                  onClose();
                }
              } catch (error: unknown) {
                const message = typeof error === 'object' && error !== null && 'message' in error ? (error as { message?: unknown }).message : undefined;
                setError(typeof message === 'string' ? message : 'Failed to complete registration');
              } finally {
                setLoading(false);
              }
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent text-black"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent text-black"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063BF] focus:border-transparent text-black"
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
                disabled={loading}
                className="w-full bg-[#0063BF] text-white py-3 px-4 rounded-lg hover:bg-[#0056a3] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Completing Registration...' : 'Complete Registration'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
    </Portal>
  );
};

export default AuthModal;