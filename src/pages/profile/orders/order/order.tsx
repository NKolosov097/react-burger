import { ReactElement } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import orderStyles from './order.module.css'
import { IIngredient, TOrder } from '../../../../utils/types'
import { useSelector } from '../../../../store'
import { Ingredient } from './ingredient'

type OrderProps = {
    order: TOrder
}

export function Order({ order }: OrderProps): ReactElement {
    const { ingredients } = useSelector((store) => store.ingredientsReducer)
    // let totalPrice: number = 0

    return (
        <div className={orderStyles.container}>
            <div className={orderStyles.ID}>
                <h2 className={orderStyles.numberOfOrder}>#{order.number}</h2>
                <h2 className={orderStyles.createdAt}>{order.createdAt}</h2>
            </div>
            <h1 className={orderStyles.burgerName}>{order.name}</h1>
            <h3 className={orderStyles.status}>
                {order.status === 'done' ? 'Создан' : 'Готовится'}
            </h3>
            <div className={orderStyles.ingredientsContainer}>
                <ul className={orderStyles.ingredients}>
                    {order.ingredients.map((ingredient) => {
                        // @ts-ignore
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        const { image } = ingredients.find(
                            (item: IIngredient) => item._id === ingredient
                        )
                        return <Ingredient image={image} />
                    })}
                </ul>
                <h4 className={orderStyles.price}>
                    <span>480</span>
                    <CurrencyIcon type="primary" />
                </h4>
            </div>
        </div>
    )
}
// const ingredient: IIngredient | undefined = ingredients.find(
//     (item: IIngredient) => item._id === id
// )
