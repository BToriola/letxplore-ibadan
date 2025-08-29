import type React from "react"
import ClientEventDetail from "./ClientEventDetail"
import type { Metadata } from "next"
import { apiService, type Post } from "@/services/api"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; id: string; slug: string }>
}): Promise<Metadata> {
  const { id: eventId } = await params

  try {
    const res = await apiService.getPostById(eventId)
    if (res && res.success && res.data) {
      const eventData = res.data
      return {
        title: eventData.name || "Event Details",
        description: `${eventData.about || "Join us at " + (eventData.name || "this event")} - ${eventData.address || ""}`,
        openGraph: {
          title: eventData.name || "Event Details",
          description: `${eventData.about || "Join us at " + (eventData.name || "this event")} - ${eventData.address || ""}`,
          images: [eventData.featuredImageUrl || (eventData.images && eventData.images[0]) || "/default.svg"],
        },
      }
    }
  } catch (error) {
    console.error("Error fetching event data for metadata:", error)
  }

  return {
    title: "Event Details",
    description: "Event details page",
  }
}

// Server component that renders the event detail page
export default async function EventDetailPage({ params }: { params: Promise<{ category: string; id: string; slug: string }> }): Promise<React.ReactElement> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { category, id, slug } = await params;
  return <ClientEventDetail />;
}

export async function generateStaticParams(): Promise<Array<{ category: string; id: string; slug: string }>> {
  try {
    // Fetch all events/posts from your API
    const res = await apiService.getPosts()

    if (res && res.success && res.data && Array.isArray(res.data)) {
      return res.data.map((event: Post & { slug?: string }) => ({
        category: event.category || "events",
        id: event.id.toString(),
        slug: event.slug || event.name?.toLowerCase().replace(/\s+/g, "-") || "event",
      }))
    }
  } catch (error) {
    console.error("Error generating static params:", error)
  }

  // Return empty array as fallback - this will still cause build issues with output: export
  // Consider removing output: export from next.config.js if you need dynamic routes
  return []
}
