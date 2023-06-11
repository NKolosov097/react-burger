import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { useDrop } from 'react-dnd'
import React, { ReactElement } from 'react'
import bunStyles from '../burger-constructor.module.css'
import { IIngredient } from '../../../utils/types'
import { UPDATE_BUN_IN_CONSTRUCTOR } from '../../../services/actions/burger-constructor-action'
import { UPDATE_BUN_COUNT } from '../../../services/actions/ingredients-action/ingredients-action'
import { useDispatch } from '../../../store'

type TBunProps = {
    bun: IIngredient | null
    coordinate: 'top' | 'bottom' | undefined
}

export const Bun = React.memo(
    ({ bun = null, coordinate }: TBunProps): ReactElement => {
        const dispatch = useDispatch()
        const onDropHandlerBuns = (item: IIngredient): void => {
            dispatch({
                type: UPDATE_BUN_IN_CONSTRUCTOR,
                payload: { ...item },
                isBun: true,
            })

            dispatch({
                type: UPDATE_BUN_COUNT,
                idForCount: { _id: item._id },
            })
        }

        const [, dropBuns] = useDrop<IIngredient>({
            accept: 'bun',
            drop(item) {
                onDropHandlerBuns(item as IIngredient)
            },
        })
        return (
            <div
                ref={dropBuns}
                className="pl-20 ml-1"
                data-test="constructor-drop-target-bun"
            >
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
                            Выберите булочку
                        </span>
                    </div>
                )}
            </div>
        )
    }
)
