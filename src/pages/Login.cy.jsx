import Login, { TextComponent } from './Login';
import { BrowserRouter } from "react-router-dom";
import {ShareGateTheme, ThemeProvider} from "@sharegate/orbit-ui";
import UserProvider from "../providers/UserProvider";
import GroupProvider from "../providers/GroupProvider";
import React from "react";

describe('Should render Login page', () => {
    it('Text Component', () => {
        cy.mount(<TextComponent />)
        cy.get("[aria-label=some-text]")
            .should("have.text", "Signin with your Microsoft account to manage your collaborative governance efforts")
    })

    it('Composed component with contexts', () => {
        cy.mount( <BrowserRouter>
                    <ThemeProvider height={"100%"} theme={ShareGateTheme} colorScheme="light">
                        <UserProvider>
                            <GroupProvider>
                                <Login />
                            </GroupProvider>
                        </UserProvider>
                    </ThemeProvider>
                  </BrowserRouter>)
        cy.get("[aria-label=some-text]")
            .should("have.text", "Signin with your Microsoft account to manage your collaborative governance efforts")
    })
})

