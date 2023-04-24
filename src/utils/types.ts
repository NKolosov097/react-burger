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
    email: string
    name: string
}

export interface IIngredientResponse {
    data: Array<IIngredient>
    success: boolean
}

export interface IUserResponse {
    success: boolean
    user: IUser
    accessToken: string
    refreshToken: string
    message: string
}

export interface IRefreshTokenResponse {
    message: string
    success: boolean
    refreshToken: string
}

export interface IOptions extends RequestInit {
    headers: {
        authorization?: string
    }
}
