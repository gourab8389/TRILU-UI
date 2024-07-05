import { ChefHat, Globe, PartyPopper } from "lucide-react";
import { ReactNode } from "react";

interface categoryItem {
    name:string,
    title:string,
    image:ReactNode,
    description?: string,
    id:number,
}

export const CategoryItems: categoryItem[] = [
    {
        id:0,
        name:"template",
        title:"Template",
        image: <Globe />
    },
    {
        id:1,
        name:"uikit",
        title:"Ui Kit",
        image: <ChefHat />
    },
    {
        id:2,
        name:"icon",
        title:"icon",
        image: <PartyPopper />
    },
]