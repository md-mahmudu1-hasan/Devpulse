import type { JwtPayload } from "jsonwebtoken";

export type TType = "bug" | "feature request";

export type TIssuePayload = {
    title: string;
    description: string;
    type: TType;
}

export type TAuthUser = JwtPayload & {
    id: number;
    name: string;
    role: "contributor" | "maintainer";
};