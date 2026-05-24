export type TUserRole = "contributor" | "maintainer";

export interface TSignupUser {
    name: string
    email: string
    password: string
    role: TUserRole
}

export interface TLoginUser {
    email: string
    password: string
}