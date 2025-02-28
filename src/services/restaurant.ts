import { db } from "@/lib/prisma"
import type { MenuCategory, Product, Restaurant } from "@prisma/client"

type RestaurantWithMenu = Restaurant & {
    MenuCategory: (MenuCategory & {
        Product: Product[]
    })[]
}

async function getRestaurantBySlug(
    slug: string
): Promise<RestaurantWithMenu | null> {
    return await db.restaurant.findUnique({
        where: { slug },
        include: { MenuCategory: { include: { Product: true } } },
    })
}

export { getRestaurantBySlug }
