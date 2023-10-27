const { useContext, createContext, useState, useEffect } = require("react");

const searchContext = createContext();

const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keyword: "",
    results: [],
  });
  return (
    <searchContext.Provider value={{ values, setValues }}>
      {children}
    </searchContext.Provider>
  );
};

const useSearch = () => useContext(searchContext);

export { SearchProvider, useSearch };
