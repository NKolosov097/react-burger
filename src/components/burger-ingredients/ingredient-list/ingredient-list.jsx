import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { IngredientItem } from '../ingredient-item/ingredient-item'
import ingredientsStyles from '../burger-ingredients.module.css'

export function IngredientList({ title = 'Булки', customRef = null, type }) {
    const { ingredients } = useSelector((store) => store.ingredientsReducer)
    return (
        <>
            <h2 ref={customRef} className={ingredientsStyles.title}>
                {title}
            </h2>
            <ul className={ingredientsStyles.ingredientsList}>
                {ingredients.map(
                    (item) =>
                        item.type === type && (
                            <IngredientItem key={item._id} {...item} />
                        )
                )}
            </ul>
        </>
    )
}

IngredientList.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    customRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
}
