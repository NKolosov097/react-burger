import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd/dist/hooks'
import { useDispatch } from 'react-redux'
import cn from 'classnames'
import { PriceTitle } from '../../price-title/price-title'
import ingredientItemStyles from './ingredient-item.module.css'

export function IngredientItem({
    image,
    type,
    _id,
    ID,
    image_large,
    price,
    name,
    count,
    calories,
    proteins,
    fat,
    carbohydrates,
}) {
    const dispatch = useDispatch()
    const [{ isDrag }, dragRef] = useDrag({
        type,
        item: { _id, ID, image, type, name, price },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    })

    const item = {
        image,
        type,
        _id,
        ID,
        image_large,
        price,
        name,
        count,
        calories,
        proteins,
        fat,
        carbohydrates,
    }
    const open = (typeOfIngredient) => {
        dispatch({
            type: 'INGREDIENT_DETAILS_OPEN',
            payload: item,
        })
        if (typeOfIngredient === 'bun') {
            dispatch({
                type: 'UPDATE_BUN_IN_CONSTRUCTOR',
                payload: item,
                isBun: true,
            })
            dispatch({
                type: 'UPDATE_BUN_COUNT',
                payload: { _id },
            })
        } else {
            dispatch({
                type: 'ADD_INGREDIENT_TO_CONSTRUCTOR',
                payload: item,
            })
            dispatch({
                type: 'INCREMENT_INGREDIENT_COUNT',
                payload: { _id },
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
            <button
                className={ingredientItemStyles.button}
                type="button"
                onClick={() => open(type)}
            >
                {count ? <Counter count={count} /> : null}
                <img className="mb-1" src={image} alt={name} />
                <PriceTitle price={price} />
                <h2 className={ingredientItemStyles.name}>{name}</h2>
            </button>
        </li>
    )
}

IngredientItem.propTypes = {
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
}
