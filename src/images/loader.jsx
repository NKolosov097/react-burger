import { BiLoaderAlt } from 'react-icons/bi'
import loaderStyles from './images.module.css'

export function Loader() {
    return (
        <BiLoaderAlt
            color="#f2f2f3"
            className={loaderStyles.loader}
            size={50}
        />
    )
}
