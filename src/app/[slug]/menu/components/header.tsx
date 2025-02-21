"use client"

import { Button } from "@/components/button"
import type { Restaurant } from "@prisma/client"
import { ChevronLeft, ScrollText } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface RestaurantHeaderProps {
    restaurant: Pick<Restaurant, "name" | "coverImage" | "slug">
}

function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
    const router = useRouter()
    const handleBackClick = () => router.push(`/${restaurant.slug}`)

    return (
        <div className="relative h-[250px] w-full">
            <Button
                onClick={handleBackClick}
                className="absolute top-4 left-4 z-50"
            >
                <ChevronLeft className="size-5" />
            </Button>
            <Button className="absolute top-4 right-4 z-50">
                <ScrollText className="size-5" />
            </Button>
            <Image
                src={restaurant.coverImage}
                alt={restaurant.name}
                fill
                className="object-cover"
            />
        </div>
    )
}

export { RestaurantHeader }
