import { useEffect } from 'react'
import PropTypes from 'prop-types'
import modalOverlayStyles from './modal-overlay.module.css'

export function ModalOverlay({ setIsOpened }) {
    useEffect(() => {
        const handleEscClose = (event) => {
            if (event.key === 'Escape') {
                setIsOpened(false)
            }
        }

        document.addEventListener('keydown', handleEscClose)

        return () => document.removeEventListener('keydown', handleEscClose)
    }, [setIsOpened])

    const closeModal = () => {
        setIsOpened(false)
    }

    return (
        <div
            role="button"
            tabIndex="0"
            aria-label="modal-overlay"
            onClick={closeModal}
            onKeyDown={closeModal}
            className={modalOverlayStyles.modalOverlay__wrapper}
        />
    )
}

ModalOverlay.prototype = {
    setIsOpened: PropTypes.func.isRequired,
}
