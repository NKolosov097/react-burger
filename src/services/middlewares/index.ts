import { Middleware, MiddlewareAPI } from 'redux'
import { IWSMiddlewareActions } from '../../utils/types'

export const socketMiddleware =
    (
        WS_API: string,
        wsActions: IWSMiddlewareActions,
        isAuth: boolean = false
    ): Middleware =>
    (store: MiddlewareAPI) => {
        let socket: WebSocket | null = null

        return (next) => (action) => {
            const { dispatch } = store
            const { type, payload } = action
            const {
                wsInit,
                wsSendMessage,
                wsClose,
                onOpen,
                onClose,
                onError,
                onMessage,
            } = wsActions

            if (type === wsInit && !socket) {
                if (!isAuth) {
                    socket = new WebSocket(WS_API)
                } else {
                    socket = new WebSocket(
                        `${WS_API}?token=${localStorage.getItem('accessToken')}`
                    )
                }
            }
            if (type === wsActions.wsClose && socket) {
                socket.onclose = () => {
                    dispatch({ type: wsClose })
                }
            }
            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen })
                }

                socket.onerror = () => {
                    dispatch({ type: onError })
                }

                socket.onmessage = (event) => {
                    const { data } = event
                    const parsedData = JSON.parse(data)
                    const { success, ...restParsedData } = parsedData

                    dispatch({ type: onMessage, payload: restParsedData })
                }

                socket.onclose = () => {
                    dispatch({ type: onClose })
                }

                if (type === wsSendMessage) {
                    const orders = { ...payload }
                    socket.send(JSON.stringify(orders))
                }
            }

            next(action)
        }
    }
