import { PrismaClient } from "@prisma/client"

const prismaClient = new PrismaClient()

const main = async () => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    await prismaClient.$transaction(async (tx: any) => {
        await tx.restaurant.deleteMany()
        const restaurant = await tx.restaurant.create({
            data: {
                name: "FSW Donalds",
                slug: "fsw-donalds",
                description: "O melhor fast food do mundo",
                avatarImage:
                    "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQvcNP9rHlEJu1vCY5kLqzjf29HKaeN78Z6pRy",
                coverImage:
                    "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQac8bHYlkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
            },
        })
        const combosCategory = await tx.menuCategory.create({
            data: {
                name: "Combos",
                restaurantID: restaurant.id,
            },
        })
        await tx.product.createMany({
            data: [
                {
                    name: "McOferta Média Big Mac Duplo",
                    description:
                        "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
                    price: 39.9,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQaHB8tslkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
                    menuCategoryID: combosCategory.id,
                    restaurantID: restaurant.id,
                    ingredients: [
                        "Pão com gergilim",
                        "Hambúrguer de carne 100% bovina",
                        "Alface americana",
                        "Queijo fatiado sabor cheddar",
                        "Molho especial",
                        "Cebola",
                        "Picles",
                    ],
                },
                {
                    name: "Novo Brabo Melt Onion Rings",
                    description:
                        "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
                    price: 41.5,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQeGQofnEPyQaHEV2WL8rGUs41oMICtYfNkphl",
                    menuCategoryID: combosCategory.id,
                    restaurantID: restaurant.id,
                    ingredients: [
                        "Pão tipo brioche",
                        "Hambúrguer de carne 100% bovina",
                        "Méquinese",
                        "Maionese especial com sabor de carne defumada",
                        "Onion rings",
                        "Fatias de bacon",
                        "Queijo processado sabor cheddar",
                        "Molho lácteo com queijo tipo cheddar",
                    ],
                },
                {
                    name: "McCrispy Chicken Elite",
                    description:
                        "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
                    price: 39.9,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQr12aTqPo3SsGjBJCaM7yhxnbDlXeL5N9dckv",
                    menuCategoryID: combosCategory.id,
                    restaurantID: restaurant.id,
                    ingredients: [
                        "Pão tipo brioche",
                        "Batata",
                        "Molho Honey&Fire",
                        "Bacon em fatias",
                        "Alface",
                        "Tomate",
                        "Queijo sabor cheddar",
                        "Carne 100% de peito de frango",
                    ],
                },
                {
                    name: "Duplo Cheddar McMelt",
                    description:
                        "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
                    price: 36.2,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQWdq0w8niS9XCLQu7Nb4jvBYZze16goaOqsKR",
                    menuCategoryID: combosCategory.id,
                    restaurantID: restaurant.id,
                    ingredients: [
                        "Pão escuro com gergelim",
                        "Hambúrguer de carne 100% bovina",
                        "Molho lácteo com queijo tipo cheddar",
                        "Cebola ao molho shoyu",
                    ],
                },
            ],
        })
        const hamburguersCategory = await tx.menuCategory.create({
            data: {
                name: "Lanches",
                restaurantID: restaurant.id,
            },
        })
        await tx.product.createMany({
            data: [
                {
                    name: "Big Mac",
                    description:
                        "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
                    ingredients: [
                        "Pão com gergilim",
                        "Hambúrguer de carne 100% bovina",
                        "Alface americana",
                        "Queijo fatiado sabor cheddar",
                        "Molho especial",
                        "Cebola",
                        "Picles",
                    ],
                    price: 39.9,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQKfI6fivqActTvBGLXfQe4a8CJ6d3HiR7USPK",
                    menuCategoryID: hamburguersCategory.id,
                    restaurantID: restaurant.id,
                },
                {
                    name: "Duplo Quarterão",
                    description:
                        "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
                    ingredients: [
                        "Pão tipo brioche",
                        "Hambúrguer de carne 100% bovina",
                        "Méquinese",
                        "Maionese especial com sabor de carne defumada",
                        "Onion rings",
                        "Fatias de bacon",
                        "Queijo processado sabor cheddar",
                        "Molho lácteo com queijo tipo cheddar",
                    ],
                    price: 41.5,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ99rtECuYaDgmA4VujBU0wKn2ThXJvF3LHfyc",
                    menuCategoryID: hamburguersCategory.id,
                    restaurantID: restaurant.id,
                },
                {
                    name: "McMelt",
                    description:
                        "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
                    ingredients: [
                        "Pão tipo brioche",
                        "Batata",
                        "Molho Honey&Fire",
                        "Bacon em fatias",
                        "Alface",
                        "Tomate",
                        "Queijo sabor cheddar",
                        "Carne 100% de peito de frango",
                    ],
                    price: 39.9,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQUY0VlDTmvPeJLoyOjzNsMqFdxUI423nBl6br",
                    menuCategoryID: hamburguersCategory.id,
                    restaurantID: restaurant.id,
                },
                {
                    name: "McNífico Bacon",
                    description:
                        "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
                    ingredients: [
                        "Pão escuro com gergelim",
                        "Hambúrguer de carne 100% bovina",
                        "Molho lácteo com queijo tipo cheddar",
                        "Cebola ao molho shoyu",
                    ],
                    price: 36.2,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBBmifbjzEVXRoycAtrP9vH45bZ6WDl3QF0a1",
                    menuCategoryID: hamburguersCategory.id,
                    restaurantID: restaurant.id,
                },
            ],
        })
        const frenchFriesCategory = await tx.menuCategory.create({
            data: {
                name: "Fritas",
                restaurantID: restaurant.id,
            },
        })
        await tx.product.createMany({
            data: [
                {
                    name: "Fritas Grande",
                    description:
                        "Batatas fritas crocantes e sequinhas. Vem bastante!",
                    ingredients: [],
                    price: 10.9,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQNd3jSNrcJroaszwjUAlM6iSO5ZTx2HV70t31",
                    menuCategoryID: frenchFriesCategory.id,
                    restaurantID: restaurant.id,
                },
                {
                    name: "Fritas Média",
                    description:
                        "Batatas fritas crocantes e sequinhas. Vem uma média quantidade!",
                    ingredients: [],
                    price: 9.9,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7Y6lv9tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
                    menuCategoryID: frenchFriesCategory.id,
                    restaurantID: restaurant.id,
                },
                {
                    name: "Fritas Pequena",
                    description:
                        "Batatas fritas crocantes e sequinhas. Vem pouquinho (é bom pra sua dieta)!",
                    ingredients: [],
                    price: 5.9,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ5toOZxYa1oARJCUGh4EY3x8NjXHtvZ7lnVfw",
                    menuCategoryID: frenchFriesCategory.id,
                    restaurantID: restaurant.id,
                },
            ],
        })
        const drinksCategory = await tx.menuCategory.create({
            data: {
                name: "Bebidas",
                restaurantID: restaurant.id,
            },
        })
        await tx.product.createMany({
            data: [
                {
                    name: "Coca-cola",
                    description: "Coca-cola gelada para acompanhar seu lanche.",
                    ingredients: [],
                    price: 5.9,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQJS1b33q29eEsh0CVmOywrqx1UPnJpRGcHN5v",
                    menuCategoryID: drinksCategory.id,
                    restaurantID: restaurant.id,
                },
                {
                    name: "Fanta Laranja",
                    description:
                        "Fanta Laranja gelada para acompanhar seu lanche.",
                    ingredients: [],
                    price: 5.9,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQW7Kxm9gniS9XCLQu7Nb4jvBYZze16goaOqsK",
                    menuCategoryID: drinksCategory.id,
                    restaurantID: restaurant.id,
                },
                {
                    name: "Água Mineral",
                    description: "A bebida favorita do Cristiano Ronaldo.",
                    ingredients: [],
                    price: 2.9,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7i05S5tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
                    menuCategoryID: drinksCategory.id,
                    restaurantID: restaurant.id,
                },
            ],
        })
        const desertsCategory = await tx.menuCategory.create({
            data: {
                name: "Sobremesas",
                restaurantID: restaurant.id,
            },
        })
        await tx.product.createMany({
            data: [
                {
                    name: "Casquinha de Baunilha",
                    description: "Casquinha de sorvete sabor baunilha.",
                    ingredients: [],
                    price: 3.9,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQtfuQrAKkI75oJfPT0crZxvX82ui9qV3hLFdY",
                    menuCategoryID: desertsCategory.id,
                    restaurantID: restaurant.id,
                },
                {
                    name: "Casquinha de Chocolate",
                    description: "Casquinha de sorvete sabor chocolate.",
                    ingredients: [],
                    price: 3.9,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBH21ijzEVXRoycAtrP9vH45bZ6WDl3QF0a1M",
                    menuCategoryID: desertsCategory.id,
                    restaurantID: restaurant.id,
                },
                {
                    name: "Casquinha de Mista",
                    description:
                        "Casquinha de sorvete sabor baunilha e chocolate.",
                    ingredients: [],
                    price: 2.9,
                    image: "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ4rBrtULypXmR6JiWuhzS8ALjVkrF3yfatC7E",
                    menuCategoryID: desertsCategory.id,
                    restaurantID: restaurant.id,
                },
            ],
        })
    })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prismaClient.$disconnect()
    })
