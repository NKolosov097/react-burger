import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import bunStyles from '../burger-constructor.module.css'

export function Bun({ bun = null, coordinate }) {
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

Bun.propTypes = {
    bun: PropTypes.shape({
        ID: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }),
    coordinate: PropTypes.string.isRequired,
}
