import { Formik, Form, Field, FormikConfig, FormikValues, validateYupSchema } from 'formik';
import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import {object, string, number, date} from 'yup';
import styled from 'styled-components';
import {Stepper, Step, StepLabel, Button, CircularProgress} from '@mui/material';
import {TextField, CheckboxWithLabel} from 'formik-mui';
// import { DatePicker } from '@mui/lab';
import { DatePicker } from 'formik-mui-lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ObjType, uploadValue, showDragon } from './features/valueSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { stateMinus, statePlus, setStep } from './features/stepSlice';

const sleep = async(time: number) => {
  await new Promise(acc => setTimeout(acc, time));
}

export function App() {
const [colors, setfcolors] = useState({
  fcolor: 'black',
  bgcolor: 'white'
});

const valueItem = useSelector((state: RootState) => state.valueboi.values[0]);
const dispatch = useDispatch();


// const [bgcolor, setbgcolor] = useState('white');


  return (
    
      <FormikStepper initialValues={{
          firstname: '',
          lastname: '',
          dateofbirth: new Date(1950, 2, 9).toString(),
          cboi: ''
        }} onSubmit={ async(values, helpers) => {
          await sleep(3000);
          //dispatch(uploadValue(values as ObjType));
          //console.log(values);
          //console.log('This is the top submit');
        }}>
          <FormikStep label='Personal Details' validationSchema={
            object({
              firstname: string().required('Required Field!').min(3, 'Minimum of 3 letters'),
            })
          }>
            <Field fullWidth name='firstname' label='First Name' component={TextField}></Field>
            <Field fullWidth name='lastname' label='Last Name' component={TextField}></Field>
          </FormikStep>
          <FormikStep label='Date of Birth' validationSchema={
            object({
              dateofbirth: string().required('Please do fill in a valid date')
            })
          }>
            {/* <Field fullWidth name='dateofbirth' label='DOB' component={TextField}></Field> */}
            <Field name='dateofbirth' component={DatePicker} label='Date of Birth'/>
          </FormikStep>
          <FormikStep label='Confirmation Page'>
            <EditBoi/>
          </FormikStep>
          <FormikStep label='Results'>
            {/* {dispatch(showDragon(valueItem))} */}
            <ResultBoi/>
          </FormikStep>
        </FormikStepper>
    
  );
}

export const FormikStepper = ({children, ...props}:FormikConfig<FormikValues>) => {
// const [step, setstep] = useState(0);
const [completed, setcompleted] = useState(false);
const childArray = React.Children.toArray(children) as React.ReactElement<FormikTypeProps>[];
const step = useSelector((state:RootState) => state.stepboi.stepValue[0]);
const currentChild = childArray[step];
const valueItem = useSelector((state: RootState) => state.valueboi.values[0]);
const isLast = () => {
  return step === childArray.length-1;
}
const isSecondLast = () => {
  return step === childArray.length-2;
}
const dispatch = useDispatch();


return(
  <Formik {...props} onSubmit={async(values, helpers) => {
    // (isLast()) ? await props.onSubmit(values, helpers) : setstep(step + 1);
    if (isLast()){
      
      await props.onSubmit(values, helpers);
      setcompleted(true);
    }else if (isSecondLast()){
      
      dispatch(uploadValue(values as ObjType));
      dispatch(showDragon());
      dispatch(statePlus());
      console.log(valueItem)
    }else{
      //console.log(values);
      dispatch(uploadValue(values as ObjType));
       //setstep(step + 1);
       dispatch(statePlus());
       //console.log('This is the bottom submit');
    }
  }} validationSchema={currentChild.props.validationSchema}>
    {({isSubmitting}) => (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form>
        
          <Stepper alternativeLabel>
            {childArray.map((eachChild, index) => {
              return <Step key={index} completed={step > index || completed}>
              <StepLabel>{eachChild.props.label}
                </StepLabel>
                </Step>
            })}
          </Stepper>
        
          {currentChild}
          {step > 0 && <button onClick={() => {
            //setstep(step-1);
            dispatch(stateMinus());
            }} disabled={isSubmitting || completed}>Back</button>}
          <Button startIcon={isSubmitting && <CircularProgress size={20}/>}disabled={isSubmitting || completed} type='submit'>{isLast() ? 'Submit' : 'Next'}</Button>
        </Form>
      </LocalizationProvider>
    )}
  </Formik>
)
}

interface FormikTypeProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'>{
  label: string

}

export const FormikStep = ({children}:FormikTypeProps) => {

  return(
    <>
    {children}
    </>
  )
}

interface TempStyle{
  fname: string,
  lname: string,
  dobstate: string
}

export const EditBoi = () => {

  const valueItem = useSelector((state: RootState) => state.valueboi.values[0]);
  //console.log(valueItem);

  const step = useSelector((state:RootState) => state.stepboi.stepValue[0]);
  const dispatch = useDispatch();
  // dispatch(showDragon(valueItem));

  return(
    <>
      <p>{valueItem.firstname}<button onClick={() => {dispatch(setStep(0))}}>Edit</button> {valueItem.lastname}<button onClick={() => {dispatch(setStep(0))}}>Edit</button> 
      is born on {new Date(valueItem.dateofbirth).getFullYear()}<button onClick={() => {dispatch(setStep(1))}}>Edit</button>. Yes?</p>
      {/* <p>Edit Slice</p> */}
    </>
  )
}

export const ResultBoi = () => {

  // const czodiac = (dobstate1:Date) => {
  //   const dayear = dobstate1.getFullYear();
  //   const remain = (dayear - 1912)%12;
  //   switch(remain){
  //     case 0: return 'Rat';
  //     case 1: return 'Ox';
  //     case 2: return 'Tiger';
  //     case 3: return 'Rabbit';
  //     case 4: return 'Dragon';
  //     case 5: return 'Snake';
  //     case 6: return 'Horse';
  //     case 7: return 'Sheep';
  //     case 8: return 'Monkey';
  //     case 9: return 'Rooster';
  //     case 10: return 'Dog';
  //     case 11: return 'Pig';
  //     default: return 'Rat';

  //   }
  // }

  // const boi = czodiac(dobstate);

  const valueItem = useSelector((state: RootState) => state.valueboi.values[0]);


  return(
    <>
      <p>{valueItem.firstname} {valueItem.lastname} is born on {new Date(valueItem.dateofbirth).getFullYear()} which is the year of the {valueItem.cboi}</p>
    </>
  )
}

export default App;
