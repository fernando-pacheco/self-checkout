"use client"

import { Button } from "@/components/button"
import type { ConsumptionMethod, Product } from "@prisma/client"
import { ChevronLeft, ScrollText } from "lucide-react"
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
            <Button
                onClick={handleBackClick}
                className="absolute top-4 left-4 z-50 bg-white"
            >
                <ChevronLeft className="size-5" />
            </Button>
            <Button className="absolute top-4 right-4 z-50 bg-white">
                <ScrollText className="size-5" />
            </Button>
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
