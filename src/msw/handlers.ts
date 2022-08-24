import { groups } from "./mocks/group";
import { rest } from "msw";
import { user, clientId } from "./mocks/user";

const loginHandler = [
    rest.post(
        "http://localhost:8000/api/auth/secured-log-in",
        (req, res, ctx) => {
            return res(
                ctx.json(user)
            );
        }
    )
];

const logoutHandler = [
    rest.post(
        `http://localhost:8000/api/auth/log-out?clientId=${clientId}`,
        (req, res, ctx) => {
            return res(
                ctx.json(user)
            );
        }
    )
];

const postsHandler = [
    rest.get(
        `http://localhost:8000/api/groups?clientId=${clientId}`,
        (req, res, ctx) => {
            return res(
                ctx.json({
                    groups
                })
            );
        }
    )
];


export const handlers = [...loginHandler, ...postsHandler, ...logoutHandler /*, ...other handlers*/];
