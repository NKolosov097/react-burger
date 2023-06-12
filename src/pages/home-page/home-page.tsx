import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import cn from 'classnames'
import React, { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './home-page.module.css'
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor'

export const HomePage = React.memo(
    (): ReactElement => (
        <main className={styles.main}>
            <AnimatePresence>
                <motion.h1
                    key="burger-constructor"
                    initial={{ y: '-200%' }}
                    animate={{ y: '0', transition: { duration: 0.45 } }}
                    exit={{ y: '+100%', transition: { duration: 0.15 } }}
                    transition={{ type: 'ease-in-out' }}
                    className={cn(
                        'mt-5 mb-5 pl-5 pr-5 text text_type_main-large',
                        styles.mainHeader
                    )}
                >
                    Соберите бургер
                </motion.h1>
            </AnimatePresence>

            <DndProvider backend={HTML5Backend}>
                <AnimatePresence>
                    <motion.section
                        key="burger-constructor"
                        initial={{ x: '-100%' }}
                        animate={{ x: '0', transition: { duration: 0.45 } }}
                        exit={{ x: '+100%', transition: { duration: 0.15 } }}
                        transition={{ type: 'ease-in-out' }}
                        className={styles.ingredientsWrapper}
                    >
                        <BurgerIngredients />
                    </motion.section>
                </AnimatePresence>

                <AnimatePresence>
                    <motion.section
                        key="burger-constructor"
                        initial={{ x: '+100%' }}
                        animate={{ x: '0', transition: { duration: 0.45 } }}
                        exit={{ x: '+100%', transition: { duration: 0.15 } }}
                        transition={{ type: 'ease-in-out' }}
                        className={styles.constructorWrapper}
                    >
                        <BurgerConstructor />
                    </motion.section>
                </AnimatePresence>
            </DndProvider>
        </main>
    )
)
