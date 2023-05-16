import { ReactElement } from 'react'
import orderStyles from '../order.module.css'

export function Ingredient({ image }: { image: string }): ReactElement {
    return (
        <li className={orderStyles.ingredientEl}>
            <img src={image} alt="" width={110} />
        </li>
    )
}
