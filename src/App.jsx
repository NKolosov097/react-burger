import { useEffect } from 'react'
import {
    Routes,
    Route,
    useLocation,
    // useResolvedPath,
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { HomePage } from './pages/home-page/home-page'
import { Login } from './pages/login/login'
import { Register } from './pages/register/register'
import { ForgotPassword } from './pages/forgot-password/forgot-password'
import { ResetPassword } from './pages/forgot-password/reset-password/reset-password'
import { Profile } from './pages/profile/profile'
import { Orders } from './pages/profile/orders/orders'
import AppHeader from './components/app-header/app-header'
import { checkUserAuth } from './services/actions/auth-action'
import {
    OnlyAuth,
    OnlyUnAuth,
} from './components/protected-route/protected-route'
import { IngredientDetails } from './components/burger-ingredients/ingredient-details/ingredient-details'
import { Modal } from './components/modal/modal'
import { getBurgerIngredients } from './services/actions/ingredients-action'

export function App() {
    const dispatch = useDispatch()
    const location = useLocation()

    const background = location.state && location.state.background

    useEffect(() => {
        dispatch(getBurgerIngredients())
        dispatch(checkUserAuth())
    }, [])

    return (
        <>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/ingredients/:id"
                    element={<IngredientDetails />}
                />
                <Route
                    path="/login"
                    element={<OnlyUnAuth component={<Login />} />}
                />
                <Route
                    path="/register"
                    element={<OnlyUnAuth component={<Register />} />}
                />
                <Route
                    path="/forgot-password"
                    element={<OnlyUnAuth component={<ForgotPassword />} />}
                />
                <Route
                    path="/reset-password"
                    element={<OnlyUnAuth component={<ResetPassword />} />}
                />
                <Route
                    path="/profile"
                    element={<OnlyAuth component={<Profile />} />}
                />
                <Route
                    path="/profile/orders"
                    element={<OnlyAuth component={<Orders />} />}
                />
                <Route path="*" element={<HomePage />} />
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={
                            <Modal>
                                <IngredientDetails newPage />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    )
}

// как идет составление маршрутов в react router
// сделать хук, который будет проверять авторизацию пользователя
// redux thunk. в мидлварах организовать логику авторизацию и регистрации

// переключения языка по шаблону
