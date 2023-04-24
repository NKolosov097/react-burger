import cn from 'classnames'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import React from 'react'
import { AssemblingBurger } from '../assembling-burger/assembling-burger'
import burgerConstructorStyles from '../burger-constructor.module.css'
import { IIngredient } from '../../../utils/types'

type TIngredientsListProps = {
    ingredients: Array<IIngredient>
    moveIngredients: (dragIndex: number, hoverIndex: number) => void
}

export const IngredientsList = React.memo(
    ({ ingredients, moveIngredients }: TIngredientsListProps) => {
        const dispatch = useDispatch()

        const onDropHandlerMains = (item: IIngredient): void => {
            dispatch({
                type: 'ADD_INGREDIENT_TO_CONSTRUCTOR',
                payload: { ...item },
            })

            dispatch({
                type: 'INCREMENT_INGREDIENT_COUNT',
                payload: { _id: item._id },
            })
        }

        const [, dropMains] = useDrop({
            accept: ['main', 'sauce'],
            drop(item) {
                onDropHandlerMains(item as IIngredient)
            },
        })

        return (
            <div ref={dropMains}>
                {ingredients.length > 0 ? (
                    <ul
                        className={cn(
                            'm-2 custom-scroll',
                            burgerConstructorStyles.list
                        )}
                    >
                        {ingredients.map((item, index) => {
                            const ingredient = item
                            ingredient.ID = uuid()
                            return (
                                item.type !== 'bun' && (
                                    <AssemblingBurger
                                        key={ingredient.ID}
                                        ID={ingredient.ID}
                                        image={ingredient?.image}
                                        price={ingredient?.price}
                                        name={ingredient?.name}
                                        _id={ingredient?._id}
                                        index={index}
                                        moveIngredients={moveIngredients}
                                    />
                                )
                            )
                        })}
                    </ul>
                ) : (
                    <div className="pl-20 ml-1 m-2">
                        <div
                            className={cn(
                                'constructor-element',
                                burgerConstructorStyles.plugWrapper
                            )}
                        >
                            <span
                                className={cn(
                                    'constructor-element__text',
                                    burgerConstructorStyles.plugText
                                )}
                            >
                                Выберите начинку
                            </span>
                        </div>
                    </div>
                )}
            </div>
        )
    }
)