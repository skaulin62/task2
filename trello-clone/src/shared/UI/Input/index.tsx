import React from "react";
import classes from "./Input.module.sass";
import IconCloseButton from "../IconCloseButton";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  hidden?: boolean;
  clearValue?: () => void;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      hidden,
      clearValue,
      value,
      onChange,
      placeholder,
      onKeyDown,
      error,
      ...props
    },
    ref
  ) => {
    return (
      !hidden && (
        <>
          <div className={`${classes.input} ${error ? classes.error : ""}`}>
            <input
              value={value}
              {...props}
              onKeyDown={onKeyDown}
              ref={ref}
              placeholder={placeholder}
              onChange={onChange}
            />
            {value ? <IconCloseButton onClick={clearValue} /> : null}
          </div>
        </>
      )
    );
  }
);

export default Input;
