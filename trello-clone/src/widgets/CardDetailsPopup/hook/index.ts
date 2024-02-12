import { Cards } from "@/app/types";
import { selectCards } from "@/entities/Cards";
import { useSelector } from "react-redux";

export const useGetCardsById = (id: number): Cards => {
    const cards = useSelector(selectCards);
    return cards.find((card: Cards) => card.id === id) || ({} as Cards);
}