import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd/dist/hooks'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { PriceTitle } from '../../price-title/price-title'
import ingredientItemStyles from './ingredient-item.module.css'

export function IngredientItem({
    image,
    type,
    // eslint-disable-next-line
    image_large,
    price,
    name,
    count,
    calories,
    proteins,
    fat,
    carbohydrates,
}) {
    const ID = uuid()
    const [{ isDrag }, dragRef] = useDrag({
        type,
        ID,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    })
    const dispatch = useDispatch()
    const open = (typeOfIngredient) => {
        dispatch({
            type: 'INGREDIENT_DETAILS_OPEN',
            payload: {
                // eslint-disable-next-line
                image_large,
                name,
                calories,
                proteins,
                fat,
                carbohydrates,
            },
        })
        // eslint-disable-next-line
        typeOfIngredient === 'bun'
            ? dispatch({
                  type: 'UPDATE_BUN_IN_CONSTRUCTOR',
                  payload: { ID, image, type, name, price },
                  isBun: true,
              })
            : dispatch({
                  type: 'ADD_INGREDIENT_TO_CONSTRUCTOR',
                  payload: {
                      ID,
                      image,
                      type,
                      name,
                      price,
                  },
              })
    }
    return (
        !isDrag && (
            <li ref={dragRef} className={ingredientItemStyles.item}>
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
    )
}

IngredientItem.prototype = {
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
}
