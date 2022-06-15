import React,{useState,useEffect} from "react";
import { BsFillCaretDownFill} from 'react-icons/bs';
import { FaEdit, FaSave} from 'react-icons/fa';
import { MdDeleteForever} from 'react-icons/md';
import {v4 as uuidv4} from 'uuid';
import {Editor,ContentState} from 'react-draft-wysiwyg'
import {  EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import 'draft-js/dist/Draft.css'

import {toolbar} from './utils/toolbar'
import {onClickEdit,
    onClickEvent,
    radioClickState,
    handleClickXpDown,
    onClickDeleteEvent,
    onClickSaveEvent,
    disabledHandler
    } from './utils/Temp2Utils'
import { useDispatch, useSelector } from "react-redux";




export const PersonalDetails=()=>{
    const dispatch = useDispatch()
    const personalLen = useSelector(state=>state.setResume.Personal.length)
     
    const inps=[{
       name:'First Name',label:'First Name *',type:'text'},{name:'Last Name',label:'Last Name *',type:'text'},{name:'City',label:'City',type:'text'},{name:'Country',label:'Country',type:'text'},{name:'Pin Code',label:'Pin Code',type:'text'},{name:'Phone Number',label:'Phone Number *',type:'text'},{name:'Email',label:'Email *',type:'text'}]
    const key='Personal'
    const IconWrap='iPersonalIconWrap'
    return (
        <div className="work-xp-box-wrap">
        <DisabledWrap2 props={{key,IconWrap}}/>
            <div id="add-Personal-wrap" style={{display:personalLen?'none':'grid'}}>
                <div  className="state-rendered-work-xp-inp" >
                <GetInputReturn {...[inps]}/>
                </div>
                <AlertMsg props={[key]}/>
                <div className="btn-add-btn-wrap"><button type="button" className='btn-form' onClick={()=>onClickEvent(key,uuidv4(),'add-Personal-wrap',dispatch)}>Add</button></div>
             </div>
        </div>
    )
}
const ExperienceRecordCustom=(props)=>{
    useEffect(()=>{
        disabledHandler(true)
    },[])
    const [i,index,blockGridId, UUIDobj,inpArray2,key]=props.props
    const [isDisabled,setIsDisabled] = useState(true)
    const [recordSum,setRecordSum]= useState(()=>EditorState.createEmpty())
    return(
        <div className="record-tab-class-wrap">
        <RecordBlockHeader props={[i,index,blockGridId, UUIDobj,inpArray2,key,'iWorkXPIconWrap',setIsDisabled,recordSum]} />
        <GetDisabledInputReturn props={[i,blockGridId,isDisabled,recordSum,setRecordSum]}/>
    </div>
    )
}
export const WorkExperience=()=>{
    const key = 'Experience'
    const dispatch = useDispatch()
    const inpArray2  = useSelector(state=>state.setResume[key])
    const [type, setType] = useState('Work Exprience')
    const [editorState,setEditorState] = useState(()=>{
        EditorState.createEmpty()
    })
    
    const ShowInputs={
        'Work Exprience':[{name:'Title',label:'Job Title *',type:'text'},{name:'Employer',label:'Employer/Company Name *',type:'text'},{name:'City',label:'City ',type:'text'},{name:'Start Date',label:'Start Date (Mmm/YY) *',type:'text'},{name:'End Date',label:'End Date (Mmm/YY) *',type:'text'},{name:'Summary',label:'Work Summary *',type:'textarea'}],
        'Internship':[{name:'Title',label:'Job Title *',type:'text'},{name:'Employer',label:'Employer/Company Name *',type:'text'},{name:'City',label:'City ',type:'text'},{name:'Start Date',label:'Start Date (Mmm/YY) *',type:'text'},{name:'End Date',label:'End Date  (Mmm/YY) *',type:'text'},{name:'Summary',label:'Internship Summary *',type:'textarea'}] ,
        'Project':[{name:'Title',label:'Project Name *',type:'text'},,{name:'Start Date ',label:'Start Date (Mmm/YY) *',type:'text'},{name:'End Date',label:'End Date (Mmm/YY) *',type:'text'},{name:'Project URL',label:'Project URL',type:'text'},{name:'Summary',label:'Project Summary *',type:'textarea'}] ,
        'Freelancing Experience':[{name:'Title',label:'Project Name *',type:'text'},{name:'Employer',label:'Employer/Company Name *',type:'text'},{name:'Start Date',label:'Start Date (Mmm/YY) *',type:'text'},{name:'End Date',label:'End Date (Mmm/YY)*',type:'text'},{name:'Project URL',label:'Project URL',type:'text'},{name:'Summary',label:'Freelance Summary *',type:'textarea'}] 
    }
    
    const RadioCheckArray=[{'name':'Work Exprience',checked:true},{'name':'Internship',checked:false},{'name':'Project',checked:false},{'name':'Freelancing Experience',checked:false}]
    return (
        <>
    
          <div className="work-xp-box-wrap">
            <div className="work-xp-inp-wrap" >
            <div id='xp-record-wrap-temp2'>
             {inpArray2.map((i,index)=>{


                const blockGridId = key+String(index)
                const UUIDobj= i.slice(-1)[0]
                 return(
                     
                    <ExperienceRecordCustom key={uuidv4()} props={[i,index,blockGridId, UUIDobj,inpArray2,key]}/>
                   
                 )
             })}
             </div>
         
              <div id="add-work-wrap">
                <div className="form-check radio-wrap">
               <DisplayRadio props={{radio:RadioCheckArray,setType:setType}}/>    
                </div>
                <div className="state-rendered-work-xp-inp" >
                    <GetInputReturn {...[ShowInputs[type],editorState,setEditorState]}/>
                </div>
                </div>
                <AlertMsg props={[key]}/>
                
                <div className="btn-add-btn-wrap"><button type="button" className='btn-form' onClick={()=>onClickEvent('Experience',uuidv4(),'add-work-wrap',dispatch,editorState,setEditorState)}>Add</button></div>

            </div>
          </div>
         
        </>
    )
}
export const EducationDetails=()=>{
    const dispatch = useDispatch()
     const inps = [{name:'School Name',label:'School/University Name * ',type:'text'},{name:'Course',label:'Course *',type:'text'},{name:'Start Date',label:'Start Date (Mmm/YY) *',type:'text'},{name:'End Date',label:'End Date (Mmm/YY)*',type:'text'},{name:'Marks Obtained',label:'Marks Obtained',type:'textarea'}]
     const key ='Education'
     const IconWrap ='iEducationIconWrap'
    return(
        <div className="work-xp-box-wrap">
            <div className="work-xp-inp-wrap" >
            <DisabledWrap props={{key,IconWrap}}/>
            <div id="add-Education-wrap">
                <div className="state-rendered-work-xp-inp" >
                <GetInputReturn {...[inps]}/>
                </div>
                </div>
                <AlertMsg props={[key]}/>
                {/* <div className="error-msg-wrap" id='Education-error-wrap'><small className="error-msg">* marked value cannot be none</small></div> */}
                <div className="btn-add-btn-wrap"><button type="button" className='btn-form' onClick={()=>onClickEvent(key,uuidv4(),'add-Education-wrap',dispatch)}>Add</button></div>

            </div>
        </div>
    )
}
export const Skills=()=>{
    const dispatch = useDispatch()
    const inps=[{name:'Skill Name',label:'Skill Name *',type:'text'},{name:'Skill Level',label:'Skill Level',type:'number'}]
    const key = 'Skills'
    const IconWrap='iSkillsIconWrap'
     return (
        <div className="work-xp-box-wrap">
        <DisabledWrap2 props={{key,IconWrap}}/>
            <div id="add-Skills-wrap">
                <div className="state-rendered-work-xp-inp" >
                <GetInputReturn {...[inps]}/>
                </div>
                <AlertMsg props={[key]}/>
                <div className="btn-add-btn-wrap"><button type="button" className='btn-form' onClick={()=>onClickEvent(key,uuidv4(),'add-Skills-wrap',dispatch)}>Add</button></div>
             </div>
        </div>
     )
}
export const Summary=()=>{
    const dispatch = useDispatch()
    const summaryLen = useSelector(state=>state.setResume.Summary.length)

    const inps=[{name:'Summary',label:'Summary *',type:'text'}]
    const key = 'Summary'
    const IconWrap='iSummaryIconWrap'
    return (
        <div className="work-xp-box-wrap">
        <DisabledWrap2 props={{key,IconWrap}}/>
            <div id="add-Summary-wrap" style={{display:summaryLen?'none':'flex'}} >
                <div className="state-rendered-work-xp-inp" >
                <GetInputReturn {...[inps]}/>
                <AlertMsg props={[key]}/>
                </div>
                <div className="btn-add-btn-wrap"><button type="button" className='btn-form' onClick={()=>onClickEvent(key,uuidv4(),'add-Summary-wrap',dispatch)}>Add</button></div>
             </div>
        </div>
    )
}


const GetDisabledInputReturn2=(props)=>{
    let inpArray = props[0]
    return(
        <div className="get-disabled-input-record-2-wrap" style={props[2]=="Personal"? {flexDirection: 'row',flexWrap: 'wrap'}:{}} id={props[1]}>
        {inpArray.map((i,indx)=>{
            if(i.name=='Summary'){
                return  <div className='form-group text-record-sum form-group-s' key={i.name+String(indx)}><label className='label-nb'><p name={i.name} className='label-para-class'>{i.name} </p><textarea name={i.name} className="inp-class-fd  form-control" defaultValue={i.val} disabled={true}></textarea></label></div>    
            }
            else if(i.name == 'id'){
                return ''
            }
            return  <div   className='form-group form-group-nb' key={i.name+String(indx)}><label className='label-nb'><p className='label-para-class'>{i.name} </p><input className="inp-class-fd form-control" name={i.name} defaultValue={i.val} disabled={true}></input></label></div> 
        })}
        </div>
    )
}
function RecordBlockHeader(props){
    const [i,index,blockGridId, UUIDobj,inpArray,head,IconWrapIdString,setIsDisabled,recordSum] = props.props

    const dispatch = useDispatch()
    const onClickEditWrap=()=>{
        onClickEdit(blockGridId,setIsDisabled)
    }

    return(
        <div className="record-tab-div" >
        <div className="record-name-class">{i[0].val}</div>
        <div className="record-name-class">{i[1].val}</div>
        <div className="record-name-class Icon-Wrap-Grid-Record" id={IconWrapIdString+String(index)}> 
            <div className="record-icon-wrap record-icon-wrap-hide" onClick={()=>onClickEditWrap()}><FaEdit className="Icons-class" /></div>
            <div className="record-icon-wrap record-icon-wrap-hide" onClick={()=>onClickSaveEvent(UUIDobj,blockGridId,head,inpArray,dispatch,setIsDisabled,recordSum)}><FaSave className="Icons-class"/> </div>
            <div className="record-icon-wrap record-icon-wrap-hide" onClick={()=>onClickDeleteEvent(UUIDobj,inpArray,head,dispatch)}><MdDeleteForever className="Icons-class" /> </div>
            <div className="record-icon-wrap down-btn-wrap" onClick={()=>handleClickXpDown(blockGridId,IconWrapIdString+String(index))}><BsFillCaretDownFill  className="Icons-class" /> </div>
        </div>
    </div>
    )
}

const EditorRecordComp =(props)=>{
    const [i,indx,isDisabled,recordSum,setRecordSum,]=props.props
    useEffect(()=>{
        if(i.val){
            setRecordSum(EditorState.createWithContent(i.val.getCurrentContent()))
        }
        
    }
    ,[])

    return(
        <div style={{height:'auto',width:'60vw',gridColumnStart: '1'}} className='form-group form-group-nb editor-xp-summary' id={i.name+String(indx)}>
        <label className='label-nb' ><p name={i.name} className='label-para-class'>{i.label?i.label:i.name} </p>
        <div data-editor={isDisabled?'recordEditor':'toolbarEditor'}  style={{height:'fit-content',minHeight:'6vh',width:'100%', backgroundColor:isDisabled?'rgba(137, 152, 163, 0.099)':'white'}} >
        <Editor
            readOnly={isDisabled}
            editorState ={recordSum}
            toolbarClassName='toolbarClassName'
            wrapperClassName='wrapperClassName'
            editorClassName='editorClassName'
            onEditorStateChange={setRecordSum}
            toolbar={toolbar}
        />
        
        </div>
        </label>
        </div>
    )
}
const GetDisabledInputReturn=(props)=>{
   
    const [inpArray,blockGridId,isDisabled,recordSum,setRecordSum] = props.props
    
    return(
        <div style={{display:'none'}} className="per-detail-grid-wrap record-grid" id={blockGridId}>
        {inpArray.map((i,indx)=>{
            if(i.name=='Summary'){
                return   inpArray.length > 2?<EditorRecordComp key={i.name+String(indx)} props={[i,indx,isDisabled,recordSum,setRecordSum]}/>       :<div className='form-group form-group-nb' key={i.name+String(indx)}><label className='label-nb'><p name={i.name} className='label-para-class'>{i.name} </p><textarea name={i.name} className="inp-class-fd txtarea-sum form-control" defaultValue={i.val} disabled={true}></textarea></label></div>    
            }
            else if(i.name == 'id'){
                return ''
            }
            return  <div className='form-group form-group-nb' key={i.name+String(indx)}><label className='label-nb'><p className='label-para-class'>{i.name} </p><input className="inp-class-fd form-control" name={i.name} defaultValue={i.val} disabled={true}></input></label></div> 
        })}
        </div>
    )
}

const DisabledWrap2=(props)=>{
    const dispatch = useDispatch()
    const {key,IconWrap} = props.props
    const inpArray2 = useSelector(state=>state.setResume[key])
    return(
        <>
         {inpArray2.map((i,index)=>{
            const blockGridId = key+String(index)
            const UUIDobj= i.slice(-1)[0]
            return(  
            <div className="record-tab-class-wrap" key={uuidv4()}>
                <div className="record-name-class Icon-Wrap-Grid-Record-SS" id={IconWrap+String(index)}> 
                    <GetDisabledInputReturn2 {...[i,blockGridId,key]}/>
                <div className="record-icon-wrap-2 " onClick={()=>{onClickEdit(blockGridId)}} ><FaEdit className="Icons-class" /></div>
                <div className="record-icon-wrap-2 " onClick={()=>{onClickSaveEvent(UUIDobj,blockGridId,key,inpArray2 ,dispatch)}}><FaSave className="Icons-class"/> </div>
                {key == 'Summary' || key == 'Personal'?'':<div className="record-icon-wrap-2 " onClick={()=>{onClickDeleteEvent(UUIDobj,inpArray2,key,dispatch)}}><MdDeleteForever className="Icons-class" /> </div>}  
            </div>
          
            
            </div>
          
                 )})}
        </>
    )
}
const DisabledWrap=(props)=>{
    const {key,IconWrap}=props.props
    const inpArray2  = useSelector(state=>state.setResume[key])
    return <>
         {inpArray2.map((i,index)=>{
                 const blockGridId = key+String(index)
                 const UUIDobj= i.slice(-1)[0]
                 return(     
                    <div key ={uuidv4()} className="record-tab-class-wrap">
                        <RecordBlockHeader props={[i,index,blockGridId, UUIDobj,inpArray2,key,IconWrap]} />
                        <GetDisabledInputReturn props={[i,blockGridId]}/>
                    </div>
                 )
             })}
    </>
}




const GetInputReturn=(props)=>{
    const editorState= props[1]
    const setEditorState = props[2]
    
    const inpArray = props[0]
    return(
        <div className="per-detail-grid-wrap">
        {inpArray.map((i,indx)=>{
            if(i.name=='Summary'){
                return inpArray.length > 2? <EditorRecordComp key={i.name+String(indx)} props={[i,indx,false,editorState,setEditorState]} />:<div className='form-group form-group-nb' key={i.name+String(indx)}><label className='label-nb'><p name={i.name} className='label-para-class'>{i.label} </p><textarea style={{height:'10vh',width:'20vw'}} name={i.name} className="inp-class-fd form-control"></textarea></label></div> 
            }
            if(i.name == 'Skill Level'){
                return <div style={{display:'flex',flexDirection:'column'}} className='form-group form-group-nb' key={i.name+String(indx)}><label className='label-nb'><p className='label-para-class'>{i.label} </p><input className="inp-class-fd form-control" defaultValue={''} name={i.name} type={i.type}></input></label> <small style={{width:'90%',marginLeft:'2%'}}id='kill-help-block' className='form-text text-muted'>level feild must contain a value lesser than or equal to 10 </small></div>
            }
            return  <div className='form-group form-group-nb' key={i.name+String(indx)}><label className='label-nb'><p className='label-para-class'>{i.label} </p><input  className="inp-class-fd form-control" defaultValue={''} name={i.name} type={i.type}></input></label></div> 
        })}
        </div>
    )
}
const DisplayRadio=(props)=>{
    const radioArray = props.props.radio
    const setType = props.props.setType
    return(
        <>
    { radioArray.map((btn,indx)=>{
        return (
        <div name={btn.name} className="single-radio-wrap" key={btn.name+String(indx)}>
            <input className="form-check-input" value={btn.name} type="radio" onClick={(e)=>radioClickState(setType,e)}  name="radioVal" id={btn.name} defaultChecked={btn.checked}></input> 
            <label className="form-check-label label-work-xp" htmlFor={btn.name}>{btn.name}</label>
       </div>
    )})
        }
        </>
    )
}
const AlertMsg=(props)=>{
    const [key] = props.props
    const msg = key == "Skills"?'* marked value cannot be none and skill value must be under 10':'* marked value cannot be none'
    return <div className="alert alert-danger error-msg-wrap" id={key+'-error-wrap'}><small className="error-msg">{msg}</small></div> 
}