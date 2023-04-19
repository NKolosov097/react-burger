import React, { useCallback, useMemo, useState } from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import burgerConstructorStyles from './burger-constructor.module.css'
import { MoneyLogo } from '../../images/money'
import { Bun } from './bun/bun'
import { IngredientsList } from './ingredients-list-in-constructor/ingredients-list'
import { getNumberOfOrder } from '../../services/actions/order-action'
import { FailOrderDetails } from './order-details/fail-order-details'
import { OrderDetails } from './order-details/order-details'
import { Modal } from '../modal/modal.tsx'
// import { IIngredient } from '../../utils/types'

export const BurgerConstructor = React.memo(() => {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const dispatch = useDispatch()
    const { bun, ingredients } = useSelector(
        // @ts-ignore
        (store) => store.constructorReducer
    )

    // @ts-ignore
    const { user } = useSelector((store) => store.authReducer)
    // @ts-ignore
    const { numberOfOrder } = useSelector((store) => store.orderReducer)

    const modalRoot = document.querySelector('#modal')

    const totalPrice =
        ingredients.reduce((acc, item) => acc + item.price, 0) +
        Number(bun ? bun?.price : 0) * 2

    const moveIngredients = useCallback(
        (dragIndex, hoverIndex) => {
            const dragIngredient = ingredients[dragIndex]
            const newIngredients = [...ingredients]
            newIngredients.splice(dragIndex, 1)
            newIngredients.splice(hoverIndex, 0, dragIngredient)

            dispatch({
                type: 'UPDATE_INGREDIENTS',
                payload: newIngredients,
            })
        },
        [dispatch, ingredients]
    )

    const orderIngredients = useMemo(() => {
        const orderIngredientsArr = []

        if (bun) orderIngredientsArr.push(bun._id)
        if (ingredients.length > 0)
            ingredients.forEach((ingredient) => {
                orderIngredientsArr.push(ingredient._id)
            })
        if (bun) orderIngredientsArr.push(bun._id)
        return orderIngredientsArr
    }, [bun, ingredients])

    const getOrder = () => {
        if (user) {
            setIsAuthorized(false)
            // @ts-ignore
            dispatch(getNumberOfOrder(orderIngredients))
            dispatch({ type: 'ORDER_DETAILS_OPEN' })
        } else {
            setIsAuthorized(true)
        }
    }

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
            {numberOfOrder && (
                <Modal orderDetails>
                    <OrderDetails />
                </Modal>
            )}
            {isAuthorized && modalRoot
                ? ReactDOM.createPortal(<FailOrderDetails />, modalRoot)
                : null}
        </section>
    )
})
