import { forgotPassword } from '../../utils/burger-api'

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED'

export const forgotPasswordAction = (email) => (dispatch) => {
    dispatch({
        type: FORGOT_PASSWORD_REQUEST,
    })
    forgotPassword(email)
        .then((res) => {
            if (res && res.success)
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS,
                    isOk: res.message === 'Reset email sent',
                })
        })
        .catch((error) =>
            dispatch({
                type: FORGOT_PASSWORD_FAILED,
                payload: error.message,
            })
        )
}
