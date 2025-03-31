import { createContext, useContext, useEffect, useState } from "react";

const LayoutProvider = createContext();

function LayoutContext({ children }) {
  const [layoutConfig, setLayoutConfig] = useState(
    JSON.parse(localStorage.getItem("configLayout")) ?? {
      collapsed: false,
    }
  );

  const resuilt = {
    data: layoutConfig,
    action: {
      setLayoutConfig,
    },
  };

  useEffect(() => {
    localStorage.setItem("configLayout", JSON.stringify(layoutConfig));
  }, [layoutConfig]);

  return (
    <LayoutProvider.Provider value={resuilt}>
      {children}
    </LayoutProvider.Provider>
  );
}

export default LayoutContext;

export const getConfigLayout = () => {
  return useContext(Contextlayout);
};
