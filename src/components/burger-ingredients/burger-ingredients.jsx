import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import ingredientsStyles from './burger-ingredients.module.css'
import { ingredientPropTypes } from '../../utils/types'
import { IngredientList } from './ingredient-list/ingredient-list'

export default function BurgerIngredients({ data }) {
    const [current, setCurrent] = React.useState('Булки')
    return (
        <section className={ingredientsStyles.burgerIngredients}>
            <div className="mb-10" style={{ width: '100%', display: 'flex' }}>
                <Tab
                    value="Булки"
                    active={current === 'Булки'}
                    onClick={setCurrent}
                >
                    Булки
                </Tab>
                <Tab
                    value="Соусы"
                    active={current === 'Соусы'}
                    onClick={setCurrent}
                >
                    Соусы
                </Tab>
                <Tab
                    value="Начинки"
                    active={current === 'Начинки'}
                    onClick={setCurrent}
                >
                    Начинки
                </Tab>
            </div>

            <div
                className="m-2 custom-scroll"
                style={{
                    width: '100%',
                    maxHeight: '70vh',
                    overflowY: 'scroll',
                }}
            >
                <IngredientList title="Булки" data={data} type="bun" />
                <IngredientList title="Соусы" data={data} type="sauce" />
                <IngredientList title="Начинки" data={data} type="main" />
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
}
