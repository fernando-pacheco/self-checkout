"use client"

import type { Product } from "@prisma/client"
import { type ReactNode, createContext, useState } from "react"

interface CartProduct extends Pick<Product, "id" | "image" | "name" | "price"> {
    quantity: number
}

interface CartContextProps {
    isOpen: boolean
    cartProducts: CartProduct[]
    toggleCart: VoidFunction
    addProduct: (product: CartProduct) => void
}

interface CartProviderProps {
    children: ReactNode
}

const CartContext = createContext<CartContextProps>({
    isOpen: false,
    cartProducts: [],
    toggleCart: () => {},
    addProduct: (product: CartProduct) => {},
})

function CartProvider({ children }: CartProviderProps) {
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function toggleCart() {
        setIsOpen((prev) => !prev)
    }

    function addProduct(product: CartProduct) {
        const productAlreadyExists = cartProducts.some(
            (prev) => prev.id === product.id
        )

        if (productAlreadyExists) {
            setCartProducts((prev) =>
                prev.map((cartProduct) =>
                    cartProduct.id === product.id
                        ? {
                              ...cartProduct,
                              quantity: cartProduct.quantity + product.quantity,
                          }
                        : cartProduct
                )
            )
        } else {
            setCartProducts((prev) => [...prev, { ...product }])
        }
    }

    return (
        <CartContext.Provider
            value={{
                isOpen,
                cartProducts,
                toggleCart,
                addProduct,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext, type CartContextProps }
