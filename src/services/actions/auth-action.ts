import { NORMA_API, fetchWithRefresh } from '../../utils/burger-api'
import { IUser } from '../../utils/types'

export const REQUEST: 'REQUEST' = 'REQUEST'
export const REQUEST_SUCCESS: 'REQUEST_SUCCESS' = 'REQUEST_SUCCESS'
export const REQUEST_FAILED: 'REQUEST_FAILED' = 'REQUEST_FAILED'
export const SET_USER: 'SET_USER' = 'SET_USER'
export const SET_IS_AUTH: 'SET_IS_AUTH' = 'SET_IS_AUTH'
export const SET_EMAIL_CORRECT_FLAG: 'SET_EMAIL_CORRECT_FLAG' =
    'SET_EMAIL_CORRECT_FLAG'
export type TAuthActions =
    | {
          type: typeof REQUEST
      }
    | {
          type: typeof REQUEST_SUCCESS
          user: IUser | null
      }
    | {
          type: typeof REQUEST_FAILED
      }
    | {
          type: typeof SET_USER
          user: IUser | null
      }
    | {
          type: typeof SET_IS_AUTH
      }
    | {
          type: typeof SET_EMAIL_CORRECT_FLAG
      }

export const getUserData = () => async (dispatch: any) => {
    dispatch({
        type: REQUEST,
    })
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }
    await fetchWithRefresh(`${NORMA_API}/auth/user`, options)
        .then((res) => {
            if (res && res.success) {
                dispatch({
                    type: SET_USER,
                    user: res.user,
                })
            }
        })
        .catch(() =>
            dispatch({
                type: REQUEST_FAILED,
            })
        )
}

export const checkUserAuth = () => (dispatch: any) => {
    dispatch({
        type: REQUEST,
    })
    if (localStorage.getItem('accessToken')) {
        getUserData()(dispatch)
            .catch(() => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                dispatch({ type: SET_USER, user: null })
            })
            .finally(() => dispatch({ type: SET_IS_AUTH }))
    } else {
        dispatch({ type: SET_IS_AUTH })
    }
}

export const registerAction =
    ({ email, password, name }: IUser) =>
    async (dispatch: any): Promise<void> => {
        dispatch({
            type: REQUEST,
        })
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: undefined,
            },
            body: JSON.stringify({ email, password, name }),
        }
        await fetchWithRefresh(`${NORMA_API}/auth/register`, options)
            .then((res) => {
                if (res && res.success) {
                    localStorage.setItem(
                        'accessToken',
                        res.accessToken.split('Bearer ')[1]
                    )
                    localStorage.setItem('refreshToken', res.refreshToken)
                    if (res.user) {
                        const user = {
                            name: res.user.name,
                            email: res.user.email,
                        }
                        dispatch({
                            type: REQUEST_SUCCESS,
                            user,
                        })
                    }
                }
            })
            .catch(() =>
                dispatch({
                    type: REQUEST_FAILED,
                })
            )
    }

export const loginAction =
    ({ email, password }: IUser) =>
    async (dispatch: any) => {
        dispatch({
            type: REQUEST,
        })
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: undefined,
            },
            body: JSON.stringify({ email, password }),
        }
        return fetchWithRefresh(`${NORMA_API}/auth/login`, options)
            .then((res) => {
                if (res && res.success) {
                    localStorage.setItem(
                        'accessToken',
                        res.accessToken.split('Bearer ')[1]
                    )
                    localStorage.setItem('refreshToken', res.refreshToken)
                    if (res.user) {
                        const user = {
                            name: res.user.name,
                            email: res.user.email,
                        }
                        dispatch({
                            type: REQUEST_SUCCESS,
                            user,
                        })
                    }
                }
            })
            .catch(() =>
                dispatch({
                    type: REQUEST_FAILED,
                })
            )
    }

export const logoutRequest =
    () =>
    async (dispatch: any): Promise<void> => {
        dispatch({
            type: REQUEST,
        })
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: undefined,
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken'),
            }),
        }
        await fetchWithRefresh(`${NORMA_API}/auth/logout`, options)
            .then((res) => {
                if (res && res.success)
                    dispatch({
                        type: REQUEST_SUCCESS,
                        user: null,
                    })
            })
            .catch(() =>
                dispatch({
                    type: REQUEST_FAILED,
                })
            )
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

export const passwordForgot = (email: string) => async (dispatch: any) => {
    dispatch({
        type: REQUEST,
    })
    const options = {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
            'Content-Type': 'application/json',
            authorization: undefined,
        },
    }
    return fetchWithRefresh(`${NORMA_API}/password-reset`, options)
        .then(() => {
            dispatch({
                type: SET_EMAIL_CORRECT_FLAG,
            })
        })
        .catch(() =>
            dispatch({
                type: REQUEST_FAILED,
            })
        )
}

export const passwordReset =
    ({ password, token }: IUser) =>
    async (dispatch: any) => {
        dispatch({
            type: REQUEST,
        })
        const options = {
            method: 'POST',
            body: JSON.stringify({ token, password }),
            headers: {
                'Content-Type': 'application/json',
                authorization: undefined,
            },
        }
        return fetchWithRefresh(`${NORMA_API}/password-reset/reset`, options)
            .then((res) => {
                dispatch({
                    type: SET_EMAIL_CORRECT_FLAG,
                })
                dispatch({
                    type: REQUEST_SUCCESS,
                    isChecked: true,
                    user: res.user,
                })
            })
            .catch(() =>
                dispatch({
                    type: REQUEST_FAILED,
                })
            )
    }

export const patchUserInfo =
    ({ email, password, name }: IUser) =>
    async (dispatch: any) => {
        dispatch({
            type: REQUEST,
        })
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({ email, name, password }),
        }
        await fetchWithRefresh(`${NORMA_API}/auth/user`, options)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: SET_USER,
                        user: res.user,
                    })
                }
            })
            .catch(() =>
                dispatch({
                    type: REQUEST_FAILED,
                })
            )
    }
