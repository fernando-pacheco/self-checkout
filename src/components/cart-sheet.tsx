import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/sheet"
import { useCart } from "@/hooks/use-cart"
import { CartProductItem } from "./cart-product-item"

function CartSheet() {
    const { isOpen, toggleCart, cartProducts } = useCart()

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[85%] sm:w-[600px] p-4">
                <SheetTitle>Carrinho</SheetTitle>
                <div className="py-5">
                    {cartProducts.map((product) => (
                        <CartProductItem key={product.id} product={product} />
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export { CartSheet }
