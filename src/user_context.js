import { createContext } from 'react';

/* Context in which we will store the logged in user's data */
export const userContext = createContext({
    token: '',
    username: '',
    email: '',

    setToken: () => {},
    setUsername: () => {},
    setEmail: () => {},
});