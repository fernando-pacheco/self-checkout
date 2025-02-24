import { db } from "@/lib/prisma"

async function getProductByID(id: string) {
    return await db.product.findUnique({
        where: { id },
    })
}

export { getProductByID }
