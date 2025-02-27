"use client"

import { Button } from "@/components/atoms/button"
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area"
import type { Prisma } from "@prisma/client"
import { useState } from "react"
import { RestaurantProducts } from "./products"

interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{
        include: { MenuCategory: { include: { Product: true } } }
    }>
}

type MenuCategoryProducts = Prisma.MenuCategoryGetPayload<{
    include: { Product: true }
}>

function RestaurantCategories({ restaurant }: RestaurantCategoriesProps) {
    const [selectedCategory, setSelectedCategory] =
        useState<MenuCategoryProducts>(restaurant.MenuCategory[0])

    function handleCategoryClick(category: MenuCategoryProducts) {
        setSelectedCategory(category)
    }

    function getCategoryButtonVariant(category: MenuCategoryProducts) {
        return selectedCategory.id === category.id ? "secondary" : "default"
    }

    return (
        <div className="space-y-2">
            <ScrollArea className="w-full">
                <ScrollBar orientation="horizontal" />
                <div className="flex w-max space-x-4 p-4">
                    {restaurant.MenuCategory.map((category) => (
                        <Button
                            key={category.id}
                            className="rounded-full py-1 text-base"
                            onClick={() => handleCategoryClick(category)}
                            variant={getCategoryButtonVariant(category)}
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
            </ScrollArea>
            <h1 className="px-4 font-semibold">{selectedCategory.name}</h1>
            <RestaurantProducts products={selectedCategory.Product} />
        </div>
    )
}

export { RestaurantCategories }
