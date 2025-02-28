"use server"

import { createCustomerOrder } from "@/services/order"
import { getProductsByIDList } from "@/services/product"
import { getRestaurantBySlug } from "@/services/restaurant"
import { removeCPFPunctuation } from "@/utils/cpf"
import type { ConsumptionMethod } from "@prisma/client"

interface CreateOrderInput {
    customerName: string
    customerCPF: string
    products: Array<{ id: string; quantity: number }>
    consumptionMethod: ConsumptionMethod
    slug: string
}

async function createOrder(input: CreateOrderInput) {
    const products = await getProductsByIDList(input.products)
    const restaurant = await getRestaurantBySlug(input.slug)

    if (!restaurant) {
        throw new Error("Restaurant not found")
    }

    const orderProducts = input.products.map((product) => ({
        productID: product.id,
        quantity: product.quantity,
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        price: products.find((p) => p.id === product.id)!.price,
    }))

    await createCustomerOrder(
        {
            consumptionMethod: input.consumptionMethod,
            status: "PENDING",
            customerName: input.customerName,
            customerCPF: removeCPFPunctuation(input.customerCPF),
            total: orderProducts.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
            ),
            restaurantID: restaurant.id,
        },
        orderProducts
    )
}

export { createOrder }
