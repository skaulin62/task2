import React, { useEffect, useState } from "react";
import classes from "./GreetingPopup.module.sass";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useLocalStorage } from "../../hook/useLocalStorage";

const GreetingPopup = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const [name, setName] = useLocalStorage("trelloUsername");

  useEffect(() => {
    if (name) {
      setIsShow(false);
    }
  }, []);

  const onGetOutGreetingPopup = () => {
    setIsShow(false);
    setName(name);
  };

  return (
    isShow && (
      <div className={classes.overlayPopup}>
        <div className={classes.greetingPopup}>
          <h1 className={classes.title}>What's your name, trello clone?</h1>
          <div
            style={{ width: "270px", maxWidth: "100%", margin: "30px 0 50px" }}
          >
            <Input
              value={name}
              clearValue={() => setName("")}
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              placeholder="Type your name"
            />
          </div>
          <div style={{ margin: "0 auto" }}>
            <Button onClick={onGetOutGreetingPopup} disabled={false || !name}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default GreetingPopup;
