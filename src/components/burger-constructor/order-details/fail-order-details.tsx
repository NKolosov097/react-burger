import { Link } from 'react-router-dom'
import React, { ReactElement } from 'react'
import detailsStyles from './order-details.module.css'

export const FailOrderDetails = React.memo(
    (): ReactElement => (
        <div className={detailsStyles.failOrderContainer}>
            <h1 className={detailsStyles.header}>
                Необходимо авторизоваться, чтобы сделать заказ
            </h1>
            <h2 className={detailsStyles.header}>
                (не переживайте, Ваш заказ останется)
            </h2>
            <Link className={detailsStyles.toLogin} to="/login">
                Перейти на страницу авторизации
            </Link>
        </div>
    )
)
