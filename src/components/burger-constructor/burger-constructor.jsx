import { useCallback, useMemo } from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import burgerConstructorStyles from './burger-constructor.module.css'
import { OrderDetails } from './order-details/order-details'
import { ModalOverlay } from '../modal/modal-overlay/modal-overlay'
import { MoneyLogo } from '../../images/money'
import { Modal } from '../modal/modal'
import { Bun } from './bun/bun'
import { IngredientsList } from './ingredients-list-in-constructor/ingredients-list'
import { getNumberOfOrder } from '../../services/actions/order-action'

export function BurgerConstructor() {
    const dispatch = useDispatch()

    const isOpened = useSelector(
        (state) => state.modalDetailsReducer.isOpenedOrderDetails
    )
    const { bun, ingredients } = useSelector(
        (store) => store.constructorReducer
    )

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
        dispatch(getNumberOfOrder(orderIngredients))
        dispatch({ type: 'ORDER_DETAILS_OPEN' })
    }

    const checkOrder = () => {
        if (bun && ingredients.length > 0) {
            return getOrder()
        }
        return null
    }

    return (
        <>
            <section className={burgerConstructorStyles.wrapper}>
                <Bun bun={bun} coordinate="top" />
                <IngredientsList
                    moveIngredients={moveIngredients}
                    ingredients={ingredients}
                />
                <Bun bun={bun} coordinate="bottom" />

                <h3 className={burgerConstructorStyles.totalPrice}>
                    {totalPrice}
                    <span className={burgerConstructorStyles.moneyLogo}>
                        <MoneyLogo />
                    </span>
                </h3>
                <div className={burgerConstructorStyles.buttonWrapper}>
                    <Button
                        onClick={checkOrder}
                        htmlType="button"
                        type="primary"
                        size="large"
                    >
                        Оформить заказ
                    </Button>
                </div>
            </section>
            {isOpened && (
                <>
                    <Modal>
                        <OrderDetails />
                    </Modal>
                    <ModalOverlay />
                </>
            )}
        </>
    )
}
