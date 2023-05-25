import { IWSMiddlewareActions } from './types'
import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
    WS_SEND_ORDERS,
} from '../services/actions/WS-action'
import {
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_START,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_GET_ORDERS,
    WS_AUTH_SEND_ORDERS,
} from '../services/actions/WS-auth-action'

export const WS_API: 'wss://norma.nomoreparties.space/orders' =
    'wss://norma.nomoreparties.space/orders'

export const wsActions: IWSMiddlewareActions = {
    wsInit: WS_CONNECTION_START,
    wsClose: WS_CONNECTION_CLOSE,
    wsSendMessage: WS_SEND_ORDERS,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_ORDERS,
}

export const wsAuthActions: IWSMiddlewareActions = {
    wsInit: WS_AUTH_CONNECTION_START,
    wsClose: WS_CONNECTION_CLOSE,
    wsSendMessage: WS_AUTH_SEND_ORDERS,
    onOpen: WS_AUTH_CONNECTION_SUCCESS,
    onClose: WS_AUTH_CONNECTION_CLOSED,
    onError: WS_AUTH_CONNECTION_ERROR,
    onMessage: WS_AUTH_GET_ORDERS,
}
