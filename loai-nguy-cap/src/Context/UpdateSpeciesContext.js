import { createContext, useState } from "react";


 const ItemContext = createContext();

 function ItemProvider({ children }){
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <ItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export {ItemContext, ItemProvider}