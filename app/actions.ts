"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import {z} from "zod"
import prisma from "./lib/db";
import {type CategoryTypes } from "@prisma/client";
import { redirect } from "next/navigation";

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


const userSettingsSchema = z.object({
    firstName: z
      .string()
      .min(3, { message: "Minimum length of 3 required" })
      .or(z.literal(""))
      .optional(),
  
    lastName: z
      .string()
      .min(3, { message: "Minimum length of 3 required" })
      .or(z.literal(""))
      .optional(),
  });

export async function SellProduct(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      throw new Error("Something went wrong");
    }
  
    const validateFields = productSchema.safeParse({
      name: formData.get("name"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      smallDescription: formData.get("smallDescription"),
      description: formData.get("description"),
      images: JSON.parse(formData.get("images") as string),
      productFile: formData.get("productFile"),
    });
  
    if (!validateFields.success) {
      const state: State = {
        status: "error",
        errors: validateFields.error.flatten().fieldErrors,
        message: "Oops, I think there is a mistake with your inputs.",
      };
  
      return state;
    }
  
    const data = await prisma.product.create({
      data: {
        name: validateFields.data.name,
        category: validateFields.data.category as CategoryTypes,
        smallDescription: validateFields.data.smallDescription,
        price: validateFields.data.price,
        images: validateFields.data.images,
        productFile: validateFields.data.productFile,
        userId: user.id,
        description: JSON.parse(validateFields.data.description),
      },
    });
  
    return redirect(`/product/${data.id}`);
  }


  export async function UpdateUserSettings(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      throw new Error("something went wrong");
    }
  
    const validateFields = userSettingsSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    });
  
    if (!validateFields.success) {
      const state: State = {
        status: "error",
        errors: validateFields.error.flatten().fieldErrors,
        message: "Oops, I think there is a mistake with your inputs.",
      };
  
      return state;
    }
  
    const data = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstName: validateFields.data.firstName,
        lastName: validateFields.data.lastName,
      },
    });
  
    const state: State = {
      status: "success",
      message: "Your Settings have been updated",
    };
  
    return state;
  }