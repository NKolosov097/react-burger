import React, { ReactElement, useEffect } from 'react'
import * as H from 'history'
// @ts-ignore
import { Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './pages/home-page/home-page'
import { Login } from './pages/login/login'
import { Register } from './pages/register/register'
import { ForgotPassword } from './pages/forgot-password/forgot-password'
import { ResetPassword } from './pages/forgot-password/reset-password/reset-password'
import { Profile } from './pages/profile/profile'
import {
    OnlyAuth,
    OnlyUnAuth,
} from './components/protected-route/protected-route'
import { IngredientDetails } from './components/burger-ingredients/ingredient-details/ingredient-details'
import { Modal } from './components/modal/modal'
import { AppHeader } from './components/app-header/app-header'
import { paths } from './utils/routes/routes'
import { useDispatch } from './store'
import { Feed } from './pages/feed/feed'
import { Orders } from './pages/profile/orders/orders'
import { OrderInfo } from './components/order/order-info/order-info'
import { checkUserAuth } from './services/actions/auth-action/auth-thunk'
import { getBurgerIngredients } from './services/actions/ingredients-action/ingredients-thunk'

export const App = React.memo((): ReactElement => {
    const dispatch = useDispatch()
    const location = useLocation()

    const state = location.state as { background?: H.Location }

    const background = state && state.background

    useEffect(() => {
        getBurgerIngredients()(dispatch)
        checkUserAuth()(dispatch)

        return () => localStorage.removeItem('accessToken')
    }, [dispatch])

    return (
        <>
            <AppHeader />
            <Routes location={background || location}>
                <Route path={paths.homePage} element={<HomePage />} />
                <Route
                    path={paths.ingredientDetails}
                    element={<IngredientDetails newPage={false} />}
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
                <Route path={paths.feed} element={<Feed />} />
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

            {background && (
                <Routes>
                    <Route
                        path={`${paths.feed}${paths.orderDetails}`}
                        element={
                            <Modal>
                                <OrderInfo />
                            </Modal>
                        }
                    />
                </Routes>
            )}

            {background && (
                <Routes>
                    <Route
                        path={`${paths.orders}${paths.orderDetails}`}
                        element={
                            <OnlyAuth
                                component={
                                    <Modal>
                                        <OrderInfo />
                                    </Modal>
                                }
                            />
                        }
                    />
                </Routes>
            )}
        </>
    )
})
