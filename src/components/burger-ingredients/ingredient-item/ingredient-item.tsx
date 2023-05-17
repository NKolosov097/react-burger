import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd/dist/hooks'
import cn from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { ReactElement } from 'react'
import { PriceTitle } from '../../price-title/price-title'
import ingredientItemStyles from './ingredient-item.module.css'
import { IIngredient } from '../../../utils/types'
import { INGREDIENT_DETAILS_OPEN } from '../../../services/actions/modal-details'
import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    UPDATE_BUN_IN_CONSTRUCTOR,
} from '../../../services/actions/burger-constructor-action'
import {
    INCREMENT_INGREDIENT_COUNT,
    UPDATE_BUN_COUNT,
} from '../../../services/actions/ingredients-action/ingredients-action'
import { useDispatch } from '../../../store'

export function IngredientItem(props: IIngredient): ReactElement {
    const dispatch = useDispatch()
    const location = useLocation()

    const item: IIngredient = {
        image: props?.image,
        type: props?.type,
        _id: props?._id,
        ID: props?.ID,
        image_large: props?.image_large,
        price: props?.price,
        name: props?.name,
        count: props?.count,
        calories: props?.calories,
        proteins: props?.proteins,
        fat: props?.fat,
        carbohydrates: props?.carbohydrates,
    }

    const [{ isDrag }, dragRef] = useDrag({
        type: item.type,
        item,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    })

    const open = (typeOfIngredient: string) => {
        dispatch({
            type: INGREDIENT_DETAILS_OPEN,
            payload: item,
        })
        if (typeOfIngredient === 'bun') {
            dispatch({
                type: UPDATE_BUN_IN_CONSTRUCTOR,
                payload: item,
                isBun: true,
            })
            dispatch({
                type: UPDATE_BUN_COUNT,
                idForCount: { _id: item._id },
            })
        } else {
            dispatch({
                type: ADD_INGREDIENT_TO_CONSTRUCTOR,
                payload: { type: 'ingredient', ingredient: item },
            })
            dispatch({
                type: INCREMENT_INGREDIENT_COUNT,
                idForCount: { _id: item._id },
            })
        }
    }
    return (
        <li
            ref={dragRef}
            className={cn(
                isDrag ? ingredientItemStyles.itemIsDragging : '',
                ingredientItemStyles.item
            )}
        >
            <Link
                to={{
                    pathname: `/ingredients/${item._id}`,
                }}
                state={{ background: location }}
            >
                <button
                    className={ingredientItemStyles.button}
                    type="button"
                    onClick={() => open(item.type)}
                >
                    {item.count ? <Counter count={item.count} /> : null}
                    <img className="mb-1" src={item.image} alt={item.name} />
                    <PriceTitle price={item.price} />
                    <h2 className={ingredientItemStyles.name}>{item.name}</h2>
                </button>
            </Link>
        </li>
    )
}
