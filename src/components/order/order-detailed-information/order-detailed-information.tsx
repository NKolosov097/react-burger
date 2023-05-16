import { ReactElement } from 'react'
// import { useParams } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import orderDetailsStyles from './order-detailed-information.module.css'
import { useSelector } from '../../../store'
import { IFeed } from '../../../utils/types'

type TOrderDetailsProps = {
    orderFromFeed: boolean
    orderFromProfile: boolean
}

export function OrderDetailedInformation({
    orderFromFeed,
    orderFromProfile,
}: TOrderDetailsProps): ReactElement {
    const { id } = useParams<{id: string}>()
    const ordersFeed = useSelector((store) => store.wsReducer.orders)
    const ordersProfile = useSelector((store) => store.wsAuthReducer.orders)
    const ingredients = []

    if (orderFromFeed) {
        const itemOfOrder = ordersFeed.find((item: IFeed) => item._id === id)
        ingredients.push(itemOfOrder)
    } else if (orderFromProfile) {
        const itemOfOrder = ordersProfile.find((item: IFeed) => item._id === id)
        ingredients.push(itemOfOrder)
    }

    console.log(ingredients)

    return (
        <aside className={orderDetailsStyles.wrapper}>
            <div className={orderDetailsStyles.container}>some text</div>
        </aside>
    )
}
