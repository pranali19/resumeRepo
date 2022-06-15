import produce from 'immer';
import {
    resumeTemplateState,
    ImageState,
    mediaState,
    ResumeDetailsState,
    customSectionState,
    resumeStyleState,
    curPageState,
    themeColor,
    designationState} from './AllState'

export const setTemplateReducer=(state=resumeTemplateState,action)=>{
     if(action.type == 'setTemplate'){
        return {
            template:action.payload
        }
     }
    return state
}
export const setImageReducer=(state=ImageState,action)=>{
    if(action.type == 'setImage'){
        return{
            image:action.payload
        }
    } 
    return state
}
export const setMediaReducer=(state=mediaState,action)=>{
    if(action.type == 'addMedia'){
        return[
            ...state,
            action.payload
        ]
    }
    if (action.type == 'deleteMedia'){
    return state.filter(i=>i.key != action.payload)
    }
    return state
}
export const setResumeReducer=(state=ResumeDetailsState , action)=>{
    if (action.type == "addToResume"){
        
       return {
           ...state,
           [action.payload.title]:[...state[action.payload.title],action.payload.value]
       }
    }
    else if(action.type =="deleteFromResume"){
        return {
            ...state,
            [action.payload.title]:action.payload.val
        }
    }
    else if(action.type == "updateToResume"){
        const title= action.payload.title
        const rank = action.payload.rank
        const body= action.payload.body    
         
         const p  = produce(state,(draftState)=>{
            draftState[title][rank]=body
        })
        
        return p
         
    }
    if (action == 'addSection'){
        return [...state]
    }
    return state
}
export const setCustomSection=(state= customSectionState, action)=>{
    if (action.type == 'addSection'){
        return [...state, action.payload]
    }
    else if(action.type == 'removeSection'){
        const z = state.filter(i=>i.key != action.payload)
        return z

    }
    else if(action.type == 'updateSectionM'){
        
        return produce(state,(draftState)=>{
            draftState[action.payload.id].vals.push(action.payload.value)
        })   
    }
    else if(action.type == 'updateSectionRecord'){
    
        return produce(state,(draft)=>{
            draft[action.payload.index]  = action.payload.value
        })
    }
    else if(action.type == 'removeSubSection'){
        let indx;
        state.map((i,index)=>i.key == action.payload.key?
        indx = index :'')
        const z = produce(state,(draft)=>{
            draft[indx].vals = draft[indx].vals.filter((i,ind)=>ind != action.payload.index)
        })
        
        return z
    } 
    return state
}
export const setResumeStyleReducer =(state=resumeStyleState,action)=> {
    if (action.type == 'changeFontStyle'){
        return produce(state,draft=>{
            draft[action.payload.temp].custom[action.payload.k1][action.payload.k2]= action.payload.val
            })
    }

    else if (action.type == 'incFont'){
        return produce(state,draft=>{
        draft[action.payload.temp].custom[action.payload.k1][action.payload.k2]= action.payload.val
        })
    }
    else if(action.type == 'restore'){
        return  produce(state,draft=>{
            draft[action.payload].custom = draft[action.payload].orignal
        })   
    }


    return state
}
export const curPageReducer=(state=curPageState,action)=>{
    if (action.type == 'setCurPage'){
        state = action.payload
    }
    return state
}
export const DesignationReducer =(state=designationState,action)=>{
    if (action.type == 'setDesignation'){
        state =action.payload
    }
    return state
}





