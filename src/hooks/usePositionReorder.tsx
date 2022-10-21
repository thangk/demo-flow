import { useState, useRef } from 'react'
import { clamp, distance } from 'popmotion'
import { Form } from '../constants/Interfaces';
import { arrayMoveImmutable } from 'array-move'


interface Position {
    height: number,
    top: number
}

const findIndex = (i: number, yOffset: number, positions: Position[]) : number => {



    return 1
}


const usePositionReorder = (initialState: Form) => {

    const [order, setOrder] = useState<Form | unknown>(initialState)

    const positions = useRef<number[] | null>([]).current

    const updatePosition = (i: number, offset: any) => (positions[i] = offset)

    const updateOrder = (i: number, dragOffset: number) => {
        const targetIndex = findIndex(i, dragOffset, positions)

        if (targetIndex !== i) setOrder(arrayMoveImmutable(order, i, targetIndex))
    }
};

export default usePositionReorder;
