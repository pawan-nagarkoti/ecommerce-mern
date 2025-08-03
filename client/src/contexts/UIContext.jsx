import { createContext, useContext, useState } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [categoryValue, setCategoryValue] = useState("pawan"); // get category dropdown value
  const [brandValue, setBrandValue] = useState("ddd"); // get brand dropdown value
  const [callProducts, setCallProducts] = useState(false); // fetch product api
  const [isOpen, setIsOpen] = useState(false); // open and close side bar when we add products
  const [hasEditPrductBtnClicked, setHasEditProductBtnClicked] =
    useState(false);
  const [isProductId, setIsProductId] = useState(null);

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
        hasEditPrductBtnClicked,
        setHasEditProductBtnClicked,
        isProductId,
        setIsProductId,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default function useUI() {
  return useContext(UIContext);
}
