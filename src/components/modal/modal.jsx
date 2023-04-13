import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import React from 'react'
import { ModalOverlay } from './modal-overlay/modal-overlay'

const modalRoot = document.querySelector('#modal')

export const Modal = React.memo(({ children, orderDetails }) =>
    ReactDOM.createPortal(
        <>
            <ModalOverlay orderDetails={orderDetails} />
            {children}
        </>,
        modalRoot
    )
)

Modal.propTypes = {
    children: PropTypes.node.isRequired,
}
