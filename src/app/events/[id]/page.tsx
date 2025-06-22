import { events } from '@/data/events';
import ClientEventDetail from './ClientEventDetail';
import { Metadata } from 'next';
import { EventCardProps } from '@/components/ui/EventCard';

// Generate static params for all event IDs at build time
export function generateStaticParams() {
  return events.map((eventItem) => ({
    id: eventItem.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id: eventId } = await params;
  const eventData = events.find(e => e.id === eventId);
  
  if (!eventData) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.'
    };
  }

  return {
    title: eventData.title,
    description: `${eventData.description || 'Join us at ' + eventData.title} - ${eventData.date} at ${eventData.location}`,
    openGraph: {
      title: eventData.title,
      description: `${eventData.description || 'Join us at ' + eventData.title} - ${eventData.date} at ${eventData.location}`,
      images: [eventData.image || '/default.svg'],
    },
  };
}

// Server component that pre-renders the event detail page
export default async function EventDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id: eventId } = await params;
  const eventData = events.find(e => e.id === eventId) as EventCardProps | undefined;
  
  // Pass the event data to the client component
  return <ClientEventDetail eventData={eventData} />;
}