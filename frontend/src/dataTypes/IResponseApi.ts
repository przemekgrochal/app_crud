export interface IResponseApi {
    json: {
        accessToken: string,
        avatarUrl: string,
        email: string,
        name: string,
        message?: string;
    },
    status: number
}