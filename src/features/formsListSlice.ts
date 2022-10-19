import { createSlice } from "@reduxjs/toolkit";
import { Form } from "../constants/Interfaces";
import { nanoid } from "nanoid";

const initialState: Form[] = [
    {
        id: '4',
        name: 'form4',
        description: 'form4 desc',
        sections: [],
        isDefault: true,
    },
    {
        id: '5',
        name: 'form5',
        description: 'form5 desc',
        sections: [],
        isDefault: false,
    },
    {
        id: '6',
        name: 'form6',
        description: 'form6 desc',
        sections: [],
        isDefault: false,
    }
]

export const formsListSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        
        addForm: (state, action) => [...state, action.payload],
        deleteForm: (state, action) => state.filter(item => item.id !== action.payload),
        setForms: (state, action) => action.payload,
        updateForm: (state, action) => {
            return state.map(form => {
                if (form.name === action.payload.name) {
                    return action.payload.updatedForm
                }
                return form
            })
        },
        resetForms: (state) => initialState,
        setDefault: (state, action) => {
            return state.map(form => 
                form.id === action.payload ? {...form, isDefault: true} : {...form, isDefault: false}
            )
        },
        removeAllDefaults: (state) => state.map(form => ({...form, isDefault: false}))
    }
})

export const { 
    addForm, 
    deleteForm,
    setForms,
    updateForm,
    resetForms,
    setDefault,
    removeAllDefaults,
    } = formsListSlice.actions

export default formsListSlice.reducer