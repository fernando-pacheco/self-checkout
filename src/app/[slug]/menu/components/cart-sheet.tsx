import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/sheet"
import { useCart } from "@/hooks/use-cart"

function CartSheet() {
    const { isOpen, toggleCart } = useCart()

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export { CartSheet }
