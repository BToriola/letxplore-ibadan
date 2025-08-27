import ClientEventDetail from './ClientEventDetail';
import { Metadata } from 'next';

// Since we're using API data, we don't pre-generate static params
// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string; id: string; slug: string }> 
}): Promise<Metadata> {
  const { id: eventId } = await params;
  
  // Try to fetch event data for metadata
  try {
    const response = await fetch(`https://letxplore-api-git-main-btoriolas-projects.vercel.app/api/v1/events/${eventId}`);
    if (response.ok) {
      const result = await response.json();
      const eventData = result.data;
      return {
        title: eventData.title || 'Event Details',
        description: `${eventData.description || 'Join us at ' + eventData.title} - ${eventData.location}`,
        openGraph: {
          title: eventData.title || 'Event Details',
          description: `${eventData.description || 'Join us at ' + eventData.title} - ${eventData.location}`,
          images: [eventData.image || '/default.svg'],
        },
      };
    }
  } catch (error) {
    console.error('Error fetching event data for metadata:', error);
  }
  
  return {
    title: 'Event Details',
    description: 'Event details page'
  };
}

// Server component that renders the event detail page
export default async function EventDetailPage({ 
  params 
}: { 
  params: Promise<{ category: string; id: string; slug: string }> 
}) {
  const { id: eventId } = await params;
  
  // The client component will get the data from URL parameters
  return <ClientEventDetail />;
}
