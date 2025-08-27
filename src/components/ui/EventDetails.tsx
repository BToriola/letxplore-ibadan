import React from 'react';

interface EventDetailsProps {
  event: {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    date: string;
    time: string;
    location: string;
    price: number;
    category: string;
    organizer: string;
    capacity: number;
    attendees: number;
    rating: number;
    tags: string[];
  };
}

export default function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">About This Event</h2>
      <p className="text-gray-700 mb-4">{event.longDescription}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Event Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span>{event.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span>{event.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span>₦{event.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Additional Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span>{event.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Organizer:</span>
              <span>{event.organizer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Capacity:</span>
              <span>{event.capacity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Attendees:</span>
              <span>{event.attendees}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
