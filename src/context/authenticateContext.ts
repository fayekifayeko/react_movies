import { createContext } from "react";
import { Claim } from "../models";

export const AuthunticateContext = createContext<
{
    claims: Claim[];
    update(claims: Claim[]): void;
}
>({claims: [], update: () => {}});

export default AuthunticateContext;