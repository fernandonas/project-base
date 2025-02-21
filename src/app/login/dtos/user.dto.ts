export interface IUserRequest {
    email: string;
    password: string;
    token?: string;
    name?: string
}

export interface IUserResponse {
    email: string;
    token: string;
    userName: string
}