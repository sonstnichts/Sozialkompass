import { createSlice } from '@reduxjs/toolkit'


//this slice contains the applications and can be used globally
export const applicationSlice = createSlice({
    name: 'application',
    initialState:{
    BAföG:0,
    BAB:0,
    ALG2:0,
    Kindergeld:0,
    Wohngeld:0
}, 
// The slice contains all applications with the standard value 0
// 0 signals application in progress

	reducers: {

        
        applicationUpdate: (state,action) => {
            return {
                    // spreads the current state obj
                    ...state,
                    // spreads the action.payload
                    // if there is any property spreaded before, this will just override that part. 
                    ...action.payload
            }
        },
    
    }
    })

export const { applicationUpdate } = applicationSlice.actions

export default applicationSlice.reducer

