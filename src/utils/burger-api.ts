import {
    IIngredientResponse,
    IUser,
    IUserLogoutResponse,
    IUserResponse,
} from './types.ts'

export const NORMA_API: string = 'https://norma.nomoreparties.space/api'

const checkResponse = async <T>(res: Response): Promise<T> =>
    (await res.ok) ? res.json() : res.json().then((err) => Promise.reject(err))

export const getIngredients = async () => {
    try {
        const res = await fetch(`${NORMA_API}/ingredients`)
        return await checkResponse(res)
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
        return await checkResponse(res)
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
        return await checkResponse(res)
    } catch (e) {
        throw new Error('Что-то пошло не так')
    }
}

export const refreshToken = () =>
    fetch(`${NORMA_API}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    }).then(checkResponse)

type TOptions = {
    method: string
    headers: {
        [key: string]: string
        authorization?: string
    }
    body: IUser | IIngredientResponse | IUserResponse | IUserLogoutResponse
}

export const fetchWithRefresh = async (url: string, options: TOptions) => {
    try {
        const res = await fetch(url, options)
        return await checkResponse(res)
    } catch (err) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken()
            if (!refreshData.success) {
                return Promise.reject(refreshData)
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken)
            localStorage.setItem('accessToken', refreshData.accessToken)
            // eslint-disable-next-line no-param-reassign
            options.headers.authorization = refreshData.accessToken
            const res = await fetch(url, options)
            return checkResponse(res)
        }
        return Promise.reject(err)
    }
}
