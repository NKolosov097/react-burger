import { Middleware, MiddlewareAPI } from 'redux'
import { IWsSocketMiddlewareActions } from '../../utils/types'

export const socketMiddleware =
    (
        WS_API: string,
        wsActions: IWsSocketMiddlewareActions,
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
                onOpen,
                onClose,
                onError,
                onMessage,
            } = wsActions

            if (type === wsInit) {
                if (!isAuth) {
                    socket = new WebSocket(WS_API)
                } else {
                    socket = new WebSocket(
                        `${WS_API}?token=${localStorage.getItem('accessToken')}`
                    )
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
