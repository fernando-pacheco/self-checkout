"use client"

import { HeaderNavigation } from "@/components/molecules/header-navigation"
import type { ConsumptionMethod, Product } from "@prisma/client"
import Image from "next/image"
import { notFound, useParams, useRouter } from "next/navigation"

interface ProductHeaderProps {
    product: Product
    consumptionMethod: ConsumptionMethod
}

function ProductHeader({ product, consumptionMethod }: ProductHeaderProps) {
    const router = useRouter()
    const { slug } = useParams<{ slug: string }>()

    const handleBackClick = () =>
        router.push(`/${slug}/menu?consumptionMethod=${consumptionMethod}`)

    if (!product) {
        return notFound()
    }

    return (
        <div className="relative h-[332px] w-full">
            <HeaderNavigation navigation={handleBackClick} />
            <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain bg-gray-100"
            />
        </div>
    )
}

export { ProductHeader }
