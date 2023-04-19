import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import cn from 'classnames'
import assemblingBurgerStyles from '../burger-constructor.module.css'
import { IIngredientWithNewId } from '../../../utils/types'

// type TAssemblingBurgerProps = IIngredientWithNewId & {
//     index: number
//     moveIngredients: (dragIndex: number, hoverIndex: number) => void
// }

export const AssemblingBurger = React.memo(
    ({ image, price, name, _id, ID, index, moveIngredients }) => {
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
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
                    return
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
                    return

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

        drag(drop(ref))

        const handleClose = () => {
            dispatch({
                type: 'DELETE_INGREDIENT_FROM_CONSTRUCTOR',
                ID,
            })

            dispatch({
                type: 'DECREMENT_INGREDIENT_COUNT',
                payload: { _id },
            })
        }

        return (
            <li
                ref={ref}
                className={cn(
                    assemblingBurgerStyles.assemblingBurgerLi,
                    isDragging
                        ? assemblingBurgerStyles.isDragging
                        : assemblingBurgerStyles.isNotDragging
                )}
            >
                <button
                    className={assemblingBurgerStyles.assemblingBurgerButton}
                    type="button"
                >
                    <DragIcon type="primary" />
                </button>
                <ConstructorElement
                    handleClose={handleClose}
                    text={name}
                    price={price}
                    thumbnail={image}
                />
            </li>
        )
    }
)
