import PropTypes from 'prop-types'

export const ingredientPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
})

export interface TLocation {
    background?: {
        pathname?: string
        search?: string
        hash?: string
        state?: null
        key?: string
    }
    from: string
    state?: object
}
export interface IIngredient {
    _id?: string
    ID?: string
    count?: number
    name?: string
    type?: string
    proteins?: number
    fat?: number
    carbohydrates?: number
    calories?: number
    price?: number
    image?: string
    image_mobile?: string
    image_large?: string
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

export interface IUserLogoutResponse {
    message: string
    success: boolean
    refreshToken: string
}
