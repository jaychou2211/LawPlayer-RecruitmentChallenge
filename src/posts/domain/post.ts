import { STATUS } from "./status";


export interface Post {
    id: number | null,
    coverUrl: string,
    imgurCoverUrl: string | null,
    status: STATUS
}


export function Post(
    id: number | null,
    coverUrl: string,
    imgurCoverUrl: string | null,
    status: STATUS
): Post {
    return { id, coverUrl, imgurCoverUrl, status }
}
