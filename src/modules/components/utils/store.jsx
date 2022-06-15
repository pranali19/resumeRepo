
import { configureStore, } from '@reduxjs/toolkit'
import {setCustomSection,curPageReducer, setResumeStyleReducer,setTemplateReducer,setImageReducer,setMediaReducer,setResumeReducer, DesignationReducer} from './reducer'

export default configureStore({
     reducer: {
        setTemp:setTemplateReducer, 
        setImage:setImageReducer,
        setSocialMedia:setMediaReducer,
        setResume : setResumeReducer,
        setCustomSection:setCustomSection ,
        setResumeStyle:setResumeStyleReducer,
        setCurPage:curPageReducer,
        setDesignation:DesignationReducer
       
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false
        })
    })

    