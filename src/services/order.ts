import { db } from "@/lib/prisma"
import type { Order } from "@prisma/client"

async function createCustomerOrder(
    body: Omit<Order, "createdAt" | "updatedAt" | "id" | "orderNumber">,
    orderProducts: Array<{ productID: string; quantity: number; price: number }>
) {
    return await db.order.create({
        data: {
            ...body,
            OrderProduct: {
                createMany: {
                    data: orderProducts,
                },
            },
        },
    })
}

export { createCustomerOrder }
