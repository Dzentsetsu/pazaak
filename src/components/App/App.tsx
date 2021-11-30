import { BrowserRouter } from "react-router-dom";
import Routes from "../../pages/Routes";
import { GlobalContext } from "../../authcontext/GlobalContext";
import { CSSProperties, SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import Home from "../Home/Home";
import CSS from "*.module.css";
import { Howl, Howler } from "howler";
import Modal from "../Modal/Modal";

function App() {
  const [name, setName] = useState("Jawa");
  const [showModal, setShowModal] = useState(false);
  const selfRef = useRef<HTMLDivElement>(null);

  const styles: CSSProperties = {
    height: "100vh",
  };

  const customEventHandler = (e: Event) => {
    console.log("Listening for modal events");
    setShowModal(true);
  };
  useEffect(() => {
    selfRef.current?.addEventListener("modal", customEventHandler);

    return () => {
      selfRef.current?.removeEventListener("modal", customEventHandler);
    };
  }, []);
  const value = useContext(GlobalContext);

  return (
    <div className="App" style={styles} ref={selfRef}>
      {/* {showModal && <Modal show={showModal} onClose={setShowModal} />} */}
      <BrowserRouter>
        <GlobalContext.Provider value={value}>
          {/* <Home /> */}
          <Routes />
        </GlobalContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
