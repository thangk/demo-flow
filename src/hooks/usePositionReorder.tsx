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
        if (nextItem === undefined) return i

        const swapOffset = distance(bottom, nextItem.top + nextItem.height / 2 + buffer)
        if (yOffset > swapOffset) target = i + 1


        // if moving up
    } else if (yOffset < 0) {
        const prevItem = positions[i - 1]
        if (prevItem === undefined) return i

        const prevBottom = prevItem.top + prevItem.height
        const swapOffset = distance(top, prevBottom - prevItem.height / 2) + buffer
        if (yOffset < -swapOffset) target = i - 1
    }

    return clamp(0, positions.length, target)
}


const usePositionReorder = (initialState: Form) => {

    const [order, setOrder] = useState<any>(initialState)

    const positions = useRef<Position[]>([]).current

    const updatePosition = (i: number, offset: Position) => (positions[i] = offset)

    const updateOrder = (i: number, dragOffset: number) => {
        const targetIndex = findIndex(i, dragOffset, positions)
        if (targetIndex !== i) setOrder(arrayMoveImmutable(order, i, targetIndex))
    }

    return [order, updatePosition, updateOrder]
};

export default usePositionReorder;