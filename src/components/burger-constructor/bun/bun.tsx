import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import React, { ReactElement } from 'react'
import bunStyles from '../burger-constructor.module.css'
import { IIngredient } from '../../../utils/types'
// import { IIngredient, IIngredientWithNewId } from '../../../utils/types'

type TBunProps = {
    bun: IIngredient | null
    coordinate: 'top' | 'bottom' | undefined
}

export const Bun = React.memo(
    ({ bun = null, coordinate }: TBunProps): ReactElement => {
        const dispatch = useDispatch()
        const onDropHandlerBuns = (item: IIngredient): void => {
            dispatch({
                type: 'UPDATE_BUN_IN_CONSTRUCTOR',
                payload: { ...item },
                isBun: true,
            })

            dispatch({
                type: 'UPDATE_BUN_COUNT',
                payload: { _id: item._id },
            })
        }

        const [, dropBuns] = useDrop<IIngredient>({
            accept: 'bun',
            drop(item) {
                onDropHandlerBuns(item as IIngredient)
            },
        })
        return (
            <div ref={dropBuns} className="pl-20 ml-1">
                {bun ? (
                    <ConstructorElement
                        type={coordinate}
                        isLocked
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                ) : (
                    <div
                        className={cn(
                            coordinate === 'top'
                                ? 'constructor-element constructor-element_pos_top'
                                : 'constructor-element constructor-element_pos_bottom',
                            bunStyles.plugWrapper
                        )}
                    >
                        <span
                            className={cn(
                                'constructor-element__text',
                                bunStyles.plugText
                            )}
                        >
                            Выберите булку
                        </span>
                    </div>
                )}
            </div>
        )
    }
)