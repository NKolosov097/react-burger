import { useState, useRef, useEffect, useCallback } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import ingredientsStyles from './burger-ingredients.module.css'
import { IngredientList } from './ingredient-list/ingredient-list'
import { IngredientDetails } from './ingredient-details/ingredient-details'
import { ModalOverlay } from '../modal/modal-overlay/modal-overlay'
import { Modal } from '../modal/modal'
import { getBurgerIngredients } from '../../services/actions/ingredients-action'

export function BurgerIngredients() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBurgerIngredients())
    }, [dispatch])

    const isOpened = useSelector(
        (state) => state.modalDetailsReducer.isOpenedIngredientsDetails
    )

    const [current, setCurrent] = useState('Булки')

    const bottomTabsRef = useRef()
    const topBunsRef = useRef()
    const topSaucesRef = useRef()
    const topMainsRef = useRef()

    const toIngredientList = useCallback(() => {
        const calculationDifferences = (ref) =>
            Math.abs(
                bottomTabsRef.current.getBoundingClientRect().bottom -
                    ref.current.getBoundingClientRect().top
            )

        if (calculationDifferences(topBunsRef) < 105) setCurrent('Булки')
        else if (calculationDifferences(topSaucesRef) < 105) setCurrent('Соусы')
        else if (calculationDifferences(topMainsRef) < 105)
            setCurrent('Начинки')
    }, [])

    useEffect(() => {
        toIngredientList()
    }, [toIngredientList])

    const onClickTab = (title, ref) => {
        setCurrent(title)
        ref.current.scrollIntoView({
            behavior: 'smooth',
        })
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
                    className={cn('mb-10', ingredientsStyles.tabs)}
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
                            key={title}
                            title={title}
                            type={type}
                        />
                    ))}
                </div>
            </section>

            {isOpened && (
                <>
                    <Modal>
                        <IngredientDetails />
                    </Modal>
                    <ModalOverlay />
                </>
            )}
        </>
    )
}
