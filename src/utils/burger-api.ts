import {
    IIngredientResponse,
    IUserResponse,
    IOptions,
    IRefreshTokenResponse,
} from './types'

export const NORMA_API: string = 'https://norma.nomoreparties.space/api'

const checkResponse = async <T>(res: Response): Promise<T> =>
    (await res.ok)
        ? res.json()
        : res.json().then((err: Error) => Promise.reject(err))

export const getIngredients = async () => {
    try {
        const res = await fetch(`${NORMA_API}/ingredients`)
        return await checkResponse<IIngredientResponse>(res)
    } catch (e) {
        throw new Error('Что-то пошло не так')
    }
}

export const postOrder = async (ingredients: Array<string>) => {
    try {
        const res = await fetch(`${NORMA_API}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients }),
        })
        return await checkResponse<IIngredientResponse>(res)
    } catch (e) {
        throw new Error('Что-то пошло не так')
    }
}

export const forgotPassword = async (email: string) => {
    try {
        const res = await fetch(`${NORMA_API}/password-reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
        return await checkResponse<IUserResponse>(res)
    } catch (e) {
        throw new Error('Что-то пошло не так')
    }
}

export const refreshToken = <T>(): Promise<T> =>
    fetch(`${NORMA_API}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    }).then(checkResponse<T>)

export const fetchWithRefresh = async (
    url: string,
    options: IOptions
): Promise<IUserResponse | IRefreshTokenResponse> => {
    try {
        const res = await fetch(url, options)
        return await checkResponse(res)
    } catch (error) {
        const err = error as Error
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken<IUserResponse>()
            if (!refreshData.success) {
                return Promise.reject(refreshData)
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken)
            localStorage.setItem('accessToken', refreshData.accessToken)

            // eslint-disable-next-line no-param-reassign
            options.headers.authorization = refreshData.accessToken
            const res = await fetch(url, options)
            return checkResponse<IRefreshTokenResponse>(res)
        }
        return Promise.reject(err)
    }
}