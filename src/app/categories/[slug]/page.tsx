import { Metadata } from 'next';
import ClientWrapper from '@/app/categories/[slug]/ClientWrapper';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Utility to slugify category names
const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export async function generateStaticParams() {
  const displayCategories = ["Events", "Eat & drink", "Stay", "See & do", "Shopping"];
  return displayCategories.map(category => ({
    slug: slugify(category)
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const displayCategories = ["Events", "Eat & drink", "Stay", "See & do", "Shopping"];
  const matched = displayCategories.find(cat => slugify(cat) === resolvedParams.slug);
  const categoryName = matched ?? resolvedParams.slug.replace(/-/g, ' ');
  return {
    title: `${categoryName} | Let's Explore`,
    description: `Find events in the category: ${categoryName}`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  // Map from display categories (used in navigation) to the slug and back
  const displayCategories = ["All", "Events", "Eat & drink", "Stay", "See & do", "Shopping"];
  
  // Find the display category that matches this slug
  const matched = displayCategories.find(cat => slugify(cat) === resolvedParams.slug);
  const categoryName = matched ?? resolvedParams.slug.replace(/-/g, ' ');

  return <ClientWrapper categoryName={categoryName} />;
}
