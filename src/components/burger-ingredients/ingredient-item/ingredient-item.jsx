import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { PriceTitle } from '../../price-title/price-title'
import ingredientItemStyles from './ingredient-item.module.css'

export function IngredientItem({
    openModal,
    image,
    imageLarge,
    price,
    name,
    calories,
    proteins,
    fat,
    carbohydrates,
}) {
    const open = () =>
        openModal(imageLarge, name, calories, proteins, fat, carbohydrates)

    return (
        <li className={ingredientItemStyles.item}>
            <button
                style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#f2f2f3',
                    cursor: 'pointer',
                }}
                type="button"
                onClick={open}
            >
                <Counter count={1} />
                <img className="mb-1" src={image} alt={name} />
                <PriceTitle price={price} />
                <h2 className={ingredientItemStyles.name}>{name}</h2>
            </button>
        </li>
    )
}

IngredientItem.prototype = {
    openModal: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    imageLarge: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
}
