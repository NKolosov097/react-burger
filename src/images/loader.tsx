import { BiLoaderAlt } from 'react-icons/bi'
import { ReactElement } from 'react'
import loaderStyles from './images.module.css'

export function Loader(): ReactElement {
    return (
        <BiLoaderAlt
            color="#f2f2f3"
            className={loaderStyles.loader}
            size={50}
        />
    )
}
