"use client"

import { CartSheet } from "@/components/organisms/cart-sheet"
import { useCart } from "@/hooks/use-cart"
import { ChevronLeft, ScrollText } from "lucide-react"
import { Button } from "../atoms/button"

interface HeaderNavigationProps {
    navigation: VoidFunction
}

function HeaderNavigation({ navigation }: HeaderNavigationProps) {
    const { toggleCart } = useCart()

    function handleOpenCart() {
        toggleCart()
    }

    return (
        <div>
            <Button onClick={navigation} className="absolute top-4 left-4 z-50">
                <ChevronLeft className="size-5" />
            </Button>
            <Button
                className="absolute top-4 right-4 z-50"
                onClick={handleOpenCart}
            >
                <ScrollText className="size-5" />
            </Button>
            <CartSheet />
        </div>
    )
}

export { HeaderNavigation }
