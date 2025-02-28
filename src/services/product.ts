import { db } from "@/lib/prisma"

async function getProductByID(id: string) {
    return await db.product.findUnique({
        where: { id },
    })
}

async function getProductsByIDList(products: Array<{ id: string }>) {
    return await db.product.findMany({
        where: {
            id: {
                in: products.map((product) => product.id),
            },
        },
    })
}

export { getProductByID, getProductsByIDList }
