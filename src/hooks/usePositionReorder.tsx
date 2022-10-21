import { useState, useRef } from 'react'
import { clamp, distance } from 'popmotion'
import { Form } from '../constants/Interfaces';
import { arrayMoveImmutable } from 'array-move'


interface Position {
    height: number,
    top: number
}

const buffer = 30

const findIndex = (i: number, yOffset: number, positions: Position[]) : number => {

    let target = i

    const { top, height } = positions[i]

    const bottom = top + height

    // if moving down
    if (yOffset > 0) {
        const nextItem = positions[i + 1]
        if (nextItem === undefined) return 1

        const swapOffset = distance(bottom, nextItem.top + nextItem.height / 2 + buffer)
        if (yOffset > swapOffset) target = i + 1
    }

    // if moving up

    return 1
}


const usePositionReorder = (initialState: Form) => {

    const [order, setOrder] = useState<any>(initialState)

    const positions = useRef<Position[]>([]).current

    const updatePosition = (i: number, offset: Position) => (positions[i] = offset)

    const updateOrder = (i: number, dragOffset: number) => {
        const targetIndex = findIndex(i, dragOffset, positions)

        if (targetIndex !== i) setOrder(arrayMoveImmutable(order, i, targetIndex))
    }
};

export default usePositionReorder;