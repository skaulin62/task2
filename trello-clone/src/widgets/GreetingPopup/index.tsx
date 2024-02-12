import { useEffect, useState } from "react";
import classes from "./GreetingPopup.module.sass";
import Input from "@shared/UI/Input";
import Button from "@shared/UI/Button";
import { useSelector } from "react-redux";
import { selectUser } from "@/entities/User";
import { setUserName } from "@/entities/User/model/slices/states/states";
import { useAppDispatch } from "@/app/store";
import { SubmitHandler, useForm } from "react-hook-form";

interface UserInput {
  username: string;
}

const GreetingPopup = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const { username } = useSelector(selectUser);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserInput>({ mode: "onChange" });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (username) {
      setIsShow(false);
    }
  }, []);

  const onSubmit: SubmitHandler<UserInput> = (data) => {
    setIsShow(false);
    dispatch(setUserName({ username: data.username }));
  };

  return (
    isShow && (
      <div className={classes.overlayPopup}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.greetingPopup}
        >
          <h1 className={classes.title}>What's your name, trello clone?</h1>
          <div
            style={{ width: "270px", maxWidth: "100%", margin: "30px 0 50px" }}
          >
            <Input
              {...register("username", { required: "Username is required" })}
              clearValue={() => {
                setValue("username", "");
                setError("username", { message: "Username is required" });
              }}
              error={errors.username?.message}
              type="text"
              placeholder="Type your name"
            />
          </div>
          <div style={{ margin: "0 auto" }}>
            <Button
              type="submit"
              disabled={errors.username?.message ? true : false}
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    )
  );
};

export default GreetingPopup;
