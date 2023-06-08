import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    ReactElement,
} from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import ingredientsStyles from './burger-ingredients.module.css'
import { IngredientList } from './ingredient-list/ingredient-list'

type TIngredientLists = {
    title: string
    type: string
    ref: React.MutableRefObject<HTMLHeadingElement | null>
}

export function BurgerIngredients(): ReactElement {
    const [current, setCurrent] = useState<string>('Булки')

    const bottomTabsRef = useRef<HTMLHeadingElement>(null)
    const topBunsRef = useRef<HTMLHeadingElement>(null)
    const topSaucesRef = useRef<HTMLHeadingElement>(null)
    const topMainsRef = useRef<HTMLHeadingElement>(null)

    const toIngredientList = useCallback(() => {
        const calculationDifferences = (
            ref: React.RefObject<HTMLHeadingElement>
        ): number => {
            if (bottomTabsRef.current && ref.current)
                return Math.abs(
                    bottomTabsRef.current.getBoundingClientRect().bottom -
                        ref.current.getBoundingClientRect().top
                )
            return 0
        }

        if (calculationDifferences(topBunsRef) < 105) setCurrent('Булки')
        else if (calculationDifferences(topSaucesRef) < 105) setCurrent('Соусы')
        else if (calculationDifferences(topMainsRef) < 105)
            setCurrent('Начинки')
    }, [])

    useEffect(() => {
        toIngredientList()
    }, [toIngredientList])

    const onClickTab = (
        title: string,
        ref: React.RefObject<HTMLHeadingElement>
    ): void => {
        setCurrent(title)
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }

    const ingredientLists: Array<TIngredientLists> = [
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
        <section className={ingredientsStyles.burgerIngredients}>
            <div
                className={cn('mb-5', ingredientsStyles.tabs)}
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
    )
}
