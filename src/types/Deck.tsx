import type { Card } from "./Card";

export type Deck  = {
    id:number;
    title:string;
    logo: string;
    descr:string;
    cards:Card[]
}