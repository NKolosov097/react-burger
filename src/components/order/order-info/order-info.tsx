import { ReactElement, useMemo, useEffect } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import {
    CloseIcon,
    CurrencyIcon,
    FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import orderDetailsStyles from './order-info.module.css'
import { useDispatch, useSelector } from '../../../store'
import { paths } from '../../../utils/routes/routes'
import { IIngredient } from '../../../utils/types'
import { Ingredient } from '../ingredient/ingredient'
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
} from '../../../services/actions/WS-action'
import {
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_START,
} from '../../../services/actions/WS-auth-action'

type TOrderInfo = {
    newPage: boolean
}

export function OrderInfo({ newPage }: TOrderInfo): ReactElement {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { id } = useParams<{ id: string }>()
    const { ingredients } = useSelector((store) => store.ingredientsReducer)
    const ingredientsCopy: Array<IIngredient> = structuredClone(ingredients)

    const isOrders = !!useMatch<string, string>(
        `${paths.orders}${paths.orderDetails}`
    )

    const feedOrders = useSelector((store) => store.wsReducer.orders)
    const profileOrders = useSelector((store) => store.wsAuthReducer.orders)

    const orders = isOrders ? profileOrders : feedOrders

    useEffect(() => {
        if (isOrders) {
            dispatch({ type: WS_AUTH_CONNECTION_START })
        } else {
            dispatch({ type: WS_CONNECTION_START })
        }

        return () => {
            if (isOrders) {
                dispatch({ type: WS_AUTH_CONNECTION_CLOSED })
            } else {
                dispatch({ type: WS_CONNECTION_CLOSED })
            }
        }
    }, [dispatch, isOrders])

    const order = orders.find((item) => item._id === id)

    let status: string = ''
    let stylesStatus: string = orderDetailsStyles.statusDone

    if (order?.status === 'done') {
        status = 'Выполнен'
        stylesStatus = orderDetailsStyles.statusDone
    } else if (order?.status === 'pending') {
        status = 'Готовится'
        stylesStatus = orderDetailsStyles.statusPending
    } else if (order?.status === 'created') {
        status = 'Создан'
        stylesStatus = orderDetailsStyles.statusCreated
    } else {
        status = 'Отменен'
        stylesStatus = orderDetailsStyles.statusError
    }

    let stylesNumber = orderDetailsStyles.number
    if (!newPage) {
        stylesNumber = orderDetailsStyles.numberNewPage
    } else {
        stylesNumber = orderDetailsStyles.number
    }

    const getDate = () => {
        const date: string | undefined = order?.createdAt
        return <FormattedDate key={uuid()} date={new Date(date as string)} />
    }

    const ordersOfIngredients = useMemo(
        () =>
            order?.ingredients
                .map((el) =>
                    ingredientsCopy.find((item: IIngredient) => item._id === el)
                )
                .filter((ingredient) => ingredient),
        [order, ingredientsCopy]
    )

    const uniqueIngredients = useMemo(
        () =>
            Array.from(
                new Set<IIngredient>(ordersOfIngredients as IIngredient[])
            ),
        [ordersOfIngredients]
    )

    uniqueIngredients.map((item) => {
        const count = ordersOfIngredients?.filter(
            (ingredient) => ingredient?._id === item._id
        ).length
        // eslint-disable-next-line no-param-reassign
        item.count = count
        return item
    })

    const totalPrice = useMemo(
        () =>
            ordersOfIngredients?.reduce(
                (acc, ingredient) => acc + Number(ingredient?.price),
                0
            ),
        [ordersOfIngredients]
    )

    const closeModal = (): void => {
        navigate(-1)
    }

    return (
        <dialog className={orderDetailsStyles.wrapper}>
            <h2 className={stylesNumber}>#{order?.number}</h2>
            <h1 className={orderDetailsStyles.name}>{order?.name}</h1>
            <h3 className={`${stylesStatus} ${orderDetailsStyles.status}`}>
                {status}
            </h3>
            <button
                className={orderDetailsStyles.closeButton}
                type="button"
                onClick={closeModal}
            >
                {newPage ? <CloseIcon type="primary" /> : null}
            </button>
            <p className={orderDetailsStyles.constituent}>Состав:</p>
            <ul
                className={`${orderDetailsStyles.listOfOrders} pl-2 custom-scroll`}
            >
                {uniqueIngredients.map((item) => (
                    <Ingredient
                        key={uuid()}
                        image={item.image}
                        price={item.price}
                        name={item.name}
                        count={item.count}
                    />
                ))}
            </ul>
            <div className={orderDetailsStyles.timeAndTotal}>
                <div className={orderDetailsStyles.createdAt}>{getDate()}</div>
                <div className={orderDetailsStyles.totalPrice}>
                    <span>{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </dialog>
    )
}
