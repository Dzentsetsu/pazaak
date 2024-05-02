import { useEffect, useRef, useState } from "react";
import "./Wrapper.css";
import MusicPlayer from "./MusicPlayer";

export default function Wrapper() {
  const [clicked, setClicked] = useState(false);
  const ref = useRef<any>(null);

  function handleClick() {
    setClicked(true);
  }

  useEffect(() => {
    ref.current!.addEventListener("click", handleClick);
  }, []);

  return (
    <div className="Wrapper" ref={ref}>
      {clicked ? (
        <MusicPlayer />
      ) : (
        <div>Click anywhere to launch MusicPlayer</div>
      )}
    </div>
  );
}
