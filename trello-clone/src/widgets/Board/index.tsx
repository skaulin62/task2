import ColumnOfCards from "@widgets/ColumnOfCards";
import { Cards } from "@app/types";
import { useSelector } from "react-redux";
import { selectCards } from "@/entities/Cards";
import classes from "./Board.module.sass";
const Board = () => {
  const cards = useSelector(selectCards);
  return (
    <section className={classes.board}>
      {cards.map((card: Cards) => (
        <ColumnOfCards key={card.id} card={card} />
      ))}
    </section>
  );
};

export default Board;
