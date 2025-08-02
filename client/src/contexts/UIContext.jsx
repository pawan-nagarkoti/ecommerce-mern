import { createContext, useContext, useState } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [categoryValue, setCategoryValue] = useState("");
  const [brandValue, setBrandValue] = useState("");
  const [callProducts, setCallProducts] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{
        categoryValue,
        setCategoryValue,
        brandValue,
        setBrandValue,
        callProducts,
        setCallProducts,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default function useUI() {
  return useContext(UIContext);
}
