import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './App.css'
import AppHeader from './components/app-header/app-header'
import { getBurgerIngredients } from './services/actions/ingredients-action'
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients'
import { BurgerConstructor } from './components/burger-constructor/burger-constructor'

export function App() {
    const dispatch = useDispatch()
    const { ingredients } = useSelector((store) => store.ingredientsReducer)

    useEffect(() => {
        dispatch(getBurgerIngredients())
    }, [dispatch])

    return (
        <>
            <AppHeader />
            <main className="App">
                <h1
                    style={{
                        width: '100%',
                        fontFamily: 'JetBrains Mono',
                        fontWeight: 700,
                        letterSpacing: 2,
                    }}
                    className="mt-5 mb-5 pl-5 pr-5 text text_type_main-large"
                >
                    Соберите бургер
                </h1>
                <BurgerIngredients data={ingredients} />
                <BurgerConstructor data={ingredients} />
            </main>
        </>
    )
}
