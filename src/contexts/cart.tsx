"use client"

import type { Product } from "@prisma/client"
import { type ReactNode, createContext, useState } from "react"

interface CartProduct extends Pick<Product, "id" | "image" | "name" | "price"> {
    quantity: number
}

interface CartContextProps {
    isOpen: boolean
    total: number
    cartProducts: CartProduct[]
    toggleCart: VoidFunction
    addProduct: (product: CartProduct) => void
    decreaseProductQuantity: (productID: string) => void
    removeProduct: (productID: string) => void
    increaseProductQuantity: (productID: string) => void
}

interface CartProviderProps {
    children: ReactNode
}

const CartContext = createContext<CartContextProps>({
    isOpen: false,
    total: 0,
    cartProducts: [],
    toggleCart: () => {},
    addProduct: (product: CartProduct) => {},
    decreaseProductQuantity: (productID: string) => {},
    removeProduct: (productID: string) => {},
    increaseProductQuantity: (productID: string) => {},
})

function CartProvider({ children }: CartProviderProps) {
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const total = cartProducts.reduce((acc, product) => {
        return acc + product.price * product.quantity
    }, 0)

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

    function decreaseProductQuantity(productID: string) {
        setCartProducts((prev) =>
            prev.map((cartProduct) =>
                cartProduct.id === productID && cartProduct.quantity > 1
                    ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
                    : cartProduct
            )
        )
    }

    function increaseProductQuantity(productID: string) {
        setCartProducts((prev) =>
            prev.map((cartProduct) =>
                cartProduct.id === productID && cartProduct.quantity > 1
                    ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
                    : cartProduct
            )
        )
    }

    function removeProduct(productID: string) {
        setCartProducts((prev) =>
            prev.filter((prevProduct) => prevProduct.id !== productID)
        )
    }

    return (
        <CartContext.Provider
            value={{
                isOpen,
                cartProducts,
                toggleCart,
                addProduct,
                decreaseProductQuantity,
                removeProduct,
                increaseProductQuantity,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export { type CartProduct, CartProvider, CartContext, type CartContextProps }
