import { useEffect, useRef } from 'react'

interface Position {
    top: number,
    height: number
}

interface Props {
    update: (position: Position) => void
}



const useMeasurePosition = ({ update } : Props) => {

    
    const ref = useRef(null)

    useEffect(() => {
        update({
            height: ref.current.offsetHeight,
            top: ref.current.offsetTop
        })
    })

    return ref

    };

export default useMeasurePosition;