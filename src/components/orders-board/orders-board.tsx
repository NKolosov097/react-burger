import { ReactElement } from 'react'
import stylesOrdersBoard from './orders-board.module.css'
import { IFeed } from '../../utils/types'

type TOrdersBoardProps = {
    doneOrders: Array<IFeed>
    pendingOrders: Array<IFeed>
    total: number
    totalToday: number
}

export function OrdersBoard({
    doneOrders,
    pendingOrders,
    total,
    totalToday,
}: TOrdersBoardProps): ReactElement {
    return (
        <div className={stylesOrdersBoard.ordersBoardContainer}>
            <div className={stylesOrdersBoard.currentOrders}>
                <div className={stylesOrdersBoard.doneOrdersContainer}>
                    <h3 className={stylesOrdersBoard.doneOrdersHeader}>
                        Готовы:
                    </h3>
                    <ul className={stylesOrdersBoard.doneOrdersList}>
                        {doneOrders.map((numberOfOrder) => (
                            <li
                                key={numberOfOrder._id}
                                className={stylesOrdersBoard.doneOrderNumber}
                            >
                                {numberOfOrder.number}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={stylesOrdersBoard.inProcessOrdersContainer}>
                    <h3 className={stylesOrdersBoard.inProcessOrdersHeader}>
                        В процессе:
                    </h3>
                    <ul className={stylesOrdersBoard.inProcessOrdersList}>
                        {pendingOrders.length > 0 ? (
                            pendingOrders.map((numberOfOrder) => (
                                <li
                                    key={numberOfOrder._id}
                                    className={
                                        stylesOrdersBoard.pendingOrderNumber
                                    }
                                >
                                    {numberOfOrder.number}
                                </li>
                            ))
                        ) : (
                            <span
                                className={stylesOrdersBoard.pendingOrderNumber}
                            >
                                Мы успели приготовить все заказы!
                            </span>
                        )}
                    </ul>
                </div>
            </div>

            <div className={stylesOrdersBoard.doneForTheAllTimeContainer}>
                <h3 className={stylesOrdersBoard.doneForTheAllTimeHeader}>
                    Выполнено за все время:
                </h3>
                <h3 className={stylesOrdersBoard.doneForTheAllTimeNumber}>
                    {total || 0}
                </h3>
            </div>

            <div className={stylesOrdersBoard.doneTodayContainer}>
                <h3 className={stylesOrdersBoard.doneTodayHeader}>
                    Выполнено за сегодня:
                </h3>
                <h3 className={stylesOrdersBoard.doneTodayNumber}>
                    {totalToday || 0}
                </h3>
            </div>
        </div>
    )
}
