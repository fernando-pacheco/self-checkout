"use client"

import type { CartProduct } from "@/contexts/cart"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/utils/format-currency"
import { ChevronLeft, ChevronRight, Trash } from "lucide-react"
import Image from "next/image"
import { Button } from "../atoms/button"

interface CartProductItemProps {
    product: CartProduct
}

function CartProductItem({ product }: CartProductItemProps) {
    const { decreaseProductQuantity, removeProduct, increaseProductQuantity } =
        useCart()

    function handleDecreaseQuantity() {
        decreaseProductQuantity(product.id)
    }

    function handleRemoveProduct() {
        removeProduct(product.id)
    }

    function handleIncreaseQuantity() {
        increaseProductQuantity(product.id)
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
                <div className="relative h-20 w-20 bg-gray-100 rounded-xl">
                    <Image src={product.image} alt={product.name} fill />
                </div>
                <div className="space-y-2">
                    <div>
                        <p className="text-xs max-w-full truncate text-ellipsis">
                            {product.name}
                        </p>
                        <p className="text-sm font-semibold">
                            {formatCurrency(product.price)}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={handleDecreaseQuantity}
                            className="w-7 h-7 items-center flex justify-center p-1"
                        >
                            <ChevronLeft className="size-4" />
                        </Button>
                        <p className="flex justify-center w-2 text-xs">
                            {product.quantity}
                        </p>
                        <Button
                            variant={"red"}
                            onClick={handleIncreaseQuantity}
                            className="w-7 h-7 items-center flex justify-center p-1"
                        >
                            <ChevronRight className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
            <Button
                onClick={handleRemoveProduct}
                className="w-7 h-7 items-center flex justify-center p-1"
            >
                <Trash className="size-4" />
            </Button>
        </div>
    )
}

export { CartProductItem }
