export interface IIngredient {
    _id: string
    ID?: string
    count?: number
    name: string
    type: string
    proteins: number
    fat: number
    carbohydrates: number
    calories: number
    price: number
    image: string
    image_mobile?: string
    image_large: string
    __v?: number
}

export interface IUser {
    email?: string
    name?: string
    password?: string
    token?: string
}

export interface IIngredientResponse {
    data: Array<IIngredient>
    success?: boolean
    order: { number: number }
}

export interface IUserResponse {
    success: boolean
    user: IUser | null
    accessToken: string
    refreshToken: string
    message: string
}

export interface IRefreshTokenResponse {
    message: string
    success: boolean
    user: IUser
    accessToken: string
    refreshToken: string
}

export interface IOptions extends RequestInit {
    headers: {
        authorization?: string
    }
}

export type TOrder = {
    ingredients: Array<string>
    _id: string
    name?: string
    status: string
    number: string
    createdAt: string
    updatedAt: string
}

export interface IWSMiddlewareActions {
    wsInit: string
    wsSendMessage: string
    wsClose: string
    onOpen: string
    onClose: string
    onError: string
    onMessage: string
}

export interface IFeed {
    createdAt: string
    ingredients: string[]
    name: string
    number: number
    status: string
    updatedAt: string
    _id: string
}

export interface IFeedResponse {
    success: boolean
    total: number
    totalToday: number
    orders: Array<IFeed>
}
