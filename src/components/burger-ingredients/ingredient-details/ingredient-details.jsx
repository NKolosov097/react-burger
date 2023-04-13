import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../../../images/loader'
import detailsStyles from './ingredient-details.module.css'

export function IngredientDetails({ newPage = false }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClose = () => navigate(-1)
    const { id } = useParams()
    const ingredients = useSelector(
        (store) => store.ingredientsReducer.ingredients
    )
    const ingredient = ingredients.find((item) => item._id === id)

    const closeModal = () => {
        dispatch({ type: 'INGREDIENT_DETAILS_CLOSE' })
        handleClose()
    }
    const { image_large, name, calories, proteins, fat, carbohydrates } =
        ingredient || {
            image_large: '',
            name: '',
            calories: '',
            proteins: '',
            fat: '',
            carbohydrates: '',
        }
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
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {ingredient && (
                <div
                    className={
                        newPage
                            ? detailsStyles.container
                            : detailsStyles.containerNewPage
                    }
                >
                    <h1
                        className={
                            newPage
                                ? detailsStyles.title
                                : detailsStyles.titleNewPage
                        }
                    >
                        Детали ингредиента
                        <button
                            className={detailsStyles.closeButton}
                            type="button"
                            onClick={closeModal}
                        >
                            {newPage ? <CloseIcon type="primary" /> : null}
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
                                <p className={detailsStyles.nutritionalPar}>
                                    {value}
                                </p>
                            </li>
                        ))}
                    </u>
                </div>
            )}
        </>
    )
}
