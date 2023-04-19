import ReactDOM from 'react-dom'
import React, { ReactElement } from 'react'
import { ModalOverlay } from './modal-overlay/modal-overlay'

const modalRoot: HTMLDivElement | null = document.querySelector('#modal')

type TModalProps = {
    children: ReactElement
    orderDetails: boolean
}

export const Modal = React.memo(
    ({ children, orderDetails }: TModalProps): ReactElement =>
        modalRoot ? (
            ReactDOM.createPortal(
                <>
                    <ModalOverlay orderDetails={orderDetails} />
                    {children}
                </>,
                modalRoot
            )
        ) : (
            <></>
        )
)
