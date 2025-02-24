import { getProductByID } from "@/services/product"
import { getRestaurantBySlug } from "@/services/restaurant"
import type { ConsumptionMethod } from "@prisma/client"
import { notFound } from "next/navigation"
import { ProductContent } from "./components/content"
import { ProductHeader } from "./components/header"

interface ProductPageProps {
    params: Promise<{
        slug: string
        productID: string
    }>
    searchParams: Promise<{ consumptionMethod: ConsumptionMethod }>
}

async function ProductPage({ params, searchParams }: ProductPageProps) {
    const { productID, slug } = await params
    const { consumptionMethod } = await searchParams

    const product = await getProductByID(productID)
    const restaurant = await getRestaurantBySlug(slug)

    if (!product || !restaurant) {
        return notFound()
    }

    return (
        <div className="flex h-full flex-col">
            <ProductHeader
                product={product}
                consumptionMethod={consumptionMethod}
            />
            <ProductContent product={product} restaurant={restaurant} />
        </div>
    )
}

export default ProductPage
