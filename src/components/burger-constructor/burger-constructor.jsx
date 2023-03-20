import { useEffect, useState } from 'react'
import {
    Button,
    ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components'
// import PropTypes from 'prop-types'
import cn from 'classnames'
// import { ingredientPropTypes } from '../../utils/types'
// import { AssemblingBurger } from './assembling-burger/assembling-burger'
import burgerConstructorStyles from './burger-constructor.module.css'
import { OrderDetails } from './order-details/order-details'
import { ModalOverlay } from '../modal/modal-overlay/modal-overlay'
import { MoneyLogo } from '../../images/money'
import { Modal } from '../modal/modal'
import { Loader } from '../../images/loader'

export function BurgerConstructor({ data }) {
    const [totalPrice, setTotalPrice] = useState(0)
    const [isOpened, setIsOpened] = useState(false)
    useEffect(() => {
        setTotalPrice(610)
    }, [])

    return (
        <>
            {(data.length > 0 && (
                <section className={burgerConstructorStyles.wrapper}>
                    <div className={burgerConstructorStyles.container}>
                        <div className="pl-20 ml-1">
                            <ConstructorElement
                                type="top"
                                isLocked
                                text="Выберите булки"
                                // text="Краторная булка N-200i (верх)"
                                // price={200}
                                // thumbnail={data[0]?.image}
                            />
                        </div>
                        <ul
                            className={cn(
                                'm-2 custom-scroll',
                                burgerConstructorStyles.list
                            )}
                        >
                            {/* {data.map(
                                (item) =>
                                    item.type !== 'bun' && (
                                        <AssemblingBurger
                                            key={item._id}
                                            image={item.image}
                                            price={item.price}
                                            name={item.name}
                                        />
                                    )
                            )} */}
                        </ul>
                        <div className="pl-20 ml-1">
                            <ConstructorElement
                                type="bottom"
                                isLocked
                                text="Выберите булки"
                                // text="Краторная булка N-200i (низ)"
                                // price={200}
                                // thumbnail={data[0]?.image}
                            />
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
                            onClick={() => setIsOpened(true)}
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
                        <OrderDetails closeModal={() => setIsOpened(false)} />
                    </Modal>
                    <ModalOverlay setIsOpened={setIsOpened} />
                </>
            )}
        </>
    )
}

// BurgerConstructor.propTypes = {
//     data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
// }
