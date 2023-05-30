import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import stylesIngredient from './ingredient.module.css'

type TIngredientProps = {
    image: string
    price: number
    name: string
    count?: number
}

export function Ingredient({
    image,
    price,
    name,
    count = 1,
}: TIngredientProps) {
    return (
        <li className={stylesIngredient.ingredientEl}>
            <div className={stylesIngredient.imageAmdName}>
                <span className={stylesIngredient.ingredientImage}>
                    <img src={image} alt={name} width={110} />
                </span>
                <span className={stylesIngredient.name}>{name}</span>
            </div>
            <span className={stylesIngredient.price}>
                <span className={stylesIngredient.priceTitle}>
                    {count} x {price}
                </span>
                <CurrencyIcon type="primary" />
            </span>
        </li>
    )
}
