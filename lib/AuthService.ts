
import jsonwebtoken from 'jsonwebtoken';

export type globalType = {
    authService?: AuthService
}

export type JWTType = {
    id: number,
    email: string,
}

const vars = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
}

class AuthService {

    constructor() {
        if ((global as globalType).authService) {
            throw new Error("New instance cannot be created!!");
        } else {

        }
        (global as globalType).authService = this;
    }

    generateAccessToken(jwt: JWTType) {
        const accessToken = jsonwebtoken.sign(jwt, vars.ACCESS_TOKEN_SECRET || "", { expiresIn: '24h' });
        return accessToken
    }

    checkIfAccessTokenIsValid(accessToken: string) {
        try {
            jsonwebtoken.verify(accessToken, vars.ACCESS_TOKEN_SECRET || "")
            return jsonwebtoken.decode(accessToken)
        } catch (error) {
            return false
        }
    }
}

let authServiceSingleton
if (!(global as globalType).authService) authServiceSingleton = new AuthService()
else authServiceSingleton = (global as globalType).authService
export default authServiceSingleton as AuthService;