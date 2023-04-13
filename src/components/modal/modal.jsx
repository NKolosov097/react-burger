import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { ModalOverlay } from './modal-overlay/modal-overlay'

const modalRoot = document.querySelector('#modal')

export function Modal({ children }) {
    return ReactDOM.createPortal(
        <>
            <ModalOverlay />
            {children}
        </>,
        modalRoot
    )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
}
