import PropTypes from 'prop-types'
import { MoneyLogo } from '../../images/money'
import priceStyles from './price-title.module.css'

export function PriceTitle({ price }) {
    return (
        <h3 className={priceStyles.header}>
            {price}
            <span className={priceStyles.span}>
                <MoneyLogo size={22} />
            </span>
        </h3>
    )
}

PriceTitle.propTypes = {
    price: PropTypes.number.isRequired,
}
