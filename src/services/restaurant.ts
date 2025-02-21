import { db } from "@/lib/prisma"

async function getRestaurantBySlug(slug: string) {
    return await db.restaurant.findUnique({
        where: { slug },
        include: { MenuCategory: { include: { Product: true } } },
    })
}

export { getRestaurantBySlug }
