"use client"

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
import { isValidCPF } from "@/utils/cpf"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../atoms/button"
import {
    FormControl,
    FormDescription,
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
        .refine((value) => isValidCPF(value), { message: "CPF inválido" }),
})

type FormSchema = z.infer<typeof formSchema>

function FinishOrderButton() {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(formData: FormSchema) {
        console.log(formData)
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={"secondary"}>Finalizar Pedido</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Finalizar o pedido</DrawerTitle>
                    <DrawerDescription>
                        Insira as insformações abaixo para finalizar o seu
                        pedido.
                    </DrawerDescription>
                </DrawerHeader>
                <FormProvider {...form}>
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
                            <DrawerFooter>
                                <Button type="submit" variant={"secondary"}>
                                    Submit
                                </Button>
                                <DrawerClose asChild>
                                    <Button type={"reset"} variant={"ghost"}>
                                        Cancel
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </FormProvider>
            </DrawerContent>
        </Drawer>
    )
}

export { FinishOrderButton }
