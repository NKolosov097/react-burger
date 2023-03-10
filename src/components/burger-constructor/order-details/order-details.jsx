import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import img from '../../../images/done.png'
import detailsStyles from './order-details.module.css'

const modalRoot = document.querySelector('#ingredient-details')

export function OrderDetails({ isOpened = false, closeModal }) {
    return !isOpened
        ? null
        : ReactDOM.createPortal(
              <div className={detailsStyles.container}>
                  <h1 className="mb-4 mt-20 text text_type_digits-large">
                      034536
                  </h1>
                  <button
                      className={detailsStyles.closeButton}
                      type="button"
                      onClick={closeModal}
                  >
                      <CloseIcon type="primary" />
                  </button>
                  <h2
                      style={{
                          fontFamily: 'JetBrains Mono',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          fontSize: '24px',
                          lineHeight: '30px',
                          letterSpacing: '2px',
                      }}
                      className="mb-15 mt-8 text text_type_main-default"
                  >
                      идентификатор заказа
                  </h2>

                  {<img className="mb-15" src={img} alt="done" /> ||
                      'Загрузка...'}
                  <p
                      style={{
                          fontFamily: 'JetBrains Mono',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '24px',
                          letterSpacing: '1px',
                      }}
                      className="mb-2 text text_type_main-small"
                  >
                      Ваш заказ начали готовить
                  </p>
                  <p
                      style={{
                          fontFamily: 'JetBrains Mono',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '24px',
                          letterSpacing: '1px',
                      }}
                      className="mb-2 text text_type_main-small text_color_inactive"
                  >
                      Дождитесь готовности на орбитальной станции
                  </p>
              </div>,
              modalRoot
          )
}

OrderDetails.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
}
