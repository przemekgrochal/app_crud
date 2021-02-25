import { logInApi } from "./logInApi";
import { usersApi } from "./usersApi";
import { authApi } from "./authApi";
import { registerApi } from "./registerApi";

export const fetchData = {
    logInApi: logInApi,
    registerApi: registerApi,
    usersApi: usersApi,
    authApi: authApi,
};
