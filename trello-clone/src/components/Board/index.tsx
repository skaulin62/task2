import React, { FC } from "react";
import classes from "./Board.module.sass";

type Props = {
  children?: string | JSX.Element | JSX.Element[] | React.ReactNode | null;
};

const Board: FC<Props> = ({ children }) => {
  return <section className={classes.board}>{children}</section>;
};

export default Board;
