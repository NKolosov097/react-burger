import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import modalOverlayStyles from './modal-overlay.module.css'

export function ModalOverlay() {
    const dispatch = useDispatch()
    useEffect(() => {
        const handleEscClose = (event) => {
            if (event.key === 'Escape') {
                dispatch({ type: 'INGREDIENT_DETAILS_CLOSE' })
                dispatch({ type: 'ORDER_DETAILS_CLOSE' })
                dispatch({ type: 'RESET_NUMBER_OF_ORDER' })
            }
        }

        document.addEventListener('keydown', handleEscClose)

        return () => document.removeEventListener('keydown', handleEscClose)
    }, [dispatch])

    const closeModal = () => {
        dispatch({ type: 'INGREDIENT_DETAILS_CLOSE' })
        dispatch({ type: 'ORDER_DETAILS_CLOSE' })
        dispatch({ type: 'RESET_NUMBER_OF_ORDER' })
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
