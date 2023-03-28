import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import cn from 'classnames'
import assemblingBurgerStyles from '../burger-constructor.module.css'

export function AssemblingBurger({
    image,
    price,
    name,
    _id,
    ID,
    index,
    moveIngredients,
}) {
    const dispatch = useDispatch()
    const ref = useRef(null)
    const [, drop] = useDrop({
        accept: 'ingredient',
        hover: (item, monitor) => {
            if (!ref.current) return
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

            moveIngredients(dragIndex, hoverIndex)

            const ingredient = item
            ingredient.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: 'ingredient',
        item: () => ({ ID, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <li
            ref={ref}
            className={cn(assemblingBurgerStyles.assemblingBurgerLi, opacity)}
        >
            <button
                className={assemblingBurgerStyles.assemblingBurgerButton}
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

                    dispatch({
                        type: 'DECREMENT_INGREDIENT_COUNT',
                        payload: { _id },
                    })
                }}
                text={name}
                price={price}
                thumbnail={image}
            />
        </li>
    )
}

AssemblingBurger.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    ID: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    moveIngredients: PropTypes.func.isRequired,
}
