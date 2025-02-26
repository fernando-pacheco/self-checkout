"use client"

import type { Restaurant } from "@prisma/client"
import { Clock, Star } from "lucide-react"
import Image from "next/image"

interface RestaurantDescriptionProps {
    restaurant: Pick<Restaurant, "avatarImage" | "name" | "description">
}

function RestaurantDescription({ restaurant }: RestaurantDescriptionProps) {
    return (
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border border-y-gray-700/30 border-x-0 bg-white p-5 space-y-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Image
                        src={restaurant.avatarImage}
                        alt={restaurant.name}
                        width={45}
                        height={45}
                    />
                    <div>
                        <h2 className="text-lg font-semibold">
                            {restaurant.name}
                        </h2>
                        <p className="text-xs text-gray-200">
                            {restaurant.description}
                        </p>
                    </div>
                </div>
                <div className="border border-gray-200/60 px-3 py-1 flex gap-1 items-center text-sm rounded-full font-semibold">
                    <Star className="fill-yellow text-yellow size-3.5" />
                    <p>5.0</p>
                </div>
            </div>
            <div className="text-limegreen flex gap-1 text-sm items-center">
                <Clock className="size-4" />
                <p>Aberto!</p>
            </div>
        </div>
    )
}

export { RestaurantDescription }
