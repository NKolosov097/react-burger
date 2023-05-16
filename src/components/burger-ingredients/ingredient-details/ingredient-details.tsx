import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate, useParams } from 'react-router-dom'
import React, { ReactElement } from 'react'
import { Loader } from '../../../images/loader'
import detailsStyles from './ingredient-details.module.css'
import { IIngredient } from '../../../utils/types'
import { INGREDIENT_DETAILS_CLOSE } from '../../../services/actions/modal-details'
import { useDispatch, useSelector } from '../../../store'

type TIngredientDetails = Pick<
    IIngredient,
    'image_large' | 'name' | 'calories' | 'proteins' | 'fat' | 'carbohydrates'
>

type TNutritionalValue = {
    title: string
    value: number
}

export const IngredientDetails = React.memo(
    ({ newPage = false }: { newPage: boolean }): ReactElement => {
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const { id } = useParams<{ id: string }>()
        const ingredients: Array<IIngredient> = useSelector(
            (store) => store.ingredientsReducer.ingredients
        )
        const ingredient: IIngredient | undefined = ingredients.find(
            (item: IIngredient) => item._id === id
        )

        const closeModal = (): void => {
            dispatch({ type: INGREDIENT_DETAILS_CLOSE })
            navigate(-1)
        }

        const {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            image_large,
            name,
            calories,
            proteins,
            fat,
            carbohydrates,
        }: TIngredientDetails = ingredient || {
            image_large: '',
            name: '',
            calories: 0,
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
        }

        const nutritionalValue: Array<TNutritionalValue> = [
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
                                    <h3
                                        className={
                                            detailsStyles.nutritionalTitle
                                        }
                                    >
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
)
