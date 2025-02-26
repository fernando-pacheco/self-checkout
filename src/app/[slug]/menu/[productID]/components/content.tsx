"use client"

import { Button } from "@/components/button"
import { ScrollArea } from "@/components/scroll-area"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/utils/format-currency"
import type { Product, Restaurant } from "@prisma/client"
import { ChefHat, ChevronLeft, ChevronRight, Circle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProductContentProps {
    product: Product
    restaurant: Restaurant
}

function ProductContent({ product, restaurant }: ProductContentProps) {
    const [quantity, setQuantity] = useState<number>(1)
    const { toggleCart, addProduct } = useCart()

    function handleIncreaseQuantity() {
        setQuantity((prev) => prev + 1)
    }

    function handleDecreaseQuantity() {
        setQuantity((prev) => {
            if (prev === 1) {
                return 1
            }

            return prev - 1
        })
    }

    function handleAddToCart() {
        addProduct({
            ...product,
            quantity,
        })
        toggleCart()
    }

    return (
        <>
            <div className="p-5 pb-2 flex flex-auto flex-col overflow-hidden">
                <div className="flex-auto space-y-5 overflow-hidden">
                    <div className="space-y-2">
                        <div className="flex gap-2 items-center">
                            <Image
                                height={16}
                                width={16}
                                className="rounded-full"
                                src={restaurant.avatarImage}
                                alt={restaurant.name}
                            />
                            <p className="text-gray-200 text-xs">
                                {restaurant.name}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold">{product.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold text-2xl">
                            {formatCurrency(product.price)}
                        </p>
                        <div className="flex items-center gap-4">
                            <Button onClick={handleDecreaseQuantity}>
                                <ChevronLeft />
                            </Button>
                            <p className="flex justify-center w-4">
                                {quantity}
                            </p>
                            <Button
                                variant={"red"}
                                onClick={handleIncreaseQuantity}
                            >
                                <ChevronRight />
                            </Button>
                        </div>
                    </div>
                    <ScrollArea className="h-full">
                        <div className="space-y-5 mb-36">
                            <div className="space-y-1">
                                <h1 className="font-semibold">Sobre</h1>
                                <p className="text-sm text-gray-200 text-justify">
                                    {product.description}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex gap-1 items-center">
                                    <ChefHat className="size-4" />
                                    <h1 className="font-semibold">
                                        Ingredientes
                                    </h1>
                                </div>
                                <ul className="px-1.5 text-gray-200 list-disc list-inside text-sm">
                                    {product.ingredients.map((ingredient) => (
                                        <li key={ingredient}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
                <div className="w-full mt-2">
                    <Button
                        className="rounded-full"
                        variant={"secondary"}
                        onClick={handleAddToCart}
                    >
                        Adicionar à sacola
                    </Button>
                </div>
            </div>
        </>
    )
}

export { ProductContent }
