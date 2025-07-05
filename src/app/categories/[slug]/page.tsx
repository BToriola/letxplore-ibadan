import { events } from '@/data/events';
import { Metadata } from 'next';
import Link from 'next/link';
import { EventCardProps } from '@/components/ui/EventCard';
import CategoryEventCard from '@/components/ui/CategoryEventCard';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const uniqueCategories = Array.from(new Set(events.map(e => e.category)));
  return uniqueCategories.map(category => ({
    slug: category.toLowerCase().replace(/\s+/g, '-')
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const categoryName = params.slug.replace(/-/g, ' ');
  return {
    title: `${categoryName} | Let's Explore`,
    description: `Find events in the category: ${categoryName}`,
  };
}

export default function CategoryPage({ params }: PageProps) {
  const categoryName = params.slug.replace(/-/g, ' ');
  const categoryEvents = events.filter(e => e.category.toLowerCase() === categoryName);

  if (!categoryEvents.length) {
    return <p className="p-8 text-center">No events found in {categoryName}</p>;
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <h1 className="text-3xl font-semibold text-[#1C1C1C] mb-6 text-center capitalize">{categoryName}</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        {categoryEvents.map((event:EventCardProps) => (
          <Link key={event.id} href={`/events/${event.id}`}>  
            <CategoryEventCard {...event} />  
          </Link>
        ))}
      </div>
    </div>
  );
}
