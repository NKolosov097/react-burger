import styles from './empty-item.module.css'

interface IEmptyItem {
    isFeed?: boolean
    isProfile?: boolean
}

export function EmptyItem({ isFeed = false, isProfile = false }: IEmptyItem) {
    let style = ''
    if (isFeed) {
        style = styles.isFeed
    } else if (isProfile) {
        style = styles.isProfile
    } else style = styles.emptyItem

    return <li className={style} />
}
