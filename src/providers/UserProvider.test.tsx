import { BrowserRouter } from "react-router-dom";
import { act, renderHook } from "@testing-library/react-hooks";
import { handlers } from "../msw/handlers";
import { setupServer } from "msw/node";
import { useUserContext } from "./UserProvider";

const server = setupServer(...handlers);

global.beforeEach(() => {
    server.listen();
});

global.afterEach(() => {
    server.close();
});

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => {
    const originalModule = jest.requireActual("react-router-dom");

    return {
        ...originalModule,
        useNavigate: () => mockUseNavigate
    };
});

describe("Auth", () => {
    test("Should login", async () => {
        const { result, waitFor } = renderHook(useUserContext, { wrapper: BrowserRouter });
        expect(result.current.user).toEqual({ name: null, clientId: null });
        act(() => {
            result.current.handleLogin("admin@company.com");
        });
        await waitFor(() => {
            expect(result.current.user).toEqual({ name: "admin", clientId: "73c40f94-2da8-441b-858f-c4756e6c83f5" });
        });
        expect(mockUseNavigate).toHaveBeenCalledWith("/cockpit");
    });
    
});