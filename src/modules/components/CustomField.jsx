import React, { useState, useEffect, useRef, useContext } from 'react'
import { v4 as uuid } from 'uuid'
import { AiFillDelete,AiOutlinePlusCircle, AiFillSave, AiFillEdit, AiOutlineCloseCircle } from 'react-icons/ai'
import WebFont from 'webfontloader'
import '../temp.css'
import  {isNull,checkVal} from './RegClass.jsx'
import settingArr,{colorChange} from './utils/SettingArr'
import { useDispatch, useSelector } from 'react-redux'
import {removeSubSectionAction,updateSectionRecordAction,addMediaAction,updateSectionActionM,addSectionAction,removeSectionAction} from './utils/action'
import BarContext from './utils/BarContext'
import {ShowMedia} from './utils/mobileEx'
import { onChangeImage, onClickDeleteImg } from './utils/mobileCustomFeildutil'
import DimensionContext from './utils/dimensionContext'
import ColorContext from './utils/ColorContext'


const enableBtn = (name) => {
    const ResumeElem = document.querySelector('#resumeWrapId')
    const elem = [...ResumeElem.querySelectorAll('#' + name)]
    elem.map(i => {
        i.toggleAttribute('disabled')
    })
}
export const toggleDisplay = (id) => {
    document.getElementById(id).classList.toggle('display-show-block')
}
export const onMouseIn = ( dataCl) => {
    const elem = document.querySelector('#resumeWrapId')
    if(elem){
    const allClass = [...elem.querySelectorAll(dataCl)]
    allClass.map(i => {
        i.classList.add('Border')   
    })
    }
}
export const onMouseLeave = (dataCl,e) => {
    const elem = document.querySelector('#resumeWrapId')
    const Allclass = [...elem.querySelectorAll(dataCl)]
    Allclass.map(i => {
        i.classList.remove('Border')
    })

}

const setChangeFont = (e, dataCl,dataState,dispatch,temp) => {
    const ResumeElem = document.querySelector('#resumeWrapId')
    const elem = [...ResumeElem.querySelectorAll([dataCl])]
    elem.map(i => {
        i.style.fontFamily = e.target.value
    })
    
    dispatch({type:'changeFontStyle',payload:{temp:temp,k1:dataState[0] ,k2:dataState[1], val:e.target.value}})

}
export const setSocialMedia = (iconVal, id,dispatchMedia) => {
    const uid = String(uuid())
    const inpval = document.getElementById(id).value
    if (inpval){
    var AddVal;
    if (iconVal === 'FB') {
        AddVal = { "value": inpval, "key": uid, "icon": "FB" }
    }
    else if (iconVal === 'Instgram') {
        AddVal = { "value": inpval, "key": uid, "icon": "Instagram" }
    }
    else if (iconVal === 'Git Hub') {
        AddVal = { "value": inpval, "key": uid, "icon": 'Git Hub' }
    }
    else if (iconVal === 'Linkedin') {
        AddVal = { "value": inpval, "key": uid, "icon": 'Linkedin' }
    }
    else if (iconVal === 'Twitter') {
        AddVal = { "value": inpval, "key": uid, "icon": 'Twitter' }
    }
    
    dispatchMedia(addMediaAction(AddVal))
}
}




const getSettingsArray=(val)=>{          
    switch(val.template){
        case 'res1':
            return settingArr.filter(i=>i.settingHead !== 'Add Image')
        case 'res2':
            return settingArr.filter(i=>{return i.settingHead !== 'Add Image' && i.settingHead !== 'Manage View'})
        case 'res3':
            return settingArr.filter(i=> i.settingHead !== 'Manage View')
        case 'res4':
            return settingArr.filter(i=> i.settingHead !== 'Manage View')
        default:
            return settingArr.filter(i=>i.settingHead !== 'Add Image')

        
    }
}

const BtnValCases = (param) => {
    switch (param) {
        case 'SubHead':
            return <AiFillEdit style={{ height: '80%', width: '80%' }} />
        case 'AddSocialMedia':
            return <AiOutlinePlusCircle style={{ height: '90%', width: '90%' }} />
        default:
            return <></>
    }
}

export const dispatchDesignation=(dispatch,val)=>{
    dispatch({type:'setDesignation',payload:val})
}

export const SingleInpReturn = (props) => {
    const val = props
    let placeholder =''
    const dispatch = useDispatch()
    const [colorThemes,setColorThemes ]=  useContext(ColorContext)

    const [temp,personal] = useSelector(state=>[state.setTemp.template,state.setResume.Personal])
    if (personal !== undefined  && personal.length > 0){
    placeholder =  'Your Designation'}

    const onMouseLeaveEvent=(dataCl,e)=>{
        onMouseLeave(dataCl)
        if(dataCl === 'cl-theme'){
            setColorThemes(e.target.value,temp)
        }
        if (dataCl === 'add-sub'){
            dispatchDesignation(dispatch,e.target.value)
        }
    }

    return (
        <div className='cf-single-input-wrap' key={uuid()}>
            <label className='cf-input-label'> 
            {val.label}
            <input placeholder={placeholder} id={val.name} onMouseOver={ ()=>onMouseIn( val.dataCl) } onMouseLeave={(e) => { onMouseLeaveEvent(val.dataCl,e) }} name={val.name} className={'form-control ' + val.className} type={val.type} onChange={(e) => { val.onChangeFunc(e, val.dataCl) }}  />
            </label>
        </div>
    )
}
export const SingleSelectReturn = (props) => {
    const val = props
    const dispatch = useDispatch()
    const temp = useSelector(state=>state.setTemp.template)
    const styleValue = useSelector(state=>state.setResumeStyle[temp].custom[val.dataState[0]][val.dataState[1]])
    return (
        <div className='select-fs-wrap'>
            <label className='cf-input-label'>{val.label}</label>
            <select defaultValue={styleValue} name={val.name} id={val.name} className={val.className} onMouseOver={()=>onMouseIn(val.dataCl) } onMouseLeave={() =>  onMouseLeave(val.dataCl) } onChange={e => setChangeFont(e, val.dataCl,val.dataState,dispatch,temp)} >
                {val.options.map(item => {
                    return <option selected={styleValue === item?true:false} key={uuid()} value={item}>{item}</option>
                })}
            </select>
        </div>
    )
}
export const SingleListReturn = () => {
    return <ShowMedia />
}
export const SingleRadioReturn = (props) => {
    const dispatch = useDispatch()
    const [curKey,setCurKey] = useState(null)
    const [curHeading,setCurHeading] = useState(null)
    const [isDisabledHeading,setIsDisabledHeading] = useState(false)
    const headingRef = useRef()
    const paraRef = useRef()
    const Records = useSelector(state=>state.setCustomSection)
    const [radioVal, setRadioVal] = useState('Heading Para')
    const radioElem = document.querySelector('#radio-btn-custom-section')
    const radioArr = radioElem?[...radioElem.getElementsByClassName('form-check-input')]:[]


    const RadioBtn = [{ name: 'Heading Para', id: 'HeadingPara' }, { name: 'Heading Subheading Para', id: 'HeadingSubheadingPara' }, { name: 'Heading List', id: 'HeadingList' }]

    const ParaInp=(props)=>{
        const {item ,call}= props.props
        return(
            <div>
            <div className='form-group form-group-nb custom-head-para-inpwrap' ><label className='label-nb'><p name='para' className='label-para-class'>{'Paragraph'} </p><textarea ref={paraRef} disabled={call === 'asRecord' ?true:false} name='para' defaultValue={call ==='asRecord'? item.vals[0][0].value:''} id={call ==='asRecord'? item.vals[0][0].key:''} className="inp-class-fd form-control"></textarea></label></div> 
            {call === 'asRecord'?'':<button onClick={() => addParaOnClickAdd()} className='btn btn-custom-add-section'>Add</button>}
            </div>
        )
    }    
    const ListInp = (props) => {
        const {showbtn,extraClass,disabled,defaultValueSubHead,defaultValueLevel,item}=props.props
        const vals=item.vals

        const ForRecord=()=>{
            return(
            vals.map((i,indx)=>{
                return (
                    <div id={String(indx)} className='record-sub-add-section'>
                    <div className={'form-group form-group-nb custom-head-para-inpwrap custom-add-section-list'+extraClass} >
                     <label className='label-nb'><p className='label-para-class'>{"Sub Heading Name"} </p><div className='label-nb-rc'><input disabled={disabled} className="inp-class-fd form-control" defaultValue={i[0].value} id={String(i[0].key)} name={'subheading'} type={'text'}></input></div></label>
                     <label className='label-nb'><p className='label-para-class'>{"Level"} </p><div className='label-nb-rc'><input disabled={disabled} className="inp-class-fd form-control" defaultValue={i[1].value} id={String(i[1].key)} name={'level'} type={'text'}></input></div></label>  
                    </div>
                    <div className='iconwrap-addsection-rc' onClick={()=>onClickSubRecordClose(item.key,String(indx))}><AiOutlineCloseCircle style={{height:'70%',width:'50%'}}/></div>
                    </div>
                )
            })
            )
        }
        const ForInp=()=>{
            return(
                <div className={'form-group form-group-nb custom-head-para-inpwrap custom-add-section-list'+extraClass} >
                <label className='label-nb'><p className='label-para-class'>{"Sub Heading Name"} </p><input disabled={disabled} className="inp-class-fd form-control" defaultValue={defaultValueSubHead} name={'subheading'} type={'text'}></input></label>
                <label className='label-nb'><p className='label-para-class'>{"Level"} </p><input disabled={disabled} className="inp-class-fd form-control" defaultValue={defaultValueLevel} name={'level'} type={'text'}></input></label>
                <small style={{width:'90%',marginLeft:'2%'}}id='kill-help-block' className='form-text text-muted'>level feild must contain a value lesser than or equal to 10 </small>
                {showbtn?<button onClick={() => onClickAddToSection()} className='btn btn-custom-add-section'>Add to List</button>:''}
            </div>
            )
        }
        return (
          showbtn === false?<ForRecord/>:<ForInp/>
        )
    }
    const SubHeadInp = (props) => {
        const {disabled,extraClass,defaultValueSubHead,defaultValuePara,showbtn,item} =props.props
        const vals = item.vals
        const ForRecord=()=>{
            return(vals.map((i,indx)=>{
                return (
                    <div key={uuid()} id={String(indx)} className='record-sub-add-section'>
                    <div className={'form-group form-group-nb custom-head-para-inpwrap custom-add-section-list'+extraClass} >
                        <div className='form-group form-group-nb custom-head-para-inpwrap' ><label className='label-nb'><p className='label-para-class'>{"Subheading"} </p><div className='label-nb-rc'><input disabled={disabled} className="inp-class-fd form-control" defaultValue={i[0].value} id={String(i[0].key)} name='subheading' type={'text'}></input></div></label></div>
                        <div className='form-group form-group-nb custom-head-para-inpwrap' ><label className='label-nb'><p name='para' className='label-para-class'>{'Paragraph'} </p><div className='label-nb-rc'><textarea disabled={disabled} defaultValue={i[1].value} id={String(i[1].key)} name='para' className="inp-class-fd form-control"></textarea></div></label></div>      
                    </div>
                    <div className='iconwrap-addsection-rc' onClick={()=>onClickSubRecordClose(item.key,String(indx))}><AiOutlineCloseCircle style={{height:'70%',width:'50%'}}/></div>
                    </div>
                    )
                })
            )
        }
        const ForInp=()=>{
            return(
                <div className={'form-group form-group-nb custom-head-para-inpwrap custom-add-section-list'+extraClass} >
                <div className='form-group form-group-nb custom-head-para-inpwrap' ><label className='label-nb'><p className='label-para-class'>{"Subheading"} </p><input disabled={disabled} className="inp-class-fd form-control" defaultValue={defaultValueSubHead} name='subheading' type={'text'}></input></label></div>
                <div className='form-group form-group-nb custom-head-para-inpwrap' ><label className='label-nb'><p name='para' className='label-para-class'>{'Paragraph'} </p><textarea disabled={disabled} defaultValue={defaultValuePara} name='para' className="inp-class-fd form-control"></textarea></label></div>
                {showbtn?<button className='btn btn-custom-add-section' onClick={() => onClickAddToSection()}>Add to section</button>:''}
            </div>
            )
        }

        return (
            showbtn === false?<ForRecord/>: <ForInp/>
            )
    }
    const setRadioBtnAttribute=(attrValue)=>{
        attrValue === true? radioArr.map(i=>i.setAttribute('disabled','true')):
        radioArr.map(i=>i.removeAttribute('disabled'))
    }

    const HeadingParaElement = (props) => {
        return (
            <div className='Wrapper-Heading-para'>
                <InpFormForAddSection props={{call:'asInput',item:''}}/>
                <div className='Wrapper-Heading-para-btn'>
                {radioVal !== 'Heading Para'? 
                <div className='btn-wrapper-subsection'>
                <button className='custom-btn-plus' onClick={onClickAdd}> Create New Section </button>
                </div>
                :''}
                </div>
            </div>
        )
    }
    const onClickAddToSection = async () => {

        const elem = document.querySelector('#SubheadListId')
        const allSubHeadPara = [...elem.querySelectorAll(['input', 'textarea'])]
        const result = []
        let valIsFalsy= false;
        if (isNull(headingRef.current.value)){
            headingRef.current.classList.add('error')
        }
        allSubHeadPara.map(i => {
            valIsFalsy = isNull(i.value)
            if(valIsFalsy === true){
                i.classList.add('error')
            }
            else{
                if(i.classList.contains('error')){i.classList.remove('error')}
                result.push({name:i.name,value:i.value,key:String('id'+uuid())})
            }
            if(i.name === 'level'){
               if (checkVal (i.value) === false){
                i.classList.add('error')
                valIsFalsy = true
            } }
        })
        
        if (valIsFalsy!==true){
        setRadioBtnAttribute(true)
        setIsDisabledHeading(true)
        if (curHeading === null || curHeading.length === 0){
            setCurHeading(headingRef.current.value)
        } 
        if (curKey === null ){ 
            const id = String('id'+uuid())
            setCurKey(id)
            const valH  = {heading:headingRef.current.value, type:radioVal,key:id,vals: [...[result]]}
            dispatch(addSectionAction(valH ))
            
        }
        else{
 
        let indxval ;
        Records.map((i,index)=>i.key === curKey? indxval = index:null)
        dispatch(updateSectionActionM({index: indxval, val:result}))
    }
}

    }
    const addParaOnClickAdd=()=>{
        let rt=false
       if(isNull(paraRef.current.value)){
           paraRef.current.classList.add('error')
           rt= true
       }
       if(isNull(headingRef.current.value)){
           headingRef.current.classList.add('error')
           rt=true  
       } 
       if (rt === true){return}
       const k = String('id'+uuid())
       const result =[{name:'para',value:paraRef.current.value,key:String('id'+uuid())}]
       const valH = {heading:headingRef.current.value, type:radioVal,key:k,vals: [...[result]]}
       dispatch(addSectionAction(valH))
       onClickAdd()
    }
    const onClickAdd = () => {
        setRadioBtnAttribute(false)
        setCurHeading(null)
        setCurKey(null)
        setIsDisabledHeading(false)

    }
    const OnClickRecordEdit=(ID)=>{
        const elem = [...document.getElementById(ID).querySelectorAll(['input','textarea'])]
        elem.map(i=>i.toggleAttribute('disabled'))


        Records.map(i=>{
            if(i.key === ID){
                setCurKey(i.key)
                setCurHeading(i.heading)
                setRadioVal(i.type)
                setRadioBtnAttribute(true)
                radioArr.map(radioBtn=>radioBtn.value===i.type?radioBtn.checked=true:'')          
            }
        })
    }
    const OnClickRecordSave=(ID)=>{
        const saveItem = document.getElementById(ID)
        const actualId = ID
        const InpText = [...saveItem.querySelectorAll(['input','textarea'])]
        let index;
        let inputsObject ={}
        let result = {}
        InpText.map(i=>{
            i.name === 'heading'?
            inputsObject['heading'] = i.value:
            inputsObject[i.id] =i.value;
        })
        
        Records.map((i,idx)=>{
            if( i.key === actualId){
                index = idx
                result['heading'] = inputsObject['heading']
                result['key'] = actualId
                result['type'] = i.type
                result['vals']= i.vals.map(elm=>{
                   return (elm.map(objelem=>{
                         return {'name':objelem.name,'value':inputsObject[objelem.key],'key':objelem.key}  
                   }))
                })  
            }   
         })
         dispatch(updateSectionRecordAction({index:index,value:result}))

    }
    const OnClickRecordDelete=(ID)=>{
        dispatch(removeSectionAction(ID))
        
        if(curKey === ID){
            setCurKey(null)
            setCurHeading(null)
            setRadioBtnAttribute(false)
        }

    }
    const onClickSubRecordClose=(mainID,numIndex)=>{
        let index;
        Records.map((i,indx)=>{
            if (i.key === mainID){
                    index = indx
                }
            })
        dispatch(removeSubSectionAction({key:mainID,index:numIndex}))

    }

    const InpFormForAddSection=(props)=>{
        const call = props.props.call
        const item = props.props.item
        let propsArr;
      
        if (call === 'asInput'){  
            propsArr={
                type:radioVal,myref : headingRef,defaultValueHeading : curHeading,disabled:false,headingID :'AddSectionHeading',subHeadListId:'SubheadListId',defaultValueSubHead:'',defaultValuePara:'',showbtn:true,defaultValueLevel:'',SectionId :'AddSection',extraClass:''
            }
        }
        else if(call === 'asRecord'){
            propsArr={
                type:item.type,myref : null,defaultValueHeading :item.heading,disabled:true,headingID :'',subHeadListId:null,defaultValueSubHead:'',defaultValuePara:'',showbtn:false,defaultValueLevel:'',SectionId:'',extraClass: 'remove-background-in-record reduce-size-in-record'
                }
        }
        return (
            <div className='Wrapper-Heading-para-input' id={propsArr.SectionId}>
           
            <div className='form-group form-group-nb custom-head-para-inpwrap' ><label className='label-nb '><p className='label-para-class'>{'Heading'} </p><input ref={propsArr.myref} disabled={call === 'asInput' ? isDisabledHeading:true} className="inp-class-fd form-control" defaultValue={propsArr.defaultValueHeading} id={call === 'asInput'? 'cshead':propsArr.headingID} name={'heading'} type={'text'}></input></label></div>
            {propsArr.type === 'Heading Para' ? <ParaInp props={{call: call,item:item}}/>:''}
            <div id={propsArr.subHeadListId} className={call === 'asRecord'? '':'SubheadList'}>
                {propsArr.type === 'Heading Subheading Para' ? <SubHeadInp props={{disabled:propsArr.disabled,defaultValueSubHead:propsArr.defaultValueSubHead,defaultValuePara:props.defaultValuePara,showbtn:propsArr.showbtn,extraClass:propsArr.extraClass,item:item}}/> : ''}
                {propsArr.type === 'Heading List' ? <ListInp props={{disabled:propsArr.disabled,defaultValueSubHead:propsArr.defaultValueSubHead,defaultValueLevel:props.defaultValueLevel,showbtn:propsArr.showbtn,extraClass:propsArr.extraClass,item:item}}/> : ''}
            </div>
        </div>
        )
    }
    const SingleRecord=(props)=>{
        const item = props.props.item
        const ID = String(item.key)
        return (
            <div className='single-record' id={ID}>
            <div className='record-strip-head-add-section'>
            <h4 className='record-section-heading'>{item.heading}</h4>
            <div className='icon-wrap-flex-adsection'>
            <div className='icon-wrap-add-section' onClick={()=>OnClickRecordEdit(ID)}><AiFillEdit style={{height:'100%',width:'100%'}}/></div>
            <div className='icon-wrap-add-section' onClick={()=>OnClickRecordSave(ID)}><AiFillSave style={{height:'100%',width:'100%'}}/></div>
            <div className='icon-wrap-add-section' onClick={()=>OnClickRecordDelete(ID)}><AiFillDelete style={{height:'100%',width:'100%'}}/></div>
            </div>
            </div>
            <InpFormForAddSection props={{call:'asRecord',item:item}}/>
                </div>
        )
    }
    return (
        <div className='add-custom-section-wrap'>
            {/* for Record */}
            <div id="record-rap-add-section">
            {Records.map(i=>{
                return <SingleRecord props={{item:i}}/>
            })}
            </div>
               {/* end record */}
            <div className='radio-custom-add-section-wrap' id='radio-btn-custom-section'>
                {RadioBtn.map(btn => {
                    return (
                        <div className='single-wrap-add-section' >
                            <input className="form-check-input" value={btn.name} type="radio" onClick={() => { setRadioVal(btn.name) }} id={btn.id} name="radioVal" defaultChecked={btn.name === radioVal?true:false}></input>
                            <label className="form-check-label custom-label-add-section" htmlFor={btn.id}>{btn.name}</label>
                        </div>
                        )

                })}
            </div>
            <div className='Add-section-inp-wrap'>
                <HeadingParaElement />
            </div>

        </div>
    )
}
export const SingleToggleViewReturn=(props)=>{
    const [btnContext,setBarContext ]= useContext(BarContext)
    const funcParam=(index)=>{
       if (props[0].name === 'ManageDisplayBar'){
           setBarContext(props[0].btnNames[index])
       }
    
    }
    return (
        <div className='add-custom-section-wrap'>
        <div className='Inner-Manage-view-wrap'>
            <label className='cf-input-label '>{props[0].label}</label>
            <div className="form-check display-form-check">
                {props[0].btnLabels.map((i,index)=>{
                   return(
                    <div key={props[0].name+String(index)}>
                        <input className="form-check-input" type="radio" name={props[0].name} id={props[0].id} onClick={()=>{props[0].onClickFunc[index](funcParam(index))}} defaultChecked={index === 0?true:false}/>
                        <label className="form-check-label" htmlFor={props[0].id}> {i} </label>
                    </div>
                   )})}
                </div>
            </div>
        </div>
    )
}
export const SingleGapReturn=(props)=>{
     const [gap, setgap] =useState(0)
     const setGapVal=(val)=>{
        const newAr = [...document.querySelectorAll('.grid-gap-id')]
        newAr.map(i=>{i.style.rowGap = String(val)+'rem'})
     }
     const onClickIncreament =()=>{
        setGapVal(gap+0.2)
        setgap(gap+0.2)
        
    }
     const onClickDecreament =()=>{
        setGapVal(gap-0.2)
       if (gap > 0.2){setgap(gap-0.2)}
        
    }
    return(
        <>
        <div className='cf-single-input-wrap'>
        <label  style={{display:'grid',gridTemplateColumns:'1fr 1fr',width:'90%',margin:'auto'}}>{props[0].label}
        <div className="input-group mb-3 gap-set-inp-wrap">

                    <div className="input-group-prepend">
                        <button onClick={() =>{onClickDecreament()}} className="btn btn-outline-secondary " type="button"  aria-haspopup="true" aria-expanded="false" >{'-'}</button>
                    </div> 
                    <input type="text" id={'grid-gap-val'} className="form-control" value={String(gap)+'rem'} aria-label="Text input with dropdown button" readOnly/>
                    <div className="input-group-prepend">
                        <button onClick={() =>{onClickIncreament()}} className="btn btn-outline-secondary " type="button"  aria-haspopup="true" aria-expanded="false" >{'+'}</button>
                    </div>      
                </div>
                </label>
        </div>
        </>
    )
}
export const SingleFontSize=(props)=>{
    const temp = useSelector(state=>state.setTemp.template)
    const valInt = parseFloat(useSelector(state=>state.setResumeStyle[temp].custom[props[0].dataState[0]][props[0].dataState[1]]).slice(0,-3))
    
    const dispatch = useDispatch()
    const onClickIncreament=async ()=>{
        const newFontVal = String(valInt+0.05)
        dispatch({type:'incFont',payload:{temp:temp,k1:props[0].dataState[0] ,k2:props[0].dataState[1], val:newFontVal+'rem'}})
        const dataClElem = [...document.querySelectorAll(props[0].dataCl)]
        dataClElem.map(i=>{
            i.style.fontSize= String(newFontVal)+'rem'
        })
    }
    const onClickDecreament=async ()=>{
        if(valInt > 0.2){
            const newFontVal = String(valInt-0.05)
            dispatch({type:'incFont',payload:{temp:temp,k1:props[0].dataState[0] ,k2:props[0].dataState[1], val:newFontVal+'rem'}})
            const dataClElem = [...document.querySelectorAll(props[0].dataCl)]
            dataClElem.map(i=>i.style.fontSize=String(newFontVal)+'rem')
    }
    }
    return(
        <>
        <div className='cf-single-input-wrap'>
        <label style={{display:'grid',gridTemplateColumns:'1fr 1fr',width:'90%',margin:'auto'}}>{props[0].label}
            <div className="input-group mb-3 gap-set-inp-wrap">

                <div className="input-group-prepend">
                    <button onClick={onClickDecreament} className="btn btn-outline-secondary " type="button"  aria-expanded="false" >{'-'}</button>
                </div> 
                <input type="text" id={'grid-gap-val'} className="form-control" value={String(valInt)+'rem'} aria-label="Text input with dropdown button" readOnly/>
                <div className="input-group-prepend">
                    <button onClick={onClickIncreament} className="btn btn-outline-secondary " type="button" aria-expanded="false" >{'+'}</button>
                </div>      
            </div>
        </label>
        </div>
        </>
    )
}
export const SingleImageReturn=(props)=>{
    const dispatch = useDispatch() 
    const [imgEvent, setImgEvent] = useState('')
    return(
        <div className='cf-single-input-wrap'>  
            <div className="input-group mb-3 gap-set-inp-wrap ">
                <label className='mobile-img-inp-wrap form-label'  >{"Add Image"}
                    <input type='file' id='formFile' className='form-control' onChange={(e)=>onChangeImage(e,dispatch,setImgEvent)}/>
                    <button className='btn btn-border' onClick={()=>onClickDeleteImg(setImgEvent,dispatch)}><AiFillDelete style={{height:'90%',width:'100%'}}/></button>
                </label>
            </div>
        </div>
    )
}
export const SingleButtonReturn=(props)=>{
    
    const dispatch = useDispatch()
    const temp=useSelector(state=>state.setTemp.template)
    const colorTheme  = {res1: '#021f1f', res2: 'rgb(69, 6, 69)', res3:'#ddd9cc',res4:'rgb(146, 128, 81)'}

    const handleRestore =()=>{
        colorChange({target:{value:colorTheme[temp]}})
        dispatch({type:'restore',payload:temp})
    }
    return (
        <label className='cf-input-label mobile-setting-label sp-retore-label'>Restore : 
        <button onClick={handleRestore} className='btn btn-restore-default'>{'Restore'}</button>
        </label>
    )
}
export const InputsWrap = (props) => {
  
    const settingVals = props[0]
    return (
        <div className='cf-input-wrap'>
            {settingVals.map(i => {
                if (i.type === 'select') {
                    return <SingleSelectReturn key={uuid()} {...i} />
                }
                else if (i.type === 'list') {
                    return <SingleListReturn key={uuid()}  {...[i]} />
                }
                else if (i.type === 'radio') {    
                    return <SingleRadioReturn key={uuid()}  {...[i]} />
                }
                else if(i.type === 'toggle'){
                    return <SingleToggleViewReturn key={uuid()}  {...[i]}  /> 
                             
                }
                else if(i.type==='gap'){
                    return <SingleGapReturn key={uuid()}  {...[i]}/>
                }
                else if(i.type === 'fontSize'){
                    return <SingleFontSize key={uuid()}  {...[i]}/>
                }
                else if(i.type === 'image'){
                    return <SingleImageReturn key={uuid()}  {...[i]}/>
                }
                else if(i.type === 'button'){
                    return <SingleButtonReturn key={uuid()}  {...[i]} />
                }
                else {
                    return <SingleInpReturn key={uuid()}  {...i} />
                }
            })}

        </div>
    )
}
const Settings = (props) => {
    const { settingHead, settingVals } = props[0]
    return (
        <div className='cf-setting-wrap'>
            <div className='cf-setting-heading-wrap'>
                <h4 className='custom-field-heading'>{settingHead}</h4>
            </div>
            <InputsWrap {...[settingVals]} />
        </div>
    )
}
const TabCustomFeild=(props)=>{
    const newArr = props.props.newArr
    return (
        <div className='custom-field-outer-wrap-grid'>
            <div className="custom-field-inner-wrap">
                <div className='custom-field-heading-wrap'>
                    <h2 className='custom-field-heading underline'>Customize Resume</h2>
                </div>
                <div className='custom-field-settings-wrap'>
                    {newArr.map(i => {
                        return <Settings key={uuid()} {...[i]} />
                    })}

                </div>
            </div>
        </div>
    )
}
const CustomField = () => {
    const template =useSelector(state=>state.setTemp)
    useEffect(() => {
        WebFont.load({
            google:{
                families:['Cinzel','Driod sans','Open Sans','Roboto Flex', 'Playfair Display', 'Nunito Sans', 'Josefin Sans', 'Libre Baskerville', 'Abel', 'Manrope', 'Cormorant Garamond', 'Jost', 'Nanum Myeongjo', 'Arima madurai','Cinzel Decorative']
            }
        })

    }, [])
    let newArr = getSettingsArray(template)
    return (
   
        <TabCustomFeild props={{newArr:newArr}} />
       
    )
}

export default CustomField