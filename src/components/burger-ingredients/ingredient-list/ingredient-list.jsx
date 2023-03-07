import { IngredientItem } from '../ingredient-item/ingredient-item'
import ingredientsStyles from '../burger-ingredients.module.css'

export function IngredientList({ title = 'Булки', data, type }) {
    return (
        <>
            <h2 className="mt-2" style={{ width: '100%', display: 'flex' }}>
                {title}
            </h2>
            <ul className={ingredientsStyles.ingredientsList}>
                {data.map(
                    (item) =>
                        item.type === type && (
                            <IngredientItem
                                key={item._id}
                                type={item.type}
                                image={item.image}
                                image-mobile={item.image_mobile}
                                price={item.price}
                                name={item.name}
                            />
                        )
                )}
            </ul>
        </>
    )
}
