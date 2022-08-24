import { groups } from "./mocks/group";
import { rest } from "msw";
import { user } from "./mocks/user";

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

const postsHandler = [
    rest.get(
        "http://localhost:8000/api/groups?clientId=73c40f94-2da8-441b-858f-c4756e6c83f5",
        (req, res, ctx) => {
            return res(
                ctx.json({
                    groups
                })
            );
        }
    )
];

export const handlers = [...loginHandler, ...postsHandler /*, ...other handlers*/];
