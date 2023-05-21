import { ReactElement } from 'react'
import stylesOverlay from '../order.module.css'

type TOverlayProps = {
    children: ReactElement
    countOfIngredients: number
}

export function Overlay({
    children,
    countOfIngredients,
}: TOverlayProps): ReactElement {
    return (
        <div style={{ position: 'relative' }}>
            <div className={stylesOverlay.overlay}>{children}</div>
            <div
                className={
                    countOfIngredients - 5 > 9
                        ? `${stylesOverlay.countOfIngredientsInOverlay} ${stylesOverlay.ml10}`
                        : stylesOverlay.countOfIngredientsInOverlay
                }
            >
                +{countOfIngredients - 5}
            </div>
        </div>
    )
}
