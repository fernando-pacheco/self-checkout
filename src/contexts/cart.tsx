"use client"

import type { Product } from "@prisma/client"
import { type ReactNode, createContext, useState } from "react"

interface CartProduct extends Product {
    quantity: number
}

interface CartContextProps {
    isOpen: boolean
    cartProducts: CartProduct[]
    toggleCart: VoidFunction
}

interface CartProviderProps {
    children: ReactNode
}

const CartContext = createContext<CartContextProps>({
    isOpen: false,
    cartProducts: [],
    toggleCart: () => {},
})

function CartProvider({ children }: CartProviderProps) {
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function toggleCart() {
        setIsOpen((prev) => !prev)
    }

    return (
        <CartContext.Provider
            value={{
                isOpen,
                cartProducts,
                toggleCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext, type CartContextProps }
