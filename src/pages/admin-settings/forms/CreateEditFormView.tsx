import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import { Form, FormSection } from "../../../constants/Interfaces";

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { formsListSlice } from "../../../features/formsListSlice"
import { MdAdd, MdDelete, MdDragIndicator, MdOutlineCheckBox, MdTextFormat } from "react-icons/md";
import { motion } from "framer-motion";
import AddItem from "./AddItem";
import Helpbox from "../../../components/Helpbox";
import { newFormSlice } from "../../../features/newFormSlice";



interface Props {
    formMode: string,       // create or edit
    currentForm: Form,
    forms?: Form[],
    setForms?: React.Dispatch<React.SetStateAction<Form[]>>,
    setCurrentForm: React.Dispatch<React.SetStateAction<Form>>,

}


const getSectionIconType = (type: string) => {

    if (type === 'checkbox') return <MdOutlineCheckBox  />
    if (type === 'text') return <MdTextFormat />
}


const CreateEditFormView = ({ 
    formMode,
    currentForm, 
    setCurrentForm,
    forms,
    setForms
    } : Props) => {

    const [rerender, setRerender] = useState(false)

    const [showAddItemModal, setShowAddItemModal] = useState(false)

    const [showPlaceHolderInputState, setShowPlaceHolderInputState] = useState('hidden')

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

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { name } = useParams()

    // section related founctions
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


        setCurrentForm(prev => ({...prev, sections: [...prev.sections, newSection]}))

        // reset text inputs
        sectionNameRef.current!.value = ''
        sectionPlaceHolderRef.current!.value = ''
    }

    const handleUpdateSection = () => {
        setCurrentForm(cur => ({...cur, sections: [...cur.sections].map(item => {
            
            if (item.name === currentSection.name) {
                return currentSection
            }

            return item
        })}))
    }

    const handleDeleteSection = (id: string) => {
        setCurrentForm(prev => ({...prev, 
            sections: prev.sections.filter(item => item.id !== id)
        }))
    }


    // item related funcions
    const handleAddItem = (item: FormSection) => {
        setCurrentSection(item)
        setShowAddItemModal(!showAddItemModal)
    }

    // form related functions
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const id = nanoid()
        const name = formNameRef.current!.value
        const description = formDescRef.current!.value
        const isDefault = formDefaultRef.current!.checked

        setCurrentForm(prev => ({...prev, name, description, isDefault}))

        // reset input fields
        formNameRef.current!.value = ''
        formDescRef.current!.value = ''

        if (isDefault) {
            dispatch(formsListSlice.actions.setDefault(currentForm.id))
        }

        setRerender(true)
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

    const handleCancel = () => {
        navigate('/admin-settings/forms')
    }

    useEffect(() => {
        if (rerender) {
            if (formMode === 'create') {
                dispatch(formsListSlice.actions.addForm(currentForm))
                setForms!(item => [...item, currentForm])
            }
    
            if (formMode === 'edit') {
                dispatch(formsListSlice.actions.updateForm({name, updatedForm: currentForm }))
            }
            setRerender(false)
            navigate('/admin-settings/forms')
        }
    }, [rerender])

    return (
        <motion.form 
        initial={{ opacity: 1, x: '-2%' }}
        animate={{ opacity: 1, x: '0%' }}
        transition={{ duration: 0.25, type: 'tween' }}
        className="flex flex-col gap-12 relative" onSubmit={handleSubmit}>

            {/* background block with blur */}
            {showAddItemModal && 
            <div className="absolute backdrop-blur-[5px] w-[110%] h-[110%] -top-2 -bottom-2 -left-2 -right-2 z-10"></div>}

            {/* pop-up modal */}
            {showAddItemModal && <AddItem setShowAddItemModal={setShowAddItemModal} setCurrentSection={setCurrentSection} currentSection={currentSection} updateSection={handleUpdateSection} />}



            <section className="flex flex-col gap-4">
                {/* form body */}
                <div className="flex gap-6 items-center">
                    <label className="flex justify-end min-w-[128px]">Name:</label>
                    <input type="text" placeholder="Enter a name for this form" defaultValue={currentForm.name}
                    ref={formNameRef} required />
                </div>
                <div className="flex gap-6 items-center">
                    <label className="flex justify-end min-w-[128px]">Description:</label>
                    <textarea ref={formDescRef} defaultValue={currentForm.description} required></textarea>
                </div>
                <div className="flex gap-6 items-center">
                    <label className="flex justify-end min-w-[128px]">Set as Default? <Helpbox message="Setting this default will automatically load this form on Add Flow page" />:</label>
                    
                    {currentForm.isDefault ? 
                    <input type='checkbox' className="hover:cursor-pointer" defaultChecked ref={formDefaultRef} /> 
                    : <input type='checkbox' className="hover:cursor-pointer" ref={formDefaultRef} />}
                    
                </div>
                <div className="flex gap-6 items-center">
                    
                        <label className="flex justify-end min-w-[128px]">Add Section:</label>
                        <div className="flex gap-2 items-center">
                            <input type="text" placeholder="Enter a new section name" ref={sectionNameRef} />

                            <input className={showPlaceHolderInputState} type="text" placeholder="Add a place holder text (can be empty)" ref={sectionPlaceHolderRef} />

                            <select className="min-w-[100px]" ref={sectionTypeRef} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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

                        {currentForm.sections.length ? currentForm.sections.map((item, idx) => {
                            return (
                                <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, type: "spring", stiffness: 500 }}
                                key={idx}>

                                <div className="flex gap-6 items-center relative">
                                
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

                                        <MdDelete className="min-w-fit opacity-25 hover:opacity-100" onClick={() => handleDeleteSection(item.id)} />
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
                <button className="btn btn-blue" type="submit">{formMode === 'create' ? 'Create' : 'Save'}</button>
                <button className="btn btn-grey" onClick={handleResetForm}>Reset</button>
                <button className="btn btn-grey" onClick={handleCancel}>Cancel</button>
            </div>
        </motion.form>
    )};

export default CreateEditFormView;