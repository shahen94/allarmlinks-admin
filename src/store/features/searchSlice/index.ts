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
            {type}: ISearch,
            {payload}: PayloadAction<string>
        ):void =>{
            type = payload
        },
        setSearchValue:(
            {value}: ISearch,
            {payload}: PayloadAction<string>
        ):void =>{
            value = payload
        }
    }
})

const { actions, reducer } = searchSlice;

export const {
    setSearchType,
    setSearchValue,
} = actions
export default reducer