import { useEffect, useRef } from 'react'

interface Position {
    top: number,
    height: number
}

interface Props2 {
    update: (position: Position) => void
}



const useMeasurePosition = ({ update } : any) => {

    
    const ref = useRef<any>(null)

    useEffect(() => {
        update({
            height: ref.current.offsetHeight,
            top: ref.current.offsetTop
        })
    })

    return ref

    };

export default useMeasurePosition;