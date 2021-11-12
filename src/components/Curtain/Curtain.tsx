import React, { SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Curtain.css";
import about from "../../assets/img/about.png";

const Curtain: React.FC = () => {
  let history = useHistory();

  const [inputValue, setInputValue] = useState("");

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let result: boolean = false;

    let formData = new FormData(event.currentTarget);
    // let username: string = formData.get("username");

    if (inputValue !== "" && inputValue !== "!") {
      result = validate(inputValue);
    }

    if (result && window.localStorage.getItem("name") !== inputValue) {
      window.localStorage.removeItem("name");
      window.localStorage.setItem("name", inputValue);
      history.push("/");
    }
    // result && startAnimation(event.target as HTMLInputElement);
  }

  function inputHandler(elem: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(elem.target.value);
  }

  function startAnimation(elem: HTMLInputElement): void {
    let app = document.getElementsByClassName("App")[0];
    let curtain = document.getElementsByClassName("Curtain")[0];

    curtain.classList.add("animation");

    setTimeout(() => app.removeChild(curtain), 1100);
  }

  function validate(str: string): boolean {
    const onAccept = (str: string): void => {
      console.log(`Name is ok: %c${str}`, "color:green");
      console.log("Do other stuff here");
    };

    const onDicline = (str: string): void => {
      console.log(`Name is BAD WRONG and it is: %c${str}`, "color: red");
      console.log(`Declining...`);
    };

    const reg = /^[a-z ,.'-]+$/i;
    str.match(reg) ? onAccept(str) : onDicline(str);

    return str.match(reg) ? true : false;
  }

  return (
    <div className="Curtain">
      <h1 className="neonText">Pazaak</h1>
      <form action="" onSubmit={submitHandler} id="form">
        <input
          id="username"
          autoComplete="off"
          type="text"
          placeholder="Enter your name"
          value={inputValue}
          onChange={inputHandler}
        />
        <button type="submit">Play</button>
      </form>

      <About />
    </div>
  );
};

const About = () => {
  return (
    <div className="About">
      <img src={about} alt="About Pazaak" height="106px" width="77px" />
    </div>
  );
};

export default Curtain;
