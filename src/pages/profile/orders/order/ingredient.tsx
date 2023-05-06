import orderStyles from './order.module.css'

export function Ingredient({ image }: { image: string }) {
    return (
        <li className={orderStyles.ingredientEl}>
            <img src={image} alt="" width={110} />
        </li>
    )
}
