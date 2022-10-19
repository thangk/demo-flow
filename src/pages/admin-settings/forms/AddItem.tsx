import { ChangeEvent, useRef, useState } from "react"
import { MdDelete, MdDragIndicator } from "react-icons/md"
import { nanoid } from 'nanoid'
import { FormSection } from "../../../constants/Interfaces"

import { AnimatePresence, motion } from 'framer-motion'

interface Props {
    setShowAddItemModal: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentSection: React.Dispatch<React.SetStateAction<FormSection>>,
    currentSection: FormSection,
    updateSection: () => void
}

const AddItem = ({ setShowAddItemModal, setCurrentSection, currentSection, updateSection }: Props) => {

    const addItemRef = useRef<HTMLInputElement>(null)

    const [newItem, setNewItem] = useState('')

    const handleAddItem = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        if (!newItem) return

        console.log(newItem)

        setCurrentSection(prev => ({...prev, items: [...prev.items, newItem]}))

        addItemRef.current!.value = ''
        setNewItem('')
    }

    const handleSaveItems = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        updateSection()
        setShowAddItemModal(prev => !prev)
    }

    return (
        <motion.section
        
        initial={{ opacity: 0, scale: 0.85, x: '-50%' }}
        animate={{ opacity: 1, scale: 1, x: '-50%' }}
        exit={{ opacity: 0, scale: 0.85, x: '-50%' }}
        transition={{ duration: 0.25, type: "tween"}}
        
        
        className="absolute w-fit bg-[#F4F4F4] border border-[#005596] rounded-md shadow-xl left-[50%] -translate-x-[50%] py-6 px-10 flex flex-col gap-6 z-10">
            <div className="flex flex-col gap-2 text-center">
                <h3>{currentSection.name}</h3>
                <h6>Add/Edit Items</h6>
            </div>

            <div className="flex gap-4 items-center">
                
                <input className="h-[32px]" type="text" placeholder="Enter a new item" ref={addItemRef} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewItem(e.currentTarget.value)} />
                
                <button className="btn btn-blue" onClick={handleAddItem}>Add</button>
            </div>
 
            <div className="flex flex-col gap-2">

                {currentSection.items.length ? currentSection.items.map(item => {
                    return (

                <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 500 }}>

                <div className="bg-[#DADADA] px-3 py-2 flex justify-between gap-2 relative">
                    <MdDragIndicator className="absolute -left-6 place-self-center h-full text-2xl hover:cursor-move" onClick={() => alert('hi')} key={nanoid()} />
                    <h5>{item}</h5>
                    <div><MdDelete className="h-full place-self-center text-lg hover:cursor-pointer" /></div>
                </div>
                </motion.div>
                    )
                }) : <h5 className="place-self-center">No items yet</h5>}
            </div>


            <div className="btns__wrapper place-self-center">
                <button className="btn btn-blue" onClick={handleSaveItems}>Save</button>

                <button className="btn btn-grey" onClick={() => setShowAddItemModal(prev => !prev)}>Cancel</button>
            </div>

        </motion.section>
    )
}

export default AddItem;