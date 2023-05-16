import { ReactElement } from 'react'
import stylesOverlay from '../order.module.css'

type TOverlayProps = {
    children: ReactElement
    countOfIngredients: number
    ordersPage: boolean
}

export function Overlay({
    children,
    countOfIngredients,
    ordersPage,
}: TOverlayProps): ReactElement {
    return (
        <div style={{ position: 'relative' }}>
            <div className={stylesOverlay.overlay}>{children}</div>
            <span className={stylesOverlay.countOfIngredientsInOverlay}>
                +{ordersPage ? countOfIngredients - 5 : countOfIngredients - 4}
            </span>
        </div>
    )
}
