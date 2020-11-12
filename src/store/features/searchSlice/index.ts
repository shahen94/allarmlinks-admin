import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearch } from './../../../types/ISearch';


const initialState:ISearch = {
    type:'',
    value:''
}

const searchSlice = createSlice({
    name:"search",
    initialState,
    reducers:{
        setSearchType:(
            state: ISearch,
            {payload}: PayloadAction<string>
        ):void =>{
            state.type = payload
        },
        setSearchValue:(
            state: ISearch,
            {payload}: PayloadAction<string>
        ):void =>{
            state.value = payload
        }
    }
})

const { actions, reducer } = searchSlice;

export const {
    setSearchType,
    setSearchValue,
} = actions
export default reducer