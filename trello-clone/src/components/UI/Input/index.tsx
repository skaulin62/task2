import React from "react";
import classes from "./Input.module.sass";
import IconCloseButton from "../IconCloseButton";

interface Props {
  value: string;
  hidden?: boolean;
  clearValue?: () => void;
  type?: "text" | "password" | "email" | "number";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    { value, hidden, clearValue, type, onChange, placeholder, onKeyDown },
    ref
  ) => {
    return (
      !hidden && (
        <>
          <div className={classes.input}>
            <input
              onKeyDown={onKeyDown}
              ref={ref}
              placeholder={placeholder}
              type={type}
              onChange={onChange}
              value={value}
            />
            {value && <IconCloseButton onClick={clearValue} />}
          </div>
        </>
      )
    );
  }
);

export default Input;
