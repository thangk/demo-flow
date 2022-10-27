import { motion } from "framer-motion";
import { useState } from "react";
import useMeasurePosition from "../../../hooks/useMeasurePosition";





interface Position {
    height: number,
    top: number
}

interface Props1 {
    i: number,
    height: number,
    updatePosition: (i: number, offset: Position) => Position,
    updateOrder: (i: number, dragOffset: number) => void
}

interface Props2 {
    update: (position: Position) => void
}


const Item = ({ i, height, updatePosition, updateOrder} : Props1) => {

    const [isDragging, setDragging] = useState(false)
    
    const ref = useMeasurePosition((pos: Position) => updatePosition(i, pos))

    return (
        
        <li
        style={{

            height,
            zIndex: isDragging ? 3 : 1
        }}
        >

        <motion.div

        ref={ref}
        layout
        initial={false}
        style={{
            height
        }}
        whileHover={{
            scale: 1.03,
            boxShadow: "0px 3px 3px rgba(0,0,0,0.15)"
        }}
        whileTap={{
            scale: 1.10,
            boxShadow: "0px 5px 5px rgba(0,0,0,0.1)"
        }}
        drag='y'
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        onViewportBoxUpdate={(_viewportBox, delta) => {
            isDragging && updateOrder(i, delta.y.translate)
        }}

        >

        
            
        </motion.div>



        </li>
    )};

export default Item;