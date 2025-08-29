import { Metadata } from "next";
import ClientWrapper from "@/app/categories/[slug]/ClientWrapper";

const slugify = (str: string) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function generateStaticParams() {
  const displayCategories = ["Events", "Eat & drink", "Stay", "See & do", "Shopping"];
  return displayCategories.map((category) => ({
    slug: slugify(category),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const displayCategories = ["Events", "Eat & drink", "Stay", "See & do", "Shopping"];
  const matched = displayCategories.find((cat) => slugify(cat) === params.slug);
  const categoryName = matched ?? params.slug.replace(/-/g, " ");
  return {
    title: `${categoryName} | Let's Explore`,
    description: `Find events in the category: ${categoryName}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const displayCategories = ["All", "Events", "Eat & drink", "Stay", "See & do", "Shopping"];
  const matched = displayCategories.find((cat) => slugify(cat) === params.slug);
  const categoryName = matched ?? params.slug.replace(/-/g, " ");

  return <ClientWrapper categoryName={categoryName} />;
}
