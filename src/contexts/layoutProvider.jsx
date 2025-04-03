import {
  createContext,
  useContext,
  useLayoutEffect,
  useEffect,
  useState,
} from "react";

const LayoutProvider = createContext();

function LayoutContext({ children }) {
  const [data, setData] = useState({ collapsed: false });

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setData(
        (prev) => JSON.parse(localStorage.getItem("configLayout")) ?? prev
      );
    }
  }, []);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("configLayout", JSON.stringify(data));
    }
  }, [data]);

  return (
    <LayoutProvider.Provider value={{ data, setData }}>
      {children}
    </LayoutProvider.Provider>
  );
}

export default LayoutContext;

export const getConfigLayout = () => {
  return useContext(LayoutProvider);
};
