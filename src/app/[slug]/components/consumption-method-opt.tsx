"use client"

import { Button } from "@/components/button"
import { CardContent } from "@/components/card"
import type { ConsumptionMethod } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ConsumptionMethodOptProps {
    buttonText: string
    imageUrl: string
    imageAlt: string
    option: ConsumptionMethod
    slug: string
}

function ConsumptionMethodOpt({
    buttonText,
    imageAlt,
    imageUrl,
    option,
    slug,
}: ConsumptionMethodOptProps) {
    const router = useRouter()
    function handleNavigate() {
        router.push(`/${slug}/menu?consumptionMethod=${option}`)
    }

    return (
        <CardContent>
            <div className="relative w-[80px] h-[80px]">
                <Image src={imageUrl} fill alt={imageAlt} />
            </div>
            <Button onClick={handleNavigate}>{buttonText}</Button>
        </CardContent>
    )
}

export { ConsumptionMethodOpt }
