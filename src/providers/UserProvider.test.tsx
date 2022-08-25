import { BrowserRouter } from "react-router-dom";
import { act, renderHook } from "@testing-library/react-hooks";
import { handlers } from "../msw/handlers";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { useUserContext } from "./UserProvider";

const server = setupServer(...handlers);

beforeEach(() => {
    server.listen();
});

afterEach(() => {
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

describe("Login",  () => {
    test("Should not redirect the user to the cockpit page", async () => {
        server.use(
            rest.post(
                "http://localhost:8000/api/auth/secured-log-in",
                async (req, res, ctx) => {
                    return res.once(
                        ctx.json({})
                    );
                }
            )
        )
        const { result, waitFor } = renderHook(useUserContext, { wrapper: BrowserRouter });
        expect(result.current.user).toEqual({ name: null, clientId: null });
        act(() => {
            result.current.handleLogin("admin@company.com");
        });
        await waitFor(() => {
            expect(result.current.user).not.toEqual({ name: "admin", clientId: "73c40f94-2da8-441b-858f-c4756e6c83f5" });
        });
        expect(mockUseNavigate).not.toHaveBeenCalledWith("/cockpit");
    });

    // test("Redirect the user to the cockpit page", async () => {
    //     const { result, waitFor } = renderHook(useUserContext, { wrapper: BrowserRouter });
    //     expect(result.current.user).toEqual({ name: null, clientId: null });
    //     act(() => {
    //         result.current.handleLogin("admin@company.com");
    //     });
    //     await waitFor(() => {
    //         expect(result.current.user).toEqual({ name: "admin", clientId: "73c40f94-2da8-441b-858f-c4756e6c83f5" });
    //     });
    //     expect(mockUseNavigate).toHaveBeenCalledWith("/cockpit");
    // });
});

