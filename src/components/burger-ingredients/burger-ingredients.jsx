import { useState, useRef, useEffect, useCallback } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import cn from 'classnames'
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

    const bottomTabsRef = useRef()
    const topBunsRef = useRef()
    const topSaucesRef = useRef()
    const topMainsRef = useRef()

    const toIngredientList = useCallback(
        () =>
            // const calculationDifferences = (ref) => {
            //     Math.abs(
            //         bottomTabsRef.current.getBoundingClientRect().bottom -
            //             ref.current.getBoundingClientRect().top
            //     )
            // }

            // if (calculationDifferences(topBunsRef) < 105) setCurrent('Булки')
            // else if (calculationDifferences(topSaucesRef) < 105) setCurrent('Соусы')
            // else if (calculationDifferences(topMainsRef) < 105)
            //     setCurrent('Начинки')

            null,
        []
    )

    useEffect(() => {
        toIngredientList()
    }, [toIngredientList])

    const onClickTab = (title, ref) => {
        setCurrent(title)
        ref.current.scrollIntoView({
            behavior: 'smooth',
        })
    }

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
            ref: topBunsRef,
        },
        {
            title: 'Соусы',
            type: 'sauce',
            ref: topSaucesRef,
        },
        {
            title: 'Начинки',
            type: 'main',
            ref: topMainsRef,
        },
    ]

    return (
        <>
            <section className={ingredientsStyles.burgerIngredients}>
                <div
                    className="mb-10"
                    style={{ width: '100%', display: 'flex' }}
                    ref={bottomTabsRef}
                >
                    {ingredientLists.map(({ title, ref }) => (
                        <Tab
                            key={title}
                            value={title}
                            active={current === title}
                            onClick={() => onClickTab(title, ref)}
                        >
                            {title}
                        </Tab>
                    ))}
                </div>

                <div
                    className={cn(
                        'm-2 custom-scroll',
                        ingredientsStyles.listWrapper
                    )}
                    onScroll={() => toIngredientList()}
                >
                    {ingredientLists.map(({ title, type, ref }) => (
                        <IngredientList
                            customRef={ref}
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
