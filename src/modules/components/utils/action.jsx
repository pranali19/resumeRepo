import { isValidElement } from "react"

export const setTemplateAction =(val)=>{
    return{
        type:'setTemplate',
        payload:val
    }
}
export const setImageAction=(val)=>{
    return{
        type:'setImage',
        payload:val
    }
}
export const addMediaAction=(val)=>{
    return{
        type: 'addMedia',
        payload:{
            icon:val.icon,
            value:val.value,
            key:val.key
        }
    }
}
export const deleteMediaAction=(id)=>{
    return {
        type:'deleteMedia',
        payload:id
    }
}
export const addResumeDetails =(title,val)=>{
    
    return {
        type:'addToResume',
        payload:{
            title:title,
            value:val
        }
    }}
export const deleteResumeDetails =(title,value)=>{
    return{
        type:'deleteFromResume',
        payload:{
            title:title,
            val:value
        }
    }
}
export const updateResumeDetails =(title,actVal)=>{
     const body = actVal[0]
    const rank   = actVal[1]
    return{
        type: 'updateToResume',
        payload:{
            title:title,
            rank:rank,
            body:body
        }
    }
}

export const addSectionAction=(val)=>{
    return{
        type:'addSection',
        payload:val
    }
}
export const removeSectionAction=(indx)=>{
    return {
        type:'removeSection',
        payload:indx
    }
}
export const updateSectionActionM=(val)=>{
    return {
        type:'updateSectionM',
        payload:{
            id:val.index,
            value:val.val
        }
    }
}
export const updateSectionRecordAction=(val)=>{
    return{
        type:'updateSectionRecord',
        payload:{
            index:val.index,
            value:val.value
        }
    }
}

export const removeSubSectionAction=(val)=>{
    return {
        type:'removeSubSection',
        payload:{
            key:val.key,
            index:val.index
        }
    }
}