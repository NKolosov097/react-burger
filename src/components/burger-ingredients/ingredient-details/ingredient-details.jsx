import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../../images/loader'
import detailsStyles from './ingredient-details.module.css'

export function IngredientDetails() {
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch({ type: 'INGREDIENT_DETAILS_CLOSE' })
    }
    const { image_large, name, calories, proteins, fat, carbohydrates } =
        useSelector((store) => store.modalDetailsReducer.infoOfIngredient)
    const nutritionalValue = [
        {
            title: 'Калории, ккал',
            value: calories,
        },
        {
            title: 'Белки, г',
            value: proteins,
        },
        {
            title: 'Жиры, г',
            value: fat,
        },
        {
            title: 'Углеводы, г',
            value: carbohydrates,
        },
    ]
    return (
        <div className={detailsStyles.container}>
            <h1 className={detailsStyles.title}>
                Детали ингредиента
                <button
                    className={detailsStyles.closeButton}
                    type="button"
                    onClick={closeModal}
                >
                    <CloseIcon type="primary" />
                </button>
            </h1>

            {(
                <img
                    className={detailsStyles.image}
                    src={image_large}
                    alt={name}
                />
            ) || <Loader />}
            <h2 className={detailsStyles.name}>{name}</h2>
            <u className={detailsStyles.list}>
                {nutritionalValue.map(({ title, value }) => (
                    <li key={title} className={detailsStyles.elem}>
                        <h3 className={detailsStyles.nutritionalTitle}>
                            {title}
                        </h3>
                        <p className={detailsStyles.nutritionalPar}>{value}</p>
                    </li>
                ))}
            </u>
        </div>
    )
}
