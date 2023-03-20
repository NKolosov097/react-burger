import PropTypes from 'prop-types'
import { MoneyLogo } from '../../images/money'

export function PriceTitle({ price }) {
    return (
        <h3
            style={{
                display: 'flex',
                width: '100%',
                marginTop: 4,
                fontWeight: 'normal',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Iceland',
                fontSize: 28,
            }}
        >
            {price}
            <span style={{ display: 'flex', marginLeft: '10px' }}>
                <MoneyLogo size={22} />
            </span>
        </h3>
    )
}

PriceTitle.propTypes = {
    price: PropTypes.number.isRequired,
}
