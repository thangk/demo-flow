
import { useRef, useState } from 'react';
import { MdOutlineHelp } from 'react-icons/md'
import { useHover } from '../hooks/useOnHover'

interface Props {
    message: string
}


const Helpbox = ({ message }: Props) => {

    const iconRef = useRef(null)

    const [hoverRef, isHovered] = useHover(iconRef)

    return (
        <div className='relative mx-[2px]' ref={iconRef}>
            <section className={`text-slate-200 min-w-[200px] text-center absolute z-20 bg-[#005596] p-4 left-[50%] -translate-x-[50%] bottom-10 rounded-xl ${isHovered ? 'block' : 'hidden'}`}>
                <h6>{message}</h6>
            </section>
            <div className={`absolute w-10 h-10 bg-[#005596] left-[50%] -translate-x-[50%] bottom-8 rotate-45 z-10 ${isHovered ? 'block' : 'hidden'}`}></div>
            <MdOutlineHelp className='w-full h-full cursor-pointer drop-shadow-md opacity-50 hover:opacity-100' />
        </div>
    )};

export default Helpbox;