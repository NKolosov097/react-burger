import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

export function AssemblingBurger({ image, price, name, ID }) {
    const dispatch = useDispatch()
    return (
        <li
            style={{
                margin: '10px 0',
                alignItems: 'center',
                display: 'flex',
            }}
        >
            <button
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                }}
                type="button"
            >
                <DragIcon type="primary" />
            </button>
            <ConstructorElement
                handleClose={() => {
                    dispatch({
                        type: 'DELETE_INGREDIENT_FROM_CONSTRUCTOR',
                        ID,
                    })
                }}
                text={name}
                price={price}
                thumbnail={image}
            />
        </li>
    )
}

AssemblingBurger.prototype = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
}
