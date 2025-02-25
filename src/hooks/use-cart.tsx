import { CartContext } from "@/contexts/cart"
import { useContext } from "react"

function useCart() {
    return useContext(CartContext)
}

export { useCart }
