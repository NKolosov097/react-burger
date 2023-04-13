import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import modalOverlayStyles from './modal-overlay.module.css'

export function ModalOverlay() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClose = useCallback(() => {
        navigate(-1)
    }, [navigate])

    useEffect(() => {
        const handleEscClose = (event) => {
            if (event.key === 'Escape') {
                dispatch({ type: 'INGREDIENT_DETAILS_CLOSE' })
                dispatch({ type: 'ORDER_DETAILS_CLOSE' })
                dispatch({ type: 'RESET_NUMBER_OF_ORDER' })
                handleClose()
            }
        }

        document.addEventListener('keydown', handleEscClose)

        return () => document.removeEventListener('keydown', handleEscClose)
    }, [dispatch, handleClose])

    const closeModal = () => {
        dispatch({ type: 'INGREDIENT_DETAILS_CLOSE' })
        dispatch({ type: 'ORDER_DETAILS_CLOSE' })
        dispatch({ type: 'RESET_NUMBER_OF_ORDER' })
        handleClose()
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
