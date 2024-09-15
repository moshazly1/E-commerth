import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext(null);

export default function WindowContext({ children }) {
  const [Windowsize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function setWindoWidth() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", setWindoWidth);
    // clean Function
    return () => {
      window.removeEventListener("resize", setWindoWidth);
    };
  }, []);

  return (
    <WindowSize.Provider value={{ Windowsize, setWindowSize }}>
      {children}
    </WindowSize.Provider>
  );
}
