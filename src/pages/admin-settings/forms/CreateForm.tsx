import { MdEdit, MdDelete, MdDragIndicator, MdOutlineCheckBox, MdOutlineStar, MdOutlineHelp, MdHelp, MdOutlineHelpOutline, MdOutlineInfo, MdTextFormat, MdAdd } from "react-icons/md"
import { nanoid } from 'nanoid'
import { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps, useEffect, useRef, useState } from "react"

import { useSelector, useDispatch } from 'react-redux'
import { newFormSlice } from '../../../features/newFormSlice'
import { formsListSlice } from "../../../features/formsListSlice"

import { Form, FormSection } from '../../../constants/Interfaces'
import { RootState } from "../../../app/store"

import { useNavigate } from 'react-router-dom'

import { AnimatePresence, motion } from "framer-motion"

import Helpbox from '../../../components/Helpbox'
import AddItem from "./AddItem"



const CreateForm = () => {

    const [rerender, setRerender] = useState(false)

    const [showAddItemModal, setShowAddItemModal] = useState(false)

    const [showPlaceHolderInputState, setShowPlaceHolderInputState] = useState('hidden')

    const [currentForm, setCurrentForm] = useState<Form>(useSelector((state: RootState) => state.newForm))

    const [forms, setForms] = useState<Form[]>(useSelector((state: RootState) => state.forms))

    const dispatch = useDispatch()
    const navigate = useNavigate()

  

    const getSectionIconType = (type: string) => {

        if (type === 'checkbox') return <MdOutlineCheckBox  />

        if (type === 'text') return <MdTextFormat />
    }


    const [currentSection, setCurrentSection] = useState<FormSection>({
        id: nanoid(),
        name: '',
        type: '',
        placeholder: '',
        isRequired: false,
        items: []
    })

    const formNameRef = useRef<HTMLInputElement>(null)
    const formDescRef = useRef<HTMLTextAreaElement>(null)
    const formDefaultRef = useRef<HTMLInputElement>(null)
    const sectionNameRef = useRef<HTMLInputElement>(null)
    const sectionPlaceHolderRef = useRef<HTMLInputElement>(null)
    const sectionTypeRef = useRef<HTMLSelectElement>(null)
    const sectionIsReqRef = useRef<HTMLSelectElement>(null)
    

    const pushUpdateToRedux = () => {

        dispatch(formsListSlice.actions.addForm(currentForm))
    }

    const handleCreateForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // handleResetForm()

        const id = nanoid()
        const name = formNameRef.current!.value
        const description = formDescRef.current!.value
        const isDefault = formDefaultRef.current!.checked

        setCurrentForm(prev => ({...prev, id, name, description, isDefault}))

        // reset input fields
        formNameRef.current!.value = ''
        formDescRef.current!.value = ''

        if (isDefault) {
            dispatch(formsListSlice.actions.removeAllDefaults())
        }

        setRerender(true)
    }

    const handleAddSection = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        const name = sectionNameRef.current!.value
        const type = sectionTypeRef.current!.value
        const placeholder = sectionPlaceHolderRef.current!.value ?? ''
        const isRequired = sectionIsReqRef.current!.value === 'req' ? true : false

        // do empty string check
        if (!name) return

        const newSection: FormSection = {
            id: nanoid(),
            name,
            type,
            placeholder,
            isRequired,
            items: []
        }

        // dispatch(newFormSlice.actions.addSection(newSection))
        setCurrentForm(prev => ({...prev, sections: [...prev.sections, newSection]}))

        // reset text inputs
        sectionNameRef.current!.value = ''
        sectionPlaceHolderRef.current!.value = ''
    }

    const handleAddItem = (item: FormSection) => {
        setCurrentSection(item)
        setShowAddItemModal(!showAddItemModal)
    }

    const handleDeleteSection = (name: string) => {
        dispatch(newFormSlice.actions.deleteSection(name))
        setCurrentForm(prev => ({...prev, 
            sections: prev.sections.filter(item => item.name !== name)
        }))
    }

    const handleResetForm = () => {

        dispatch(newFormSlice.actions.resetForm())
        setCurrentForm(prev => ({...prev,
        id: nanoid(),
        name: '',
        description: '',
        sections: [],
        isDefault: false}))
    }

    const updateSection = () => {
        setCurrentForm(cur => ({...cur, sections: [...cur.sections].map(item => {
            
            if (item.name === currentSection.name) {
                return currentSection
            }

            return item
        })}))
    }

    useEffect(() => {

        if (rerender) {
            dispatch(formsListSlice.actions.addForm(currentForm))
            setForms(item => [...item, currentForm])
            setRerender(false)
            navigate('/admin-settings/forms')
        }

    }, [rerender])

    return (
        <motion.form 
        initial={{ opacity: 1, x: '-2%' }}
        animate={{ opacity: 1, x: '0%' }}
        transition={{ duration: 0.25, type: 'tween' }}
        className="flex flex-col gap-12 relative" onSubmit={handleCreateForm}>

            <AnimatePresence>

                {showAddItemModal && 
                <div className="absolute backdrop-blur-[5px] w-[110%] h-[110%] -top-2 -bottom-2 -left-2 -right-2 z-10"></div>}
                {showAddItemModal && <AddItem setShowAddItemModal={setShowAddItemModal} setCurrentSection={setCurrentSection} currentSection={currentSection} updateSection={updateSection} />}
            </AnimatePresence>




            <section  className="flex flex-col gap-4">
                {/* form body */}
                <div className="flex gap-6 items-center">
                    <label className="flex justify-end min-w-[128px]">Name:</label>
                    <input type="text" placeholder="Enter a name for this form" 
                    ref={formNameRef} required />
                </div>
                <div className="flex gap-6 items-center">
                    <label className="flex justify-end min-w-[128px]">Description:</label>
                    <textarea ref={formDescRef} required></textarea>
                </div>
                <div className="flex gap-6 items-center">
                    <label className="flex justify-end min-w-[128px]">Set as Default? <Helpbox message="Setting this default will automatically load this form on Add Flow page" />:</label>
                    <input type='checkbox' className="hover:cursor-pointer" ref={formDefaultRef} />
                </div>
                <div className="flex gap-6 items-center">
                    
                        <label className="flex justify-end min-w-[128px]">Add Section:</label>
                        <div className="flex gap-2 items-center">
                            <input type="text" placeholder="Enter a new section name" ref={sectionNameRef} />
                            
                            <input className={showPlaceHolderInputState} type="text" placeholder="Add a place holder text (can be empty)" ref={sectionPlaceHolderRef} />

                            <select className="min-w-[100px]" ref={sectionTypeRef} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                if (e.currentTarget.value === 'text') {
                                    setShowPlaceHolderInputState('block')
                                }
                                if (e.currentTarget.value === 'checkbox') {
                                    setShowPlaceHolderInputState('hidden')
                                }
                                }}>
                                <option value='checkbox'>Checkbox</option>
                                <option value='text'>Text</option>
                            </select>

                            <select className="min-w-[100px]" ref={sectionIsReqRef}>
                                <option value='req'>Required</option>
                                <option value='nreq'>Not Req</option>
                            </select>

                            <button className="btn btn-blue" onClick={handleAddSection}>Add Section</button>
                        </div>
                </div>
                <div className="flex gap-6 items-start">
                    <label className="flex justify-end min-w-[128px] pt-2">Sections <Helpbox message={"Click on the + sign to add items to the sections or click on the pen to edit a section's name"} />:</label>

                    <div className="flex flex-col gap-2 z-0">

                        {currentForm.sections.length ? currentForm.sections.map(item => {
                            return (
                                <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, type: "spring", stiffness: 500 }}>
                                <div className="flex gap-6 items-center relative" key={nanoid()} >
                                
                                <div className="flex gap-3 justify-between items-center min-w-[615px] shadow-md bg-[#F4F4F4] hover:bg-[#DADADA] hover:cursor-pointer px-3 py-2 rounded-md break-normal border border-slate-300">
                                    <h5>{item.name}</h5>
                                    
                                    <div className="flex gap-2 text-xl items-center">




                                        <div className="flex items-center gap-2">
                                            <h5 className="-mt-1">{item.items.length}</h5>
                                            <div className="min-w-fit opacity-25 hover:opacity-100">

                                                {getSectionIconType(item.type.toLowerCase())}
                                            </div>
                                        </div>
                                        
                                        {item.type.toLowerCase() !== 'text' ? 
                                        
                                        <MdAdd className="min-w-fit opacity-25 hover:opacity-100" onClick={() => handleAddItem(item)} />
                                        : '' }

                                        <MdDelete className="min-w-fit opacity-25 hover:opacity-100" onClick={() => handleDeleteSection(item.name)} />
                                    </div>
                                </div>
                                <MdDragIndicator className="absolute -right-8 text-2xl hover:cursor-move" onClick={() => alert('hi')} />
                                {/* <div className="border border-[#6B7280] rounded-[6px] w-[150px] h-[34px] px-3 py-1">
                                    {item.type}: {item.items.length}
                                </div>
                                <button className="btn btn-blue">Add/Edit Items</button> */}
                                </div>
                                </motion.div>
                            )
                        }) : <h5 className="pt-2">No sections yet</h5>}

                        

                    </div>

                </div>

            </section>

            <div className="btns__wrapper">
                <button className="btn btn-blue" type="submit">Create</button>
                <button className="btn btn-grey" onClick={handleResetForm}>Reset</button>
                <button className="btn btn-grey" onClick={() => navigate('/admin-settings/forms')}>Cancel</button>
            </div>
        </motion.form>
    )
}

export default CreateForm