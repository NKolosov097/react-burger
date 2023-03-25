import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'

export function Bun({ bun, coordinate }) {
    const dispatch = useDispatch()
    const onDropHandlerBuns = (item) => {
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

    const [, dropBuns] = useDrop({
        accept: 'bun',
        drop(item) {
            onDropHandlerBuns(item)
        },
    })
    return (
        <div ref={dropBuns} className="pl-20 ml-1">
            {bun ? (
                <ConstructorElement
                    type={coordinate}
                    isLocked
                    text={bun?.name}
                    price={bun?.price}
                    thumbnail={bun?.image}
                />
            ) : (
                <div
                    style={{
                        textAlign: 'center',
                    }}
                    className={cn(
                        coordinate === 'top'
                            ? 'constructor-element constructor-element_pos_top'
                            : 'constructor-element constructor-element_pos_bottom'
                    )}
                >
                    <span
                        style={{
                            transform: 'translateY(50%)',
                        }}
                        className="constructor-element__text"
                    >
                        Выберите булку
                    </span>
                </div>
            )}
        </div>
    )
}
