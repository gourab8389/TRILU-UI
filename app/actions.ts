"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import {z} from "zod"

export type State ={
    status: "error" | "success" | undefined;
    errors?: {
        [key: string]: string[];
    }
    message?: string | null;
}

const productSchema = z.object({
    name: z.string().min(3, {message: "The name has to be a min character length of 5"}),

    category: z.string().min(1, {message:"Category is required"}),

    price: z.number().min(1, {message:"The price has to be bigger than 1"}),

    smallDescription: z.string().min(10, {message:"Please summerize your product more"}),
    
    description: z.string().min(10, {message:"Description has required"}),

    images: z.array(z.string(), {message:"Images are required"}),

    productFile: z.string().min(1, {message:"Please upload zip of your product"})
})

export async function SellProduct(prevState: any,formData : FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user){
        throw new Error("something went wrong");
    }

    const validateFields = productSchema.safeParse({
        name: formData.get("name"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        smallDescription: formData.get("smallDescription"),
        description: formData.get("description"),
        images: JSON.parse(formData.get("images") as string),
        productFile: formData.get("productFile")
    })

    if(!validateFields.success){
        const state: State = {
            status: 'error',
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Oops, i think there is a mistake with your inputs'
        }

        return state;
    }

    const state: State = {
        status: "success",
        message: "Your product has been created!"
    }
    return state;
}