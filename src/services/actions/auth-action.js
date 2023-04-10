import { NORMA_API, fetchWithRefresh } from '../../utils/burger-api'

export const REQUEST = 'REQUEST'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_FAILED = 'REQUEST_FAILED'
export const SET_USER = 'SET_USER'
export const SET_IS_AUTH = 'SET_IS_AUTH'
export const SET_EMAIL_CORRECT_FLAG = 'SET_EMAIL_CORRECT_FLAG'

export const getUserData = () => async (dispatch) => {
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
    fetchWithRefresh(`${NORMA_API}/auth/user`, options)
        .then((res) => {
            if (res && res.success) {
                dispatch({
                    type: SET_USER,
                    user: res.user,
                })
            }
        })
        .catch((error) =>
            dispatch({
                type: REQUEST_FAILED,
                payload: error.message,
            })
        )
}

export const checkUserAuth = () => (dispatch) => {
    dispatch({
        type: REQUEST,
    })
    if (localStorage.getItem('accessToken')) {
        dispatch(getUserData())
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

export const registerAction = (email, password, name) => async (dispatch) => {
    dispatch({
        type: REQUEST,
    })
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
    }
    fetchWithRefresh(`${NORMA_API}/auth/register`, options)
        .then((res) => {
            if (res && res.success) {
                localStorage.setItem(
                    'accessToken',
                    res.accessToken.split('Bearer ')[1]
                )
                localStorage.setItem('refreshToken', res.refreshToken)
                const user = {
                    name: res.user.name,
                    email: res.user.email,
                }
                dispatch({
                    type: REQUEST_SUCCESS,
                    isChecked: true,
                    payload: user,
                })
            }
        })
        .catch((error) =>
            dispatch({
                type: REQUEST_FAILED,
                payload: error.message,
            })
        )
}

export const loginAction = (email, password) => async (dispatch) => {
    dispatch({
        type: REQUEST,
    })
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
                const user = {
                    name: res.user.name,
                    email: res.user.email,
                }
                dispatch({
                    type: REQUEST_SUCCESS,
                    isChecked: true,
                    payload: user,
                })
            }
        })
        .catch((error) =>
            dispatch({
                type: REQUEST_FAILED,
                payload: error.message,
            })
        )
}

export const logoutRequest = () => async (dispatch) => {
    dispatch({
        type: REQUEST,
    })
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    }
    fetchWithRefresh(`${NORMA_API}/auth/logout`, options)
        .then(() => {
            dispatch({
                type: REQUEST_SUCCESS,
                isChecked: true,
                payload: null,
            })
        })
        .catch((error) =>
            dispatch({
                type: REQUEST_FAILED,
                payload: error.message,
            })
        )
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}

export const passwordForgot = (email) => async (dispatch) => {
    dispatch({
        type: REQUEST,
    })
    const options = {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return fetch(`${NORMA_API}/password-reset`, options)
        .then(() => {
            dispatch({
                type: SET_EMAIL_CORRECT_FLAG,
                emailFlag: true,
            })
        })
        .catch((error) =>
            dispatch({
                type: REQUEST_FAILED,
                payload: error.message,
            })
        )
}

export const passwordReset = (password, token) => async (dispatch) => {
    dispatch({
        type: REQUEST,
    })
    const options = {
        method: 'POST',
        body: JSON.stringify({ token, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return fetch(`${NORMA_API}/password-reset/reset`, options)
        .then((res) => {
            dispatch({
                type: SET_EMAIL_CORRECT_FLAG,
                emailFlag: true,
            })
            dispatch({
                type: REQUEST_SUCCESS,
                isChecked: true,
                user: res.user,
            })
        })
        .catch((error) =>
            dispatch({
                type: REQUEST_FAILED,
                payload: error.message,
            })
        )
}

export const patchUserInfo = (email, password, name) => async (dispatch) => {
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
    fetchWithRefresh(`${NORMA_API}/auth/user`, options)
        .then((res) => {
            if (res && res.success) {
                dispatch({
                    type: SET_USER,
                    user: res.user,
                })
            }
        })
        .catch((error) =>
            dispatch({
                type: REQUEST_FAILED,
                payload: error.message,
            })
        )
}
