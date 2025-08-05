"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, StarEmpty } from "@/components/icons/SvgIcons";

interface ReviewsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReviewsModal = ({ isOpen, onClose }: ReviewsModalProps) => {
    const [selectedRating, setSelectedRating] = useState<number>(0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-end md:items-center justify-center md:p-4">
            <div className="bg-white rounded-t-3xl md:rounded-lg w-full h-[calc(100vh-140px)] md:max-w-2xl md:w-full md:max-h-[90vh] md:h-auto overflow-hidden md:px-6">
                <div className="flex items-center justify-between pt-6 px-6 md:pt-10">
                    <h2 className="text-lg md:text-sm font-semibold text-[#1c1c1c]">Ratings and reviews</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6 text-[#1c1c1c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Star Rating Section */}
                <div className="px-6 py-4 md:p-6">
                    <div className="flex text-[#FFA300] mb-4 space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const starIndex = i + 1;
                            return (
                                <button
                                    key={i}
                                    onClick={() => setSelectedRating(starIndex)}
                                    className="transition-all hover:scale-110 transform"
                                >
                                    {starIndex <= selectedRating ? (
                                        <Star width={24} height={24} />
                                    ) : (
                                        <StarEmpty width={24} height={24} />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-sm md:text-xs text-gray-500 md:text-[#939393] mb-3 md:mb-2">Write your review</p>
                    <textarea
                        placeholder="Type here"
                        className="w-full p-4 md:p-3 border border-gray-200 md:border-[#939393] rounded-2xl resize-none h-32 md:h-44 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:focus:ring-0"
                    />
                    <button className="w-full mt-4 bg-[#0063BF] text-white text-base py-4 rounded-2xl font-semibold hover:bg-blue-700 transition-colors">
                        Submit
                    </button>
                </div>

                {/* Reviews List */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 md:overflow-y-auto md:max-h-96 md:px-0 md:pb-0">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="py-4 border-b border-gray-100 last:border-b-0 md:py-2 md:px-6 md:border-b-0">
                            <div className="flex items-center mb-3">
                                <Image
                                    src="/default.svg"
                                    alt="Ayobami Israel"
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover mr-3"
                                />
                                <div>
                                    <h3 className="text-sm md:text-xs font-medium md:py-1 text-[#1c1c1c]">Ayobami Israel</h3>
                                    <p className="text-xs text-gray-500 md:text-[#1c1c1c]">16 minute ago</p>
                                </div>
                            </div>
                            <div className="flex text-[#FFA300] mb-3 space-x-1">
                                {Array.from({ length: 4 }).map((_, j) => <Star key={j} width={16} height={16} />)}
                                <StarEmpty width={16} height={16} />
                            </div>
                            <p className="text-sm md:text-xs text-[#1c1c1c] leading-relaxed">
                                Let&apos;sExplore have the best and surest location to have fun. And the website is so easy to use. Let&apos;sExplore easy to use. Let&apos;sExplore
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewsModal;
