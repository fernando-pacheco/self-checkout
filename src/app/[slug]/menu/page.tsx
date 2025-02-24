import { getRestaurantBySlug } from "@/services/restaurant"
import { notFound } from "next/navigation"
import { RestaurantCategories } from "./components/categories"
import { RestaurantDescription } from "./components/description"
import { RestaurantHeader } from "./components/header"

interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ consumptionMethod: string }>
}

function isConsumptionMethodValid(consumptionMethod: string) {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase())
}

async function RestaurantMenuPage({
    params,
    searchParams,
}: RestaurantMenuPageProps) {
    const { slug } = await params
    const { consumptionMethod } = await searchParams

    const restaurant = await getRestaurantBySlug(slug)

    if (!isConsumptionMethodValid(consumptionMethod) || !restaurant) {
        return notFound()
    }

    return (
        <div>
            <RestaurantHeader restaurant={restaurant} />
            <RestaurantDescription restaurant={restaurant} />
            <RestaurantCategories restaurant={restaurant} />
        </div>
    )
}

export default RestaurantMenuPage
