import React, { ReactElement } from "react";
import QueryDataContextProvider from "./QueryDataContext";
import UiContextProvider from "./UIContext";
import UserContextProvider from "./UserContext";

const GlobalContextProvider: React.FC = ({ children }): ReactElement => {
  return (
    // <TrialContextProvider>
    <UserContextProvider>
      <UiContextProvider>
        <QueryDataContextProvider>{children}</QueryDataContextProvider>
      </UiContextProvider>
    </UserContextProvider>
    // </TrialContextProvider>
  );
};

export default GlobalContextProvider;
