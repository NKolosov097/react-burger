import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import cn from 'classnames'
import React, { ReactElement } from 'react'
import styles from './home-page.module.css'
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor'
// import { useSelector } from '../../store'
// import { AnimatedLoading } from '../../components/animated-loading/animated-loading'

export const HomePage = React.memo(
    (): ReactElement => (
        // const { isLoading } = useSelector((store) => store.ingredientsReducer)
        <main className={styles.main}>
            <h1
                className={cn(
                    'mt-5 mb-5 pl-5 pr-5 text text_type_main-large',
                    styles.mainHeader
                )}
            >
                Соберите бургер
            </h1>

            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </main>
    )
)
