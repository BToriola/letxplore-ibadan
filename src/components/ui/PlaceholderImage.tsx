"use client";

import React from 'react';
import Image from 'next/image';

interface PlaceholderImageProps {
  text?: string;
  width?: number;
  height?: number;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  text = 'Placeholder',
  width = 300,
  height = 200,
  bgColor = '#2563eb', // Blue
  textColor = '#ffffff', // White
  className = '',
}) => {
  return (
    <div 
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="text-center p-4 font-medium">
        {text}
      </div>
    </div>
  );
};

export default PlaceholderImage;
