import cn from 'classnames'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { AssemblingBurger } from '../assembling-burger/assembling-burger'
import burgerConstructorStyles from '../burger-constructor.module.css'

export function IngredientsList({ ingredients, moveIngredients }) {
    const dispatch = useDispatch()

    const onDropHandlerMains = (item) => {
        dispatch({
            type: 'ADD_INGREDIENT_TO_CONSTRUCTOR',
            payload: { ...item },
        })

        dispatch({
            type: 'INCREMENT_INGREDIENT_COUNT',
            payload: { _id: item._id },
        })
    }

    const [, dropMains] = useDrop({
        accept: ['main', 'sauce'],
        drop(item) {
            onDropHandlerMains(item)
        },
    })

    return (
        <div ref={dropMains}>
            {ingredients.length > 0 ? (
                <ul
                    className={cn(
                        'm-2 custom-scroll',
                        burgerConstructorStyles.list
                    )}
                >
                    {ingredients.map(
                        (item, index) =>
                            item.type !== 'bun' && (
                                <AssemblingBurger
                                    key={item?.ID}
                                    image={item?.image}
                                    price={item?.price}
                                    name={item?.name}
                                    ID={item?.ID}
                                    _id={item?._id}
                                    index={index}
                                    moveIngredients={moveIngredients}
                                />
                            )
                    )}
                </ul>
            ) : (
                <div className="pl-20 ml-1 m-2">
                    <div
                        style={{
                            textAlign: 'center',
                        }}
                        className="constructor-element"
                    >
                        <span
                            style={{
                                transform: 'translateY(50%)',
                            }}
                            className="constructor-element__text"
                        >
                            Выберите начинку
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

IngredientsList.prototype = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
            ID: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        })
    ).isRequired,
    moveIngredients: PropTypes.func.isRequired,
}
