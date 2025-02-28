"use client"

import { createOrder } from "@/actions/create-order"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/atoms/drawer"
import { useCart } from "@/hooks/use-cart"
import { isValidCPF } from "@/utils/cpf"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ConsumptionMethod } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { PatternFormat } from "react-number-format"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "../atoms/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../atoms/form"
import { Input } from "../atoms/input"

const formSchema = z.object({
    name: z.string().trim().min(1, { message: "Nome é um campo obrigatório" }),
    cpf: z
        .string()
        .trim()
        .min(1, {
            message: "O CPF é obrigatório",
        })
        .refine((value) => isValidCPF(value), { message: "CPF inválido" }),
})

type FormSchema = z.infer<typeof formSchema>

interface FinishOrderDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

function FinishOrderDialog({ open, onOpenChange }: FinishOrderDialogProps) {
    const { slug } = useParams<{ slug: string }>()
    const searchParams = useSearchParams()
    const { cartProducts, toggleCart } = useCart()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: "",
        },
    })

    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms))

    async function onSubmit(formData: FormSchema) {
        try {
            setIsLoading(true)
            const consumptionMethod = searchParams.get(
                "consumptionMethod"
            ) as ConsumptionMethod

            await createOrder({
                consumptionMethod,
                customerName: formData.name,
                customerCPF: formData.cpf,
                products: cartProducts,
                slug,
            })

            await delay(3000)

            onOpenChange(false)
            toggleCart()
            toast.success("Pedido finalizado com sucesso!")
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild> </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Finalizar Pedido</DrawerTitle>
                    <DrawerDescription>
                        Insira suas informações abaixo para finalizar o seu
                        pedido.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-5">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seu nome</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Digite seu nome"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seu CPF</FormLabel>
                                        <FormControl>
                                            <PatternFormat
                                                placeholder="Digite seu CPF"
                                                format="###.###.###-##"
                                                customInput={Input}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DrawerFooter className="p-0">
                                <Button
                                    type="submit"
                                    variant={isLoading ? "disabled" : "red"}
                                    disabled={isLoading}
                                    className="flex justify-center items-center inset-shadow-black"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        "Finalizar"
                                    )}
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant={"default"}>
                                        Cancelar
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export { FinishOrderDialog }
