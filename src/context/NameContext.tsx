import { createContext, useState } from "react";

const NameContext = createContext<string>("");

function NameProvider(props: []) {
  const [userName, setUserName] = useState("Jabba The Hutt");

  return <NameContext.Provider value={userName} {...props} />;
}

function useName() {}

export { NameContext, useName };
