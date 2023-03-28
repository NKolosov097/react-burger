import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import img from '../../../images/done.png'
import { Loader } from '../../../images/loader'
import detailsStyles from './order-details.module.css'

export function OrderDetails() {
    const dispatch = useDispatch()
    const closeModal = () =>
        dispatch({ type: 'ORDER_DETAILS_CLOSE' }) &&
        dispatch({ type: 'RESET_NUMBER_OF_ORDER' })

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
            <h2
                className={cn(
                    'mb-15 mt-8 text text_type_main-default',
                    detailsStyles.identity
                )}
            >
                идентификатор заказа
            </h2>

            {<img className="mb-15" src={img} alt="done" /> || <Loader />}
            <p
                className={cn(
                    'mb-2 text text_type_main-small',
                    detailsStyles.startOrder
                )}
            >
                Ваш заказ начали готовить
            </p>
            <p className="mb-2 text text_type_main-small text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}
