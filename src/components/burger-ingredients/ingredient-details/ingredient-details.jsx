import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { Loader } from '../../../images/loader'
import detailsStyles from './ingredient-details.module.css'

export function IngredientDetails({ closeModal, infoOfIngredient }) {
    const { imageLarge, name, calories, proteins, fat, carbohydrates } =
        infoOfIngredient
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
                    src={imageLarge}
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

IngredientDetails.propTypes = {
    closeModal: PropTypes.func.isRequired,
    infoOfIngredient: PropTypes.shape({
        imageLarge: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
    }).isRequired,
}
