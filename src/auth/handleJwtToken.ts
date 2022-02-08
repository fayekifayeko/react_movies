import { AuthResp, Claim } from "../models";

const tokenKey = 'token';
const expirationKey = 'token-expiration';

export function saveToken(authData: AuthResp) {
    localStorage.setItem(tokenKey, authData.token);
    localStorage.setItem(expirationKey, authData.expiration.toString());

} 

export function getClaims(): Claim[] {
    const token = localStorage.getItem(tokenKey);
    if(!token) return [];

    const expiration = localStorage.getItem(expirationKey)!;
    const expirationDate = new Date(expiration);
    if(expirationDate <= new Date()) {
        logout();
        return []; // token has been expired
    }

    const tokenData = JSON.parse(atob(token.split('.')[1])); // Jwt consists of 3 parts: header, userInfo(claims), key
    const response: Claim[] = [];

    for(const prop in tokenData) {
        response.push({name: prop, value: tokenData[prop]});
    }
return response;
}

export function logout() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(expirationKey);
}