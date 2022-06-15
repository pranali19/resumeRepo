import draftToHTML from 'draftjs-to-html'
import { convertToRaw } from "draft-js";



export const getUpperCaseName=(val)=>{
    if (val != null ){
    return val.substr(0,1).toUpperCase() + val.substr(1,)
    }else{
        return ''
    }
}
export const getRes=(statePersonal)=>{
    const res ={}
    const checkVal=(val)=>{
        if(val == undefined){
            return ''
        }
        return val
    }
    if(statePersonal != undefined && statePersonal.length > 0){
    statePersonal.map(i=>res[i.name]=checkVal(i.val))
    }
    return res
}

export const getSelectedState=(state)=>{
    const {setTemp ,setResumeStyle }=state
    return setResumeStyle[setTemp.template].custom
}
export const  workSummary =(val)=> draftToHTML(convertToRaw(val.getCurrentContent()))

