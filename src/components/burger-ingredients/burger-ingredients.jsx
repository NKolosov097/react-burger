import { useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import ingredientsStyles from './burger-ingredients.module.css'
import { ingredientPropTypes } from '../../utils/types'
import { IngredientList } from './ingredient-list/ingredient-list'
import { IngredientDetails } from './ingredient-details/ingredient-details'
import { ModalOverlay } from '../modal/modal-overlay/modal-overlay'
import { Modal } from '../modal/modal'

export function BurgerIngredients({ data }) {
    const [current, setCurrent] = useState('Булки')
    const [isOpened, setIsOpened] = useState(false)
    const [infoOfIngredient, setInfoOfIngredient] = useState({})

    const openModal = (
        imageLarge,
        name,
        calories,
        proteins,
        fat,
        carbohydrates
    ) => {
        setInfoOfIngredient({
            imageLarge,
            name,
            calories,
            proteins,
            fat,
            carbohydrates,
        })
        setIsOpened(true)
    }

    const closeModal = () => {
        setIsOpened(false)
    }

    const ingredientLists = [
        {
            title: 'Булки',
            type: 'bun',
        },
        {
            title: 'Соусы',
            type: 'sauce',
        },
        {
            title: 'Начинки',
            type: 'main',
        },
    ]

    return (
        <>
            <section className={ingredientsStyles.burgerIngredients}>
                <div
                    className="mb-10"
                    style={{ width: '100%', display: 'flex' }}
                >
                    {ingredientLists.map(({ title }) => (
                        <Tab
                            key={title}
                            value={title}
                            active={current === title}
                            onClick={setCurrent}
                        >
                            {title}
                        </Tab>
                    ))}
                </div>

                <div
                    className="m-2 custom-scroll"
                    style={{
                        width: '100%',
                        maxHeight: '65vh',
                        overflowY: 'scroll',
                    }}
                >
                    {ingredientLists.map(({ title, type }) => (
                        <IngredientList
                            isOpened={isOpened}
                            key={title}
                            openModal={openModal}
                            closeModal={closeModal}
                            title={title}
                            data={data}
                            type={type}
                        />
                    ))}
                </div>
            </section>

            {isOpened && (
                <>
                    <Modal>
                        <IngredientDetails
                            closeModal={closeModal}
                            infoOfIngredient={infoOfIngredient}
                        />
                    </Modal>
                    <ModalOverlay setIsOpened={setIsOpened} />
                </>
            )}
        </>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
}
