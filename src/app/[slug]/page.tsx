import { getRestaurantBySlug } from "@/services/restaurant"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ConsumptionMethodOpt } from "./components/consumption-method-opt"

interface RestaurantPageProps {
    params: Promise<{ slug: string }>
}

async function RestaurantPage({ params }: RestaurantPageProps) {
    const { slug } = await params
    const restaurant = await getRestaurantBySlug(slug)

    if (!restaurant) {
        return notFound()
    }

    return (
        <div className="h-screen flex flex-col items-center px-6 pt-24">
            <div className="flex flex-col items-center gap-2">
                <Image
                    src={restaurant.avatarImage}
                    alt={restaurant.name}
                    width={82}
                    height={82}
                />

                <h2 className="font-semibold">{restaurant.name}</h2>
            </div>

            <div className="pt-24 text-center space-y-2">
                <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
                <p className="text-gray-200">
                    Escolha como prefere aproveitar sua refeição. Estamos aqui
                    para oferecer praticidade e sabor em cada detalhe!
                </p>
            </div>

            <div className="pt-14 grid grid-cols-2 gap-8">
                <ConsumptionMethodOpt
                    buttonText="Para comer aqui"
                    imageAlt="Para comer aqui"
                    imageUrl="/dine_in.png"
                />
                <ConsumptionMethodOpt
                    buttonText="Para levar"
                    imageAlt="Para levar"
                    imageUrl="/takeaway.png"
                />
            </div>
        </div>
    )
}

export default RestaurantPage
