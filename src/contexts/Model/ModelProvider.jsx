import ModelContext from "./ModelContext";

import { useState } from "react";

function ModelProvider({ children }) {
  const [model, setModel] = useState(null);

  const closeModel = () => {
    setModel(null);
  };

  const openModel = (data) => {
    setModel(data);
  };

  // Expose openModel globally for use in non-component files (e.g., privateApi.js)
  if (typeof window !== 'undefined') {
    window.openGlobalModel = openModel;
  }


  return (
    <ModelContext.Provider value={{ model, setModel, closeModel, openModel }}>
      {children}
    </ModelContext.Provider>
  );
}

export default ModelProvider;
