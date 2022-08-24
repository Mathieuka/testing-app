import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ShareGateTheme, ThemeProvider, createThemeVars } from "@sharegate/orbit-ui";
import { render } from "react-dom";
import { worker } from "./msw/browser";
import App from "./App";
import GroupProvider from "./providers/GroupProvider";
import React from "react";
import UserProvider from "./providers/UserProvider";

createThemeVars([ShareGateTheme]);

if (process.env.NODE_ENV === "development") {
    worker.start();
}

render(
    <BrowserRouter>
        <ThemeProvider height={"100%"} theme={ShareGateTheme} colorScheme="light">
            <UserProvider>
                <GroupProvider>
                    <App />
                </GroupProvider>
            </UserProvider>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
