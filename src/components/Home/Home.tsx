import React, { CSSProperties, SyntheticEvent, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Home.css";
import about from "../../assets/img/about.png";
import { GlobalContext } from "../../authcontext/GlobalContext";
import Cantina from "../../assets/video/1.mp4";
import soundScrolling from "../../assets/audio/sfx/gui_scroll.mp3";
import { Howl } from "howler";

const Home: React.FC = () => {
  let history = useHistory();

  const [inputValue, setInputValue] = useState("");
  let general = useContext(GlobalContext);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let result: boolean = false;

    let formData = new FormData(event.currentTarget);
    // let username: string = formData.get("username");

    if (inputValue !== "" && inputValue !== "!") {
      result = validate(inputValue);
    }

    if (result && window.localStorage.getItem("name") !== inputValue) {
      general.name = inputValue;
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
    let Home = document.getElementsByClassName("Home")[0];

    Home.classList.add("animation");

    setTimeout(() => app.removeChild(Home), 1100);
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
    <div className="Home">
      {/* <h1 className="neonText">Pazaak</h1> */}
      <video
        style={{
          position: "absolute",
          width: "100%",
          top: "50%",
          left: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate( -50%, -50%)",

          zIndex: -1,
        }}
        autoPlay
        loop
      >
        <source src={Cantina} type="video/mp4" />
      </video>
      {/* <form action="" onSubmit={submitHandler} id="form">
        <input
          id="username"
          autoComplete="off"
          type="text"
          placeholder="Enter your name"
          value={inputValue}
          onChange={inputHandler}
        />
        <button type="submit">Play</button>
      </form> */}

      {/* <About /> */}
      <Buttons />
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

const Buttons = () => {
  let general = useContext(GlobalContext);

  function hoverEffect() {
    general.sfx.play();
  }
  return (
    <>
      <Link to="/againstAI">
        <button className="button" onMouseEnter={hoverEffect}>
          Player vs AI
        </button>
      </Link>
      <Link to="/againstPlayer">
        <button className="button" onMouseEnter={hoverEffect}>
          Player vs Player
        </button>
      </Link>
    </>
  );
};

export default Home;
