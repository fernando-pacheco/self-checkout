import { Sheet, SheetContent, SheetTitle } from "@/components/atoms/sheet"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/utils/format-currency"
import { FinishOrderButton } from "../molecules/finish-order-button"
import { CartProductItem } from "./cart-product-item"

function CartSheet() {
    const { isOpen, toggleCart, cartProducts, total } = useCart()

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[85%] sm:w-[600px] p-4">
                <SheetTitle>Carrinho</SheetTitle>
                <div className="py-5 flex flex-col h-full">
                    <div className="flex-auto space-y-4">
                        {cartProducts.map((product) => (
                            <CartProductItem
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
                <div className="space-y-2 border p-4 rounded-lg">
                    <div className="flex justify-between border-b border-b-gray-100 pb-0.5">
                        <p className="text-sm font-semibold">Subtotal</p>
                        <p className="text-sm">{formatCurrency(total)}</p>
                    </div>
                    <div className="flex justify-between border-b border-b-gray-100 pb-0.5">
                        <p className="text-sm font-semibold">Descontos</p>
                        <p className="text-sm">{formatCurrency(0)}</p>
                    </div>
                    <div className="flex justify-between border-b border-b-gray-100 pb-0.5">
                        <p className="text-sm font-semibold">Total</p>
                        <p className="text-sm">{formatCurrency(total - 0)}</p>
                    </div>
                </div>
                <FinishOrderButton />
            </SheetContent>
        </Sheet>
    )
}

export { CartSheet }
