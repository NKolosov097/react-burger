import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const modalRoot = document.querySelector('#modal')

export function Modal({ children }) {
    return ReactDOM.createPortal(children, modalRoot)
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
}
