import ClientEventDetail from './ClientEventDetail';
import { Metadata } from 'next';
import { apiService } from '@/services/api';

export const dynamic = 'force-dynamic';


export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string; id: string; slug: string }> 
}): Promise<Metadata> {
  const { id: eventId } = await params;
  
  try {
    const res = await apiService.getPostById(eventId);
    if (res && res.success && res.data) {
      const eventData = res.data;
      return {
        title: eventData.name || 'Event Details',
        description: `${eventData.about || 'Join us at ' + (eventData.name || 'this event')} - ${eventData.address || ''}`,
        openGraph: {
          title: eventData.name || 'Event Details',
          description: `${eventData.about || 'Join us at ' + (eventData.name || 'this event')} - ${eventData.address || ''}`,
          images: [eventData.featuredImageUrl || (eventData.images && eventData.images[0]) || '/default.svg'],
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
export default async function EventDetailPage(): Promise<React.ReactElement> {
  // The client component will get the data from URL parameters
  // No need to pass params if ClientEventDetail uses useParams() hook
  return <ClientEventDetail />;
}

// Required when building with `output: export` so Next.js can know which
// dynamic routes to statically generate. Returning an empty array means no
// pre-rendered pages will be generated for export, but the route structure
// is still valid for client-side routing.
export async function generateStaticParams(): Promise<Array<{ category: string; id: string; slug: string }>> {
  // Return empty array to satisfy static export requirement
  // but allow dynamic rendering at runtime
  return [];
}