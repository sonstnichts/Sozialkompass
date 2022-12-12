import { createSlice } from '@reduxjs/toolkit'

export const applicationSlice = createSlice({
    name: 'application',
    initialState:{
    BAFög:0,
    BAB:0,
    ALG2:0,
    Kindergeld:0,
    Wohngeld:0
},

	reducers: {

        
        one: (state,action) => {
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

export const { one, minus, zero } = applicationSlice.actions

export default applicationSlice.reducer


/* const  initialState= { res:{
    BAföG:0,
    BAB:0,
    ALG2:0,
    Kindergeld:0,
    Wohngeld:0
}};

 export default function applicationReducer(state = initialState, action) {
    return { ...state, res: action.payload };}



    export const getApplications = (state) => state.res;
 */

