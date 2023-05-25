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
                wsClose,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
            } = wsActions

            let autoConnect: boolean = false
            let timer: NodeJS.Timeout | null = null

            const connect = () => {
                if (!isAuth) {
                    socket = new WebSocket(WS_API)
                } else {
                    socket = new WebSocket(
                        `${WS_API}?token=${localStorage.getItem('accessToken')}`
                    )
                }
                autoConnect = true
            }

            if (type === wsInit && !socket) {
                connect()
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen })
                }

                if (type === wsClose) {
                    if (timer) {
                        clearTimeout(timer)
                        timer = null
                    }
                    autoConnect = false
                    socket.close()
                    dispatch({ type: onClose })
                    return
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
                    if (autoConnect && !timer) {
                        timer = setTimeout(() => {
                            connect()
                            timer = null
                        }, 1000)
                    }
                    socket = null
                }

                if (type === wsSendMessage) {
                    const orders = { ...payload }
                    socket.send(JSON.stringify(orders))
                }
            }

            next(action)
        }
    }
