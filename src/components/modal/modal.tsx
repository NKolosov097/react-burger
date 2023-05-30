import ReactDOM from 'react-dom'
import React, { ReactElement } from 'react'
import { ModalOverlay } from './modal-overlay/modal-overlay'

const modalRoot: HTMLDivElement | null = document.querySelector('#modal')

type TModalProps = {
    children: ReactElement
    // eslint-disable-next-line react/require-default-props
    orderDetailsFromConstructor?: boolean
}

export const Modal = React.memo(
    ({
        children,
        orderDetailsFromConstructor = false,
    }: TModalProps): JSX.Element | null =>
        modalRoot
            ? ReactDOM.createPortal(
                  <>
                      <ModalOverlay
                          orderDetailsFromConstructor={
                              orderDetailsFromConstructor
                          }
                      />
                      {children}
                  </>,
                  modalRoot
              )
            : null
)
