const { useContext, createContext, useState, useEffect } = require("react");

const CardContext = createContext();

const CardProvider = ({ children }) => {
  const [card, setCard] = useState([]);

  useEffect(() => {
    let existingCardItem = localStorage.getItem("card");
    if (existingCardItem) setCard(JSON.parse(existingCardItem));
  }, []);

  return (
    <CardContext.Provider value={{ card, setCard }}>
      {children}
    </CardContext.Provider>
  );
};

const useCard = () => useContext(CardContext);

export { CardProvider, useCard };
