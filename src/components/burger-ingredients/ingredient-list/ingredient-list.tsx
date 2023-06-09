import { v4 as uuid } from 'uuid'
import { ReactElement } from 'react'
import { IngredientItem } from '../ingredient-item/ingredient-item'
import ingredientsStyles from '../burger-ingredients.module.css'
import { IIngredient } from '../../../utils/types'
import { useSelector } from '../../../store'
import { EmptyIngredientItem } from '../ingredient-item/empty-ingredient-item'

type TIngredientList = {
    title: string
    customRef: React.MutableRefObject<HTMLHeadingElement | null> | null
    type: string
}

const emptyIngredients: Array<{ type: string }> = [
    {
        type: 'bun',
    },
    {
        type: 'bun',
    },
    {
        type: 'sauce',
    },
    {
        type: 'sauce',
    },
    {
        type: 'sauce',
    },
    {
        type: 'sauce',
    },
    {
        type: 'main',
    },
    {
        type: 'main',
    },
    {
        type: 'main',
    },
    {
        type: 'main',
    },
    {
        type: 'main',
    },
    {
        type: 'main',
    },
    {
        type: 'main',
    },
    {
        type: 'main',
    },
    {
        type: 'main',
    },
]

export function IngredientList({
    title = 'Булки',
    customRef = null,
    type,
}: TIngredientList): ReactElement {
    const { ingredients } = useSelector((store) => store.ingredientsReducer)
    return (
        <>
            <h2 ref={customRef} className={ingredientsStyles.title}>
                {title}
            </h2>
            <ul
                className={ingredientsStyles.ingredientsList}
                data-test={`ingredient-list-${type}`}
            >
                {ingredients.length > 0
                    ? ingredients.map((item: IIngredient) => {
                          const ID = uuid()
                          return (
                              item.type === type && (
                                  <IngredientItem
                                      key={item._id}
                                      ID={ID}
                                      {...item}
                                  />
                              )
                          )
                      })
                    : emptyIngredients.map((item: { type: string }) => {
                          const ID = uuid()
                          return (
                              item.type === type && (
                                  <EmptyIngredientItem key={ID} />
                              )
                          )
                      })}
            </ul>
        </>
    )
}
