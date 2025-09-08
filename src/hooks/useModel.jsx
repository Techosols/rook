import { useContext } from "react";
import ModelContext from "../contexts/Model/ModelContext";

export default function useModel() {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
}