"use client"

import { CartSheet } from "@/components/organisms/cart-sheet"
import { useCart } from "@/hooks/use-cart"
import { ChevronLeft, ScrollText, ShoppingCart } from "lucide-react"
import { Button } from "../atoms/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../atoms/tooltip"

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
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={navigation}
                            className="absolute top-4 left-4 z-50"
                        >
                            <ChevronLeft className="size-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent
                        side="right"
                        className="font-semibold px-4 text-white"
                    >
                        <p>Voltar</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="absolute top-4 right-4 z-50"
                            onClick={handleOpenCart}
                        >
                            <ScrollText className="size-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent
                        side="left"
                        className="font-semibold px-4 text-white"
                    >
                        <p>Pedidos</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="absolute top-16 right-4 z-50"
                            onClick={handleOpenCart}
                        >
                            <ShoppingCart className="size-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent
                        side="left"
                        className="font-semibold px-4 text-white"
                    >
                        <p>Carrinho</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <CartSheet />
        </div>
    )
}

export { HeaderNavigation }
