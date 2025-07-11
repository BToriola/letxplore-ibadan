"use client";

import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import CategoryEventSection from './CategoryEventSection';

interface ClientWrapperProps {
  categoryName: string;
}

export default function ClientWrapper({ categoryName }: ClientWrapperProps) {
  const router = useRouter();

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === "All") {
      router.push('/');
    } else {
      const slug = newCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      router.push(`/categories/${slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection 
          activeCategory={categoryName}
          onCategoryChange={handleCategoryChange}
        />
        <CategoryEventSection categoryName={categoryName} />
      </main>
    </div>
  );
}
