import ReactDOM from 'react-dom'
import React, { ReactElement } from 'react'
import { ModalOverlay } from './modal-overlay/modal-overlay'

const modalRoot: HTMLDivElement | null = document.querySelector('#modal')

type TModalProps = {
    children: ReactElement
    // eslint-disable-next-line react/require-default-props
    orderDetails?: boolean
}

export const Modal = React.memo(
    ({ children, orderDetails = false }: TModalProps): JSX.Element | null =>
        modalRoot
            ? ReactDOM.createPortal(
                  <>
                      <ModalOverlay orderDetails={orderDetails} />
                      {children}
                  </>,
                  modalRoot
              )
            : null
)
