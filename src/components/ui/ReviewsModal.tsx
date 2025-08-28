"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, StarEmpty } from "@/components/icons/SvgIcons";
import { useComments } from "@/hooks/useApi";

interface ReviewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventId: string;
}

const ReviewsModal = ({ isOpen, onClose, eventId }: ReviewsModalProps) => {
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    console.log('ReviewsModal eventId:', eventId);
    
    const { comments, loading, error, addComment } = useComments(eventId);

    const handleSubmit = async () => {
        if (!selectedRating || !reviewText.trim()) {
            alert("Please provide both a rating and review text");
            return;
        }

        setIsSubmitting(true);
        try {
            console.log('Submitting review with data:', {
                content: reviewText.trim(),
                rating: selectedRating,
                userId: "user-123",
                username: "Anonymous User"
            });
            
            await addComment({
                content: reviewText.trim(),
                rating: selectedRating,
                userId: "user-123", // TODO: Replace with actual user ID from authentication
                username: "Anonymous User" // TODO: Replace with actual username from authentication
            });
            
            console.log('Review submitted successfully');
            
            // Reset form
            setSelectedRating(0);
            setReviewText("");
            
            // Show success message
            alert("Review submitted successfully!");
            
            // Optionally close modal after successful submission
            // onClose();
        } catch (error) {
            console.error("Failed to submit review:", error);
            
            // Get more specific error message
            let errorMessage = "Failed to submit review. Please try again.";
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            
            alert(`Error: ${errorMessage}`);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full text-black p-4 md:p-3 border border-gray-200 md:border-[#939393] rounded-2xl resize-none h-32 md:h-44 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:focus:ring-0"
                    />
                    <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting || !selectedRating || !reviewText.trim()}
                        className="w-full mt-4 bg-[#0063BF] text-white text-base py-4 rounded-2xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>

                {/* Reviews List */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 md:overflow-y-auto md:max-h-96 md:px-0 md:pb-0">
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-sm text-gray-500">Loading reviews...</div>
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-sm text-red-500">Failed to load reviews</div>
                        </div>
                    ) : comments.length === 0 ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-sm text-gray-500">No reviews yet. Be the first to review!</div>
                        </div>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment.id} className="py-4 border-b border-gray-100 last:border-b-0 md:py-2 md:px-6 md:border-b-0">
                                <div className="flex items-center mb-3">
                                    <Image
                                        src={comment.userAvatar || "/default.svg"}
                                        alt={comment.username}
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover mr-3"
                                    />
                                    <div>
                                        <h3 className="text-sm md:text-xs font-medium md:py-1 text-[#1c1c1c]">{comment.username}</h3>
                                        <p className="text-xs text-gray-500 md:text-[#1c1c1c]">
                                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                {comment.rating && (
                                    <div className="flex text-[#FFA300] mb-3 space-x-1">
                                        {Array.from({ length: 5 }).map((_, j) => (
                                            j < comment.rating! ? (
                                                <Star key={j} width={16} height={16} />
                                            ) : (
                                                <StarEmpty key={j} width={16} height={16} />
                                            )
                                        ))}
                                    </div>
                                )}
                                <p className="text-sm md:text-xs text-[#1c1c1c] leading-relaxed">
                                    {comment.content}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewsModal;
