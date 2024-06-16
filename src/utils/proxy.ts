import proxy from "express-http-proxy"

export const createProxy = (url: string) => proxy(url)
