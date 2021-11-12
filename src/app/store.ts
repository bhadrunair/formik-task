import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import valueSlice from '../features/valueSlice'
import stepSlice from '../features/stepSlice'

const store = configureStore({
    reducer:{
        valueboi: valueSlice,
        stepboi: stepSlice
    }
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
