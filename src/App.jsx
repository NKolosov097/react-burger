import { useState, useEffect } from 'react'
import './App.css'
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'

const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients'

export function App() {
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(URL_INGREDIENTS)
                const incomingData = await res.json()
                setData([...incomingData.data])
            } catch (e) {
                throw new Error('Ой-ой, что-то пошло не так... Ошибка: ', e)
            }
        }

        getData()
    }, [])

    console.log(data)

    return (
        <>
            <AppHeader />
            <main className="App">
                <h1
                    style={{ width: '100%' }}
                    className="mt-5 mb-5 pl-5 pr-5 text text_type_main-large"
                >
                    Соберите бургер
                </h1>
                <BurgerIngredients data={data} />
            </main>
        </>
    )
}
