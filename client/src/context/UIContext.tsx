import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";

const UiContext = createContext(
  {} as {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedService: string;
    setSelectedService: React.Dispatch<React.SetStateAction<string>>;
  }
);
const UiContextProvider: React.FC = ({ children }): ReactElement => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  return (
    <UiContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        selectedService,
        setSelectedService,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
export default UiContextProvider;
export const useUiContext = () => useContext(UiContext);
