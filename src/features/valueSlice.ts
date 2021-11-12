import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { RootStateOrAny } from 'react-redux';
import { string } from 'yup/lib/locale';

export interface ObjType{
    firstname: string,
    lastname: string,
    dateofbirth: string,
    cboi: string
}

interface InitialStateType{
    values: ObjType[]
}

// const initialState:ObjType = {
//     firstname: '',
//     lastname: '',
//     dobstate: new Date('')
// }

const initialState:InitialStateType = {
    values: []    
}

const valueSlice = createSlice({
    name: 'valuehold',
    initialState,
    reducers: {
        uploadValue: (state, action: PayloadAction<ObjType>) => {
            // state.values.push(action.payload);
            //console.log(action.payload);
            state.values.splice(0,1,action.payload);
            // const dayear = new Date(state.values[0].dateofbirth).getFullYear();
            // console.log(dayear);
        },
        showDragon: (state) => {
            
            const dayear = new Date(state.values[0].dateofbirth).getFullYear();
            // console.log(dayear);
            // console.log('Shadow dragon');
            // const dayear = parseInt(action.payload);
            const remain = (dayear - 1912)%12;
            const cname = (remain1:number) => {
            
                switch(remain1){
                    case 0: return 'Rat';
                    case 1: return 'Ox';
                    case 2: return 'Tiger';
                    case 3: return 'Rabbit';
                    case 4: return 'Dragon';
                    case 5: return 'Snake';
                    case 6: return 'Horse';
                    case 7: return 'Sheep';
                    case 8: return 'Monkey';
                    case 9: return 'Rooster';
                    case 10: return 'Dog';
                    case 11: return 'Pig';
                    default: return 'Rat';
            
                }
            }

            //state.values[0].cboi = cname(remain);
            const alphaboi = {
                firstname: state.values[0].firstname,
                lastname: state.values[0].lastname,
                dateofbirth: state.values[0].dateofbirth,
                cboi: cname(remain)
            }
            console.log(alphaboi);
            
            state.values.splice(0, 1, alphaboi);
            console.log(state.values[0]);

            // console.log('Cname(remain) is '+cname(remain));
            // console.log('cboi is '+state.values[0].cboi);
            //console.log(state.values[0]);
        }
    }
})

export const {uploadValue, showDragon} = valueSlice.actions;

export default valueSlice.reducer
