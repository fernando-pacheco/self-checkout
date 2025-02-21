import { Button } from "@/components/button"
import { CardContent } from "@/components/card"
import Image from "next/image"

interface ConsumptionMethodOptProps {
    buttonText: string
    imageUrl: string
    imageAlt: string
}

function ConsumptionMethodOpt(props: ConsumptionMethodOptProps) {
    return (
        <CardContent>
            <div className="relative w-[80px] h-[80px]">
                <Image src={props.imageUrl} fill alt={props.imageAlt} />
            </div>
            <Button>{props.buttonText}</Button>
        </CardContent>
    )
}

export { ConsumptionMethodOpt }
