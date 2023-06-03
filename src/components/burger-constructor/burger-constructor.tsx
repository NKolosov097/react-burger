import { ReactElement, useCallback, useMemo, useState } from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
// import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'
import burgerConstructorStyles from './burger-constructor.module.css'
import { MoneyLogo } from '../../images/money'
import { Bun } from './bun/bun'
import { IngredientsList } from './ingredients-list-in-constructor/ingredients-list'
// import { FailOrderDetails } from './order-details/fail-order-details'
import { OrderDetails } from './order-details/order-details'
import { Modal } from '../modal/modal'
import { IIngredient } from '../../utils/types'
import { UPDATE_INGREDIENTS } from '../../services/actions/burger-constructor-action'
import { useDispatch, useSelector } from '../../store'
import { getNumberOfOrder } from '../../services/actions/order-action/order-thunk'
import { paths } from '../../utils/routes/routes'

export function BurgerConstructor(): ReactElement {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        bun,
        ingredients,
    }: { bun: IIngredient | null; ingredients: Array<IIngredient> } =
        useSelector((store) => store.constructorReducer)

    const { user } = useSelector((store) => store.authReducer)
    const { numberOfOrder, isLoading } = useSelector(
        (store) => store.orderReducer
    )

    const modalRoot: HTMLDivElement | null = document.querySelector('#modal')

    const totalPrice: number | undefined =
        ingredients.reduce(
            (acc: number, item: IIngredient) =>
                acc + Number(item.price ? item.price : 0),
            0
        ) +
        Number(bun && bun.price ? bun?.price : 0) * 2

    const moveIngredients = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const dragIngredient: IIngredient = ingredients[dragIndex]
            const newIngredients: Array<IIngredient> = [...ingredients]
            newIngredients.splice(dragIndex, 1)
            newIngredients.splice(hoverIndex, 0, dragIngredient)

            dispatch({
                type: UPDATE_INGREDIENTS,
                payload: newIngredients,
            })
        },
        [dispatch, ingredients]
    )

    const orderIngredients: Array<string> = useMemo(() => {
        const orderIngredientsArr: Array<string> = []

        if (bun) orderIngredientsArr.push(bun._id)
        if (ingredients.length > 0)
            ingredients.forEach((ingredient: IIngredient) => {
                orderIngredientsArr.push(ingredient._id)
            })
        if (bun) orderIngredientsArr.push(bun._id)
        return orderIngredientsArr
    }, [bun, ingredients])

    const getOrder = () => {
        if (user) {
            setIsAuthorized(false)
            getNumberOfOrder(orderIngredients)(dispatch)
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized && modalRoot) navigate(paths.login)

    return (
        <section className={burgerConstructorStyles.wrapper}>
            <Bun bun={bun} coordinate="top" />
            <IngredientsList
                moveIngredients={moveIngredients}
                ingredients={ingredients}
            />
            <Bun bun={bun} coordinate="bottom" />

            <div className={burgerConstructorStyles.orderWrapper}>
                <h3 className={burgerConstructorStyles.totalPrice}>
                    {totalPrice}
                    <span className={burgerConstructorStyles.moneyLogo}>
                        <MoneyLogo />
                    </span>
                </h3>
                {bun && ingredients.length > 0 && (
                    <div className={burgerConstructorStyles.buttonWrapper}>
                        <Button
                            onClick={getOrder}
                            htmlType="button"
                            type="primary"
                            size="large"
                        >
                            Оформить заказ
                        </Button>
                    </div>
                )}
            </div>
            {numberOfOrder && !isLoading && (
                <Modal orderDetailsFromConstructor>
                    <OrderDetails isLoading={false} />
                </Modal>
            )}

            {isLoading && !numberOfOrder && (
                <Modal>
                    <OrderDetails isLoading />
                </Modal>
            )}

            {/* {isAuthorized && modalRoot
                ? ReactDOM.createPortal(<FailOrderDetails />, modalRoot)
                : null} */}
        </section>
    )
}
