"use client"

import { formatCurrency } from "@/utils/format-currency"
import type { Product } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams, useSearchParams } from "next/navigation"

interface RestaurantProductsProps {
    products: Product[]
}

function RestaurantProducts({ products }: RestaurantProductsProps) {
    const { slug } = useParams<{ slug: string }>()
    const searchParams = useSearchParams()
    const consumptionMethod = searchParams.get("consumptionMethod")

    if (!products) {
        return notFound()
    }

    return (
        <div className="px-4">
            {products.map((product) => (
                <Link
                    key={product.id}
                    className="flex justify-between py-3 items-center gap-10 border-b border-b-gray-200/50"
                    href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`}
                >
                    <div className="flex flex-col gap-1">
                        <h1>{product.name}</h1>
                        <p className="text-gray-200 line-clamp-2 text-sm">
                            {product.description}
                        </p>
                        <p className="font-semibold">
                            {formatCurrency(product.price)}
                        </p>
                    </div>
                    <div className="relative min-h-[82px] min-w-[120px]">
                        <Image
                            src={product.image}
                            alt={product.image}
                            fill
                            className="rounded-lg object-contain"
                        />
                    </div>
                </Link>
            ))}
        </div>
    )
}

export { RestaurantProducts }
