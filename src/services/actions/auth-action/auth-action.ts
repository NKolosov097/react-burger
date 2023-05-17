import { IUser } from '../../../utils/types'

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
