import { ReactElement } from 'react'
import { MoneyLogo } from '../../images/money'
import priceStyles from './price-title.module.css'

export function PriceTitle({ price }: { price: number }): ReactElement {
    return (
        <h3 className={priceStyles.header}>
            {price}
            <span className={priceStyles.span}>
                <MoneyLogo size={22} />
            </span>
        </h3>
    )
}
