import React from 'react'
import '../styles/global.scss'
import {useSelector} from 'react-redux'
import {RootState} from '../store'
const Main = ()=>{
    const counter: number = useSelector((state: RootState)=>state.counter)
    return(
        <div>
            Test {counter}
        </div>
    )
}
export default Main