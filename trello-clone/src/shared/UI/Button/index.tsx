import React, { FC } from "react";
import classes from "./Button.module.sass";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button: FC<Props> = ({ children, onClick, ...props }) => {
  return (
    <button {...props} className={classes.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
