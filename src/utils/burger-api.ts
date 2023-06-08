import {
    IIngredientResponse,
    IUserResponse,
    IRefreshTokenResponse,
    IOptions,
} from './types'

export const NORMA_API: string = 'https://norma.nomoreparties.space/api'

export const checkResponse = <T>(res: Response): Promise<T> =>
    res.ok ? res.json() : Promise.reject(res.status)

export const getIngredients = async (): Promise<IIngredientResponse> => {
    try {
        const res = await fetch(`${NORMA_API}/ingredients`)
        return await checkResponse<IIngredientResponse>(res)
    } catch (e) {
        throw new Error('Что-то пошло не так')
    }
}

export const postOrder = async (
    ingredients: Array<string>
): Promise<IIngredientResponse> => {
    try {
        const res = await fetch(
            `${NORMA_API}/orders?token=${localStorage.getItem('accessToken')}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
                body: JSON.stringify({ ingredients }),
            }
        )
        return await checkResponse<IIngredientResponse>(res)
    } catch (e) {
        throw new Error('Что-то пошло не так')
    }
}

export const forgotPassword = async (email: string): Promise<IUserResponse> => {
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
