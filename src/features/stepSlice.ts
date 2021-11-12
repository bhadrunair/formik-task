import React from 'react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialStatesteup{
    stepValue: number[]
}

const initialState: InitialStatesteup = {
    stepValue: [0]
}

const stepSlice = createSlice({
    name: 'stepname',
    initialState,
    reducers: {
        setStep: (state, action:PayloadAction<number>) => {
            state.stepValue[0] = action.payload;
        },
        statePlus: (state) => {
            state.stepValue[0]++;
        },
        stateMinus: (state) => {
            state.stepValue[0]--;
        }

    }

})

export const {setStep, statePlus, stateMinus} = stepSlice.actions;

export default stepSlice.reducer
