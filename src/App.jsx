import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { HomePage } from './pages/home-page/home-page'
import { Login } from './pages/login/login'
import { Register } from './pages/register/register'
import { ForgotPassword } from './pages/forgot-password/forgot-password'
import { ResetPassword } from './pages/forgot-password/reset-password/reset-password'
import { Profile } from './pages/profile/profile'
import { Orders } from './pages/profile/orders/orders'
import { checkUserAuth } from './services/actions/auth-action'
import {
    OnlyAuth,
    OnlyUnAuth,
} from './components/protected-route/protected-route'
import { IngredientDetails } from './components/burger-ingredients/ingredient-details/ingredient-details'
import { Modal } from './components/modal/modal.tsx'
import { getBurgerIngredients } from './services/actions/ingredients-action'
import { AppHeader } from './components/app-header/app-header.tsx'
import { paths } from './utils/routes/routes.ts'

export const App = React.memo(() => {
    const dispatch = useDispatch()
    const location = useLocation()

    // const state = location.state as { background?:  }

    const background = location.state && location.state.background

    useEffect(() => {
        dispatch(getBurgerIngredients())
        dispatch(checkUserAuth())
    }, [dispatch])

    return (
        <>
            <AppHeader />
            <Routes location={background || location}>
                <Route path={paths.homePage} element={<HomePage />} />
                <Route
                    path={paths.ingredientDetails}
                    element={<IngredientDetails />}
                />
                <Route
                    path={paths.login}
                    element={<OnlyUnAuth component={<Login />} />}
                />
                <Route
                    path={paths.register}
                    element={<OnlyUnAuth component={<Register />} />}
                />
                <Route
                    path={paths.forgotPassword}
                    element={<OnlyUnAuth component={<ForgotPassword />} />}
                />
                <Route
                    path={paths.resetPassword}
                    element={<OnlyUnAuth component={<ResetPassword />} />}
                />
                <Route
                    path={paths.profile}
                    element={<OnlyAuth component={<Profile />} />}
                />
                <Route
                    path={paths.orders}
                    element={<OnlyAuth component={<Orders />} />}
                />
                <Route path="*" element={<HomePage />} />
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path={paths.ingredientDetails}
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
})
