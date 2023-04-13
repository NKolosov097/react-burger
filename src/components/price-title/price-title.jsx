import PropTypes from 'prop-types'
import React from 'react'
import { MoneyLogo } from '../../images/money'
import priceStyles from './price-title.module.css'

export const PriceTitle = React.memo(({ price }) => (
    <h3 className={priceStyles.header}>
        {price}
        <span className={priceStyles.span}>
            <MoneyLogo size={22} />
        </span>
    </h3>
))

PriceTitle.propTypes = {
    price: PropTypes.number.isRequired,
}
