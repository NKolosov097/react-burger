import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import detailsStyles from './ingredient-details.module.css'

const modalRoot = document.querySelector('#ingredient-details')

export function IngredientDetails({
    isOpened = false,
    closeModal,
    infoOfIngredient,
}) {
    const { imageLarge, name, calories, proteins, fat, carbohydrates } =
        infoOfIngredient
    const nutritionalValue = [
        {
            title: 'Калории, ккал',
            value: calories,
        },
        {
            title: 'Белки, г',
            value: proteins,
        },
        {
            title: 'Жиры, г',
            value: fat,
        },
        {
            title: 'Углеводы, г',
            value: carbohydrates,
        },
    ]
    return !isOpened
        ? null
        : ReactDOM.createPortal(
              <div className={detailsStyles.container}>
                  <h1 className={detailsStyles.title}>
                      Детали ингредиента
                      <button
                          className={detailsStyles.closeButton}
                          type="button"
                          onClick={closeModal}
                      >
                          <CloseIcon type="primary" />
                      </button>
                  </h1>

                  {(
                      <img
                          className={detailsStyles.image}
                          src={imageLarge}
                          alt={name}
                      />
                  ) || 'Загрузка...'}
                  <h2 className={detailsStyles.name}>{name}</h2>
                  <u className={detailsStyles.list}>
                      {nutritionalValue.map(({ title, value }) => (
                          <li key={title} className={detailsStyles.elem}>
                              <h3 className={detailsStyles.nutritionalTitle}>
                                  {title}
                              </h3>
                              <p className={detailsStyles.nutritionalPar}>
                                  {value}
                              </p>
                          </li>
                      ))}
                  </u>
              </div>,
              modalRoot
          )
}

IngredientDetails.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
}
