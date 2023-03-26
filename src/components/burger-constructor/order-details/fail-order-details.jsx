import detailsStyles from './order-details.module.css'

export function FailOrderDetails({ isNoBuns, isNoIngredients }) {
    return (
        <div className={detailsStyles.failOrderContainer}>
            {isNoBuns} {isNoIngredients}
        </div>
    )
}
