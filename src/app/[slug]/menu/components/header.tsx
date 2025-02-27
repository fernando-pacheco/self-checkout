"use client"

import { HeaderNavigation } from "@/components/molecules/header-navigation"
import type { Restaurant } from "@prisma/client"
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
            <HeaderNavigation navigation={handleBackClick} />
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
