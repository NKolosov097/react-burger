import React, { useEffect, useCallback, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import modalOverlayStyles from './modal-overlay.module.css'
import {
    UPDATE_BUN_IN_CONSTRUCTOR,
    UPDATE_INGREDIENTS,
} from '../../../services/actions/burger-constructor-action'
import {
    INGREDIENT_DETAILS_CLOSE,
    ORDER_DETAILS_CLOSE,
} from '../../../services/actions/modal-details'
import { RESET_NUMBER_OF_ORDER } from '../../../services/actions/order-action/order-action'
import { RESET_COUNTS_OF_INGREDIENTS } from '../../../services/actions/ingredients-action/ingredients-action'
import { useDispatch } from '../../../store'

export const ModalOverlay = React.memo(
    ({
        orderDetailsFromConstructor = false,
    }: {
        orderDetailsFromConstructor: boolean
    }): ReactElement => {
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const handleClose = useCallback((): void => {
            navigate(-1)
        }, [navigate])

        useEffect(() => {
            const handleEscClose = (event: KeyboardEvent): void => {
                if (event.key === 'Escape') {
                    if (orderDetailsFromConstructor) {
                        dispatch({ type: UPDATE_INGREDIENTS, payload: [] })
                        dispatch({
                            type: UPDATE_BUN_IN_CONSTRUCTOR,
                            isBun: true,
                            payload: null,
                        })
                        dispatch({ type: ORDER_DETAILS_CLOSE })
                        dispatch({ type: RESET_NUMBER_OF_ORDER })
                        dispatch({ type: RESET_COUNTS_OF_INGREDIENTS })
                        return
                    }
                    dispatch({ type: INGREDIENT_DETAILS_CLOSE })
                    handleClose()
                }
            }

            document.addEventListener('keydown', handleEscClose)

            return () => document.removeEventListener('keydown', handleEscClose)
        }, [dispatch, handleClose, orderDetailsFromConstructor])

        const closeModal = (): void => {
            if (orderDetailsFromConstructor) {
                dispatch({ type: UPDATE_INGREDIENTS, payload: [] })
                dispatch({
                    type: UPDATE_BUN_IN_CONSTRUCTOR,
                    isBun: true,
                    payload: null,
                })
                dispatch({ type: ORDER_DETAILS_CLOSE })
                dispatch({ type: RESET_NUMBER_OF_ORDER })
                dispatch({ type: RESET_COUNTS_OF_INGREDIENTS })
                return
            }
            dispatch({ type: INGREDIENT_DETAILS_CLOSE })
            handleClose()
        }

        return (
            <button
                type="button"
                aria-label="modal-overlay"
                onClick={closeModal}
                onKeyDown={closeModal}
                className={modalOverlayStyles.modalOverlay__wrapper}
            />
        )
    }
)
