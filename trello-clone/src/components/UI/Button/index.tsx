import React, { FC } from "react";
import classes from "./Button.module.sass";
interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<Props> = ({ children, onClick, disabled }) => {
  return (
    <button disabled={disabled} className={classes.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
