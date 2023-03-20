import PropTypes from 'prop-types'
import { IngredientItem } from '../ingredient-item/ingredient-item'
import ingredientsStyles from '../burger-ingredients.module.css'
import { ingredientPropTypes } from '../../../utils/types'

export function IngredientList({
    title = 'Булки',
    customRef,
    data,
    type,
    isOpened,
    openModal,
    closeModal,
}) {
    return (
        <>
            <h2 ref={customRef} className={ingredientsStyles.title}>
                {title}
            </h2>
            <ul className={ingredientsStyles.ingredientsList}>
                {data.map(
                    (item) =>
                        item.type === type && (
                            <IngredientItem
                                isOpened={isOpened}
                                openModal={openModal}
                                closeModal={closeModal}
                                key={item._id}
                                type={item.type}
                                image={item.image}
                                imageLarge={item.image_large}
                                image-mobile={item.image_mobile}
                                price={item.price}
                                name={item.name}
                                calories={item.calories}
                                proteins={item.proteins}
                                fat={item.fat}
                                carbohydrates={item.carbohydrates}
                            />
                        )
                )}
            </ul>
        </>
    )
}

IngredientList.prototype = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    type: PropTypes.string.isRequired,
    isOpened: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
}
