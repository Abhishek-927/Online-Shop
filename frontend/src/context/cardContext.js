import { toast } from "react-toastify";

const { useContext, createContext, useState, useEffect } = require("react");

const CardContext = createContext();

const CardProvider = ({ children }) => {
  const [card, setCard] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    let existingCardItem = localStorage.getItem("card");
    if (existingCardItem) setCard(JSON.parse(existingCardItem));
  }, []);

  const addToCard = (pro) => {
    let temp = { ...pro };
    delete temp.photo;
    setCard([...card, temp]);
    toast.success("Item added");
    localStorage.setItem("card", JSON.stringify([...card, temp]));
  };

  return (
    <CardContext.Provider
      value={{ card, setCard, addToCard, selectedProduct, setSelectedProduct }}
    >
      {children}
    </CardContext.Provider>
  );
};

const useCard = () => useContext(CardContext);

export { CardProvider, useCard };
