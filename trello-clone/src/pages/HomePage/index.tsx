import { selectSelectedCard } from "@/entities/Cards";
import Board from "@/widgets/Board";
import CardDetailsPopup from "@/widgets/CardDetailsPopup/UI";
import GreetingPopup from "@/widgets/GreetingPopup";

import { useSelector } from "react-redux";

const HomePage = () => {
  const selectedCard = useSelector(selectSelectedCard);
  return (
    <>
      {Object.keys(selectedCard).length !== 0 && (
        <CardDetailsPopup data={selectedCard} />
      )}
      <GreetingPopup />

      <Board />
    </>
  );
};

export default HomePage;
