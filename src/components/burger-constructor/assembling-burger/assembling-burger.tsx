import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { ReactElement, useRef } from 'react'
import { XYCoord, useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import cn from 'classnames'
import assemblingBurgerStyles from '../burger-constructor.module.css'
import { IIngredient } from '../../../utils/types'

type TAssemblingBurgerProps = Pick<
    IIngredient,
    'image' | 'price' | 'name' | '_id' | 'ID'
> & {
    index: number
    moveIngredients: (dragIndex: number, hoverIndex: number) => void
}

export const AssemblingBurger = React.memo(
    ({
        image,
        price,
        name,
        _id,
        ID,
        index,
        moveIngredients,
    }: TAssemblingBurgerProps): ReactElement => {
        const dispatch = useDispatch()
        const ref = useRef<HTMLLIElement | null>(null)
        const [, drop] = useDrop({
            accept: 'ingredient',
            hover: (item: TAssemblingBurgerProps, monitor): void => {
                if (!ref.current) return
                const dragIndex: number = item.index
                const hoverIndex: number = index

                if (dragIndex === hoverIndex) return

                const hoverBoundingRect: DOMRect =
                    ref.current?.getBoundingClientRect()
                const hoverMiddleY: number =
                    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
                const clientOffset: XYCoord | null = monitor.getClientOffset()
                const hoverClientY: number = clientOffset
                    ? clientOffset.y - hoverBoundingRect.top
                    : 0
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
                    return
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
                    return

                moveIngredients(dragIndex, hoverIndex)

                const ingredient = item as TAssemblingBurgerProps
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

        const handleClose = (): void => {
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
