import { createSlice } from "@reduxjs/toolkit";
import { Form } from "../constants/Interfaces";
import { nanoid } from "nanoid";

const initialState: Form = {
    id: "",
    name: "",
    description: "",
    sections: [],
    isDefault: false
}

export const newFormSlice = createSlice({
    name: 'newForm',
    initialState,
    reducers: {
        setFormName: (state, action) => {
            state.name = action.payload
        },
        setFormDescription: (state, action) => {
            state.description = action.payload
        },
        setDefault: (state, action) => {
            state.isDefault = action.payload
        },
        addSection: (state, action) => {
            state.sections = [...state.sections, action.payload]
        },
        deleteSection: (state, action) => {
            state.sections = state.sections.filter(item => item.name !== action.payload)
        },
        resetForm: (state) => initialState
    }
})

export const { 
    setFormName, 
    setFormDescription, 
    setDefault, 
    addSection,
    deleteSection,
    resetForm } = newFormSlice.actions

export default newFormSlice.reducer