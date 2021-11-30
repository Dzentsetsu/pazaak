import { createContext } from "react";
import { Howl } from "howler";
import gui_scroll from "../assets/audio/sfx/gui_scroll.mp3";
import amb from "../assets/audio/amb/amb1.mp3";
import ktc from "../assets/audio/kotor/Kotor-Taris-Cantina.mp3";
import kmac from "../assets/audio/kotor/Kotor-Mannan-Ahto-City.mp3";
import kucc from "../assets/audio/kotor/Kotor-Upper-City-Cantina.mp3";

export const GlobalContext = createContext({
  name: "Jawa",
  sfx: new Howl({ src: [`${gui_scroll}`], html5: true }),
  amb: new Howl({ src: [`${amb}`], html5: true }),
});
