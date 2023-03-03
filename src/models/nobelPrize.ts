export type NobelPrize = {
    id: string
    name: string
    motivation: string
    share: string
    year: string
    category: string
}

export enum Category {
    physics =  "physics",
    chemistry =  "chemistry",
    medicine =  "medicine",
    literature =  "literature",
    peace =  "peace",
}