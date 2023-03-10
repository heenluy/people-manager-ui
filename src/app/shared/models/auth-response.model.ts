export interface TokenResponse {
    type: string,
    access_token: Token,
    refresh_token: Token
}

interface Token { exp: Date, token: string }