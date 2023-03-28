import './App.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import AppHeader from './components/app-header/app-header'
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients'
import { BurgerConstructor } from './components/burger-constructor/burger-constructor'

export function App() {
    return (
        <>
            <AppHeader />
            <main className="App">
                <h1 className="mt-5 mb-5 pl-5 pr-5 text text_type_main-large AppHeader">
                    Соберите бургер
                </h1>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </main>
        </>
    )
}
