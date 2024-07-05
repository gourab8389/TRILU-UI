import { ReactNode } from "react";

interface CategoryItem {
    name:string,
    title:string,
    image:ReactNode,
    description?: string,
    id:number,
}