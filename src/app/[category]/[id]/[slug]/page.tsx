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
}): Promise<React.ReactElement> {
  // The client component will get the data from URL parameters
  return <ClientEventDetail />;
}

// Required when building with `output: export` so Next.js can know which
// dynamic routes to statically generate. Returning an empty array means no
// pre-rendered pages will be generated for export (the page will still work
// as a client-rendered route), and satisfies the static export requirement.
export async function generateStaticParams() {
  return [] as Array<{ category: string; id: string; slug: string }>;
}
