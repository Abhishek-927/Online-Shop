const { useContext, createContext, useState, useEffect } = require("react");

const categoryContext = createContext();

const CategoryProvider = ({ children }) => {
  return (
    <categoryContext.Provider value={{}}>{children}</categoryContext.Provider>
  );
};

const useCategory = () => useContext(categoryContext);

export { CategoryProvider, useCategory };
