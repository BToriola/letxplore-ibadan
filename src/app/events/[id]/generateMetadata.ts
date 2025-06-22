import { events } from '@/data/events';

// This function generates static params for all event IDs at build time
export async function generateStaticParams() {
  // Return an array of objects with id params for each event
  return events.map((event) => ({
    id: event.id,
  }));
}

// Generate metadata for each event page
export async function generateMetadata({ params }: { params: { id: string } }) {
  const event = events.find(e => e.id === params.id);
  
  return {
    title: event ? `${event.title} | Let's Explore` : 'Event Not Found',
    description: event 
      ? `Join us at ${event.title} on ${event.date} at ${event.location}. ${event.price === 'Free' ? 'Free entry' : `Price: ${event.price}`}` 
      : 'This event could not be found.',
  };
}
