import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { ReactElement } from 'react'
import { IngredientItem } from '../ingredient-item/ingredient-item'
import ingredientsStyles from '../burger-ingredients.module.css'
import { IIngredient } from '../../../utils/types'

type TIngredientList = {
    title: string
    customRef: React.MutableRefObject<HTMLHeadingElement | null> | null
    type: string
}

export function IngredientList({
    title = 'Булки',
    customRef = null,
    type,
}: TIngredientList): ReactElement {
    // @ts-ignore
    const { ingredients } = useSelector((store) => store.ingredientsReducer)
    return (
        <>
            <h2 ref={customRef} className={ingredientsStyles.title}>
                {title}
            </h2>
            <ul className={ingredientsStyles.ingredientsList}>
                {ingredients.map((item: IIngredient) => {
                    const ID = uuid()
                    return (
                        item.type === type && (
                            <IngredientItem key={item._id} ID={ID} {...item} />
                        )
                    )
                })}
            </ul>
        </>
    )
}
