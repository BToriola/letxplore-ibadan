import type React from "react"
import ClientEventDetail from "./ClientEventDetail"
import type { Metadata } from "next"
import { apiService } from "@/services/api"
import type { Post } from '@/services/api'

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
export default async function EventDetailPage(): Promise<React.ReactElement> {
  return <ClientEventDetail />
}

export async function generateStaticParams(): Promise<Array<{ category: string; id: string; slug: string }>> {
  try {
    // Fetch posts using the canonical posts endpoint. Use a high limit to attempt to get all posts.
    const res = await apiService.getPosts({ limit: 1000 })

    if (res && res.success && res.data && Array.isArray(res.data)) {
      return res.data.map((event: Post) => ({
        category: event.category || "events",
        id: event.id.toString(),
        slug: (event.name || event.id).toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      }))
    }
  } catch (error) {
    console.error("Error generating static params:", error)
  }

  // Return empty array as fallback - this will still cause build issues with output: export
  // Consider removing output: export from next.config.js if you need dynamic routes
  return []
}
