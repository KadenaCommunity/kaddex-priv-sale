import React from "react";
import { ThemeProvider } from "styled-components";
import Router from "./router/router";
import { theme } from "./styles/theme";
import GlobalStyle from "./styles/globalStyle";
import { PactProvider } from "./contexts/PactContext";
import NotificationContent from "./components/notification/NotificationContent";
import NotificationRender from "./components/notification/NotificationRender";
import { WalletProvider } from "./contexts/WalletContext";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NotificationRender>
        <PactProvider>
          <WalletProvider>
            <GlobalStyle />
            <Router />
          </WalletProvider>
        </PactProvider>
      </NotificationRender>
    </ThemeProvider>
  );
};

export default App;
