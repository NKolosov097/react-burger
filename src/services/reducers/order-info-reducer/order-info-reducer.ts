import { IIngredient } from '../../../utils/types'
import {
    ORDER_INFO_CLOSE,
    ORDER_INFO_OPEN,
    TOrderInfoAction,
} from '../../actions/order-info-action'

type TOrderInfoState = {
    isOrderInfoOpened: boolean
    payload: IIngredient | null
}

export const initialState: TOrderInfoState = {
    isOrderInfoOpened: false,
    payload: null,
}

export const orderInfoReducer = (
    // eslint-disable-next-line @typescript-eslint/default-param-last
    state = initialState,
    action: TOrderInfoAction
): TOrderInfoState => {
    switch (action.type) {
        case ORDER_INFO_OPEN:
            return {
                ...state,
                isOrderInfoOpened: true,
            }
        case ORDER_INFO_CLOSE:
            return {
                ...state,
                isOrderInfoOpened: false,
            }
        default:
            return state
    }
}
