import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import React, { ReactElement } from 'react'
import img from '../../../images/done.png'
import detailsStyles from './order-details.module.css'
import { ORDER_DETAILS_CLOSE } from '../../../services/actions/modal-details'
import { RESET_NUMBER_OF_ORDER } from '../../../services/actions/order-action/order-action'
import {
    UPDATE_BUN_IN_CONSTRUCTOR,
    UPDATE_INGREDIENTS,
} from '../../../services/actions/burger-constructor-action'
import { RESET_COUNTS_OF_INGREDIENTS } from '../../../services/actions/ingredients-action/ingredients-action'
import { useDispatch, useSelector } from '../../../store'

type TOrderDetailsProps = {
    isLoading: boolean
}

export const OrderDetails = React.memo(
    ({ isLoading = false }: TOrderDetailsProps): ReactElement => {
        const dispatch = useDispatch()
        const closeModal = (): void => {
            dispatch({ type: ORDER_DETAILS_CLOSE })
            dispatch({ type: RESET_NUMBER_OF_ORDER })
            dispatch({
                type: UPDATE_BUN_IN_CONSTRUCTOR,
                isBun: true,
                payload: null,
            })
            dispatch({ type: UPDATE_INGREDIENTS, payload: [] })
            dispatch({ type: RESET_NUMBER_OF_ORDER })
            dispatch({ type: RESET_COUNTS_OF_INGREDIENTS })
        }

        const { numberOfOrder } = useSelector((store) => store.orderReducer)

        return (
            <div className={detailsStyles.container}>
                <h1 className="mb-4 mt-20 text text_type_digits-large">
                    {numberOfOrder}
                </h1>
                <button
                    className={detailsStyles.closeButton}
                    type="button"
                    onClick={closeModal}
                >
                    <CloseIcon type="primary" />
                </button>
                {!isLoading && (
                    <h2
                        className={cn(
                            'mb-15 mt-8 text text_type_main-default',
                            detailsStyles.identity
                        )}
                    >
                        идентификатор заказа
                    </h2>
                )}

                {!isLoading && <img className="mb-15" src={img} alt="done" />}
                {isLoading ? (
                    <p
                        className={cn(
                            'mb-2 text text_type_main-small',
                            detailsStyles.isLoadingP
                        )}
                    >
                        Ваш заказ обрабатывается
                    </p>
                ) : (
                    <p
                        className={cn(
                            'mb-2 text text_type_main-small',
                            detailsStyles.startOrder
                        )}
                    >
                        Ваш заказ начали готовить
                    </p>
                )}
                <p className="mb-2 text text_type_main-small text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        )
    }
)
