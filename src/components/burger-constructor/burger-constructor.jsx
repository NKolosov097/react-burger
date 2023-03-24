import {
    Button,
    ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
// import { useDrop } from 'react-dnd/dist/hooks'
import burgerConstructorStyles from './burger-constructor.module.css'
import { OrderDetails } from './order-details/order-details'
import { ModalOverlay } from '../modal/modal-overlay/modal-overlay'
import { MoneyLogo } from '../../images/money'
import { Modal } from '../modal/modal'
import { Loader } from '../../images/loader'
import { AssemblingBurger } from './assembling-burger/assembling-burger'

export function BurgerConstructor({ data }) {
    const dispatch = useDispatch()
    // const onDropHandler = (itemId) =>
    //     dispatch({ type: 'ADD_INGREDIENT_TO_CONSTRUCTOR', payload: { type: itemId }})
    // const [, dropTarget] = useDrop({
    //     accept: 'animal',
    //     drop(itemId) {
    //         onDropHandler(itemId)
    //     },
    // })

    const isOpened = useSelector(
        (state) => state.modalDetailsReducer.isOpenedOrderDetails
    )
    const { bun, ingredients } = useSelector(
        (store) => store.constructorReducer
    )

    const totalPrice =
        ingredients.reduce((acc, item) => acc + item.price, 0) +
        Number(bun ? bun?.price : 0) * 2

    return (
        <>
            {(data.length > 0 && (
                <section className={burgerConstructorStyles.wrapper}>
                    <div className={burgerConstructorStyles.container}>
                        <div className="pl-20 ml-1">
                            {bun ? (
                                <ConstructorElement
                                    type="top"
                                    isLocked
                                    text={bun?.name}
                                    price={bun?.price}
                                    thumbnail={bun?.image}
                                />
                            ) : (
                                <div
                                    style={{
                                        textAlign: 'center',
                                    }}
                                    className="constructor-element constructor-element_pos_top"
                                >
                                    <span
                                        style={{
                                            transform: 'translateY(50%)',
                                        }}
                                        className="constructor-element__text"
                                    >
                                        Выбери булку
                                    </span>
                                </div>
                            )}
                        </div>
                        {ingredients.length > 0 ? (
                            <ul
                                className={cn(
                                    'm-2 custom-scroll',
                                    burgerConstructorStyles.list
                                )}
                            >
                                {ingredients.map(
                                    (item) =>
                                        item.type !== 'bun' && (
                                            <AssemblingBurger
                                                key={item?.ID}
                                                image={item?.image}
                                                price={item?.price}
                                                name={item?.name}
                                                ID={item?.ID}
                                            />
                                        )
                                )}
                            </ul>
                        ) : (
                            <div className="pl-20 ml-1">
                                <div
                                    style={{
                                        textAlign: 'center',
                                    }}
                                    className="constructor-element"
                                >
                                    <span
                                        style={{
                                            transform: 'translateY(50%)',
                                        }}
                                        className="constructor-element__text"
                                    >
                                        Выбери начинку
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="pl-20 ml-1">
                            {bun ? (
                                <ConstructorElement
                                    type="bottom"
                                    isLocked
                                    text={bun.name}
                                    price={bun.price}
                                    thumbnail={bun.image}
                                />
                            ) : (
                                <div
                                    style={{
                                        textAlign: 'center',
                                    }}
                                    className="constructor-element constructor-element_pos_bottom"
                                >
                                    <span
                                        style={{
                                            transform: 'translateY(50%)',
                                        }}
                                        className="constructor-element__text"
                                    >
                                        Выбери булку
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <h3 className={burgerConstructorStyles.totalPrice}>
                        {totalPrice}
                        <span style={{ display: 'flex', marginLeft: '10px' }}>
                            <MoneyLogo />
                        </span>
                    </h3>
                    <div className={burgerConstructorStyles.buttonWrapper}>
                        <Button
                            onClick={() =>
                                dispatch({ type: 'ORDER_DETAILS_OPEN' })
                            }
                            htmlType="button"
                            type="primary"
                            size="large"
                        >
                            Оформить заказ
                        </Button>
                    </div>
                </section>
            )) || <Loader />}
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
