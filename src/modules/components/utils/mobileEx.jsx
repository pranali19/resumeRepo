import {useContext, useState} from 'react'
import {setSocialMedia,toggleDisplay,SingleButtonReturn,
      SingleImageReturn,  SingleFontSize,
      SingleSelectReturn,
      SingleInpReturn,
      SingleRadioReturn,
      dispatchDesignation} from '../CustomField'
import {addAdditionalField,gapData,listData,
  HeadingFontStyle, SubHeadingFontStyle, ParaFontStyle,
  HeadingFontSize, SubHeadingFontSize, MinorHeadingFontSize,
  MinorSubHeadingFontSize, ParagraphFontSize, colorSetting, barData,
} from './SettingArr'
import {IoMdArrowRoundBack} from 'react-icons/io'
import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import {MediaBtn} from './mobileCustomFeildutil'
import {deleteMediaAction} from './action'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {SingleToggleViewReturn,SingleGapReturn} from '../CustomField'
import DimensionContext from './dimensionContext'
import { GetMobileSettingsIcons } from './GetMediaIcons'

// fuctionl imports

const HasRecord = () => {
  const dispatch = useDispatch()
  const onPressClose = (key) => {
  dispatch(deleteMediaAction(key))
  }
  
  const stateMedia = useSelector(state=>state.setSocialMedia)
  return(
      <div className='custom-record-wrap'>
      {stateMedia.map(i => {
          return <div key={i.key} className='single-custom-record'><p>{i.value}</p><AiOutlineCloseCircle style={{ height: '90%', width: '90%' }} onClick={() => onPressClose(i.key)} /></div>
      })}
        </div>
  )
  }
const ShowFontSize=()=>{
  const curSelected= useContext(DimensionContext)[1]
  const sizeMap={ 
       'fs-head': HeadingFontSize,
       'fs-subhead': SubHeadingFontSize,
       'fs-minorHead':  MinorHeadingFontSize,
       'fs-minorsubhead':MinorSubHeadingFontSize,
       'fs-para': ParagraphFontSize,
}

  return(
    <div className='mobile-setting-Outer-wrap' key={uuid()} >
        {sizeMap[curSelected]?<SingleFontSize {...[sizeMap[curSelected]]} />:''}
    </div>
  )
}
const ShowColor=()=>{
  
  return(
    <div className='mobile-setting-Outer-wrap' key={uuid()} >
        <SingleInpReturn {...colorSetting} />
    </div>
  )
}
const ShowFontFamily=()=>{
  const curSelected= useContext(DimensionContext)[1]

  const sizeMap = {'fs-head': HeadingFontStyle,'fs-subhead':SubHeadingFontStyle,'fs-para':ParaFontStyle,'fs-minorHead': SubHeadingFontStyle,'fs-minorsubhead':SubHeadingFontStyle}

  return(
    <div className='mobile-setting-Outer-wrap' key={uuid()} >
       {sizeMap[curSelected]? <SingleSelectReturn {...sizeMap[curSelected]} />:''}
    </div>
  )
}
const  ShowCustomSection=()=>{
  return(
    <div className='mobile-setting-Outer-wrap' key={uuid()} >
        <SingleRadioReturn  />
    </div>  
   )
}
const  ShowBar=()=>{
 return(
  <div className='mobile-setting-Outer-wrap' key={uuid()} >
  <SingleToggleViewReturn {...[barData]} />
</div>  
 )
}
const ShowDesignation =()=>{
  const dispatch = useDispatch()
  return(
    <div className='mobile-setting-Outer-wrap'>
      <label className='cf-input-label mobile-setting-label'> 
          <span className='span-mb-setting'>Designation : </span>
            <input placeholder={'Your Designation Here'} id={'mb-designation'} name={'designation'} className='form-control'  type='text' onChange={(e) => { addAdditionalField(e, 'add-sub') }} onMouseLeave={(e)=>dispatchDesignation(dispatch,e.target.value)} />
      </label>
    </div>
  )
}
const useSetIconVal=(val)=>{
  const [iconVal, setIconVal] = useState(val)
  return [iconVal,setIconVal]

}
export const ShowMedia =()=>{
  const [iconVal,setIconVal] =useSetIconVal("Media")
  const dispatchMedia = useDispatch()
  const onPressIcon = (val, id) => {
      setIconVal(val)
      toggleDisplay(id)
  }
  const inpId ='id'+uuid();
  const IDBlock ='blockOption'

  return (
    <div className='mobile-setting-Outer-wrap' key={uuid()} >
    <div className='cf-single-input-wrap list-mobile-custom-rap' >
            <label className="cf-input-label mobile-setting-label sp-media-label" htmlFor={'list-btn-id'}>Media </label>
        <div id={'list-btn-id'}  className="input-group sp-inp-addMedia">
            <MediaBtn props={[IDBlock,onPressIcon,iconVal]}/>

            <input type="text" id={inpId} className="form-control" aria-label="Text input with dropdown button" />
            <button onClick={() => setSocialMedia(iconVal, inpId,dispatchMedia)} className="btn btn-outline-secondary " type="button" >{'Add'}</button>
        </div>
    </div> 
    <HasRecord />
</div>
  )
}
const ShowRestore =()=>{
  return (
      <div className='mobile-setting-Outer-wrap' key={uuid()} >
          <SingleButtonReturn />
      </div>
  )
}
const ShowImage =()=>{
  return(
    <div className='mobile-setting-Outer-wrap' key={uuid()} >
      <SingleImageReturn />
    </div>
  )
}
// const ShowlistFlow =()=>{
//   return(
//     <div className='mobile-setting-Outer-wrap' key={uuid()} >
//         <SingleToggleViewReturn {...[listData]} />
//     </div>
//   )
// }
const ShowManageSpace =()=>{
  return(
    <div className='mobile-setting-Outer-wrap' key={uuid()} >
      <SingleGapReturn {...[gapData]}/>
    </div>
    )
}
 
// font Specific
const fontSize = {label:'Font Size',iconText:'fontSize',display:ShowFontSize}
const color ={label:'Color',iconText:'color',display:ShowColor}
const fontFamily={label:'Font Style',iconText:'fontFamily',display:ShowFontFamily}
  // list Specific
const customSection={label:'Cutom Section',iconText:'plus',display:ShowCustomSection}
const bar ={label:'Bar',iconText:'bar',display:ShowBar}


const customTagLine={label:'Designation',iconText:'curlyBrace',display:ShowDesignation}
const addMedia ={label:'Social Media', iconText:'socialMedia',display:ShowMedia}
const restore={label:'Restore',iconText:'restore',display:ShowRestore}
const addImage = {label:'Add Image',iconText:'img',display:ShowImage}
const manageSpace = {label:'Manage Space',iconText:'space',display:ShowManageSpace}



const allSettings = {
      'fs-head':[ fontSize,  color, fontFamily],
      'fs-subhead':[fontSize,  color, fontFamily],
      'fs-minorsubhead':[fontSize,  color, fontFamily],
      'fs-minorHead':[fontSize,  color, fontFamily],
      'fs-para':[fontSize,  color, fontFamily,bar],
      'default':[customTagLine,
              customSection,
              color,
              addMedia,
              restore,
              addImage,
              manageSpace]

}
export const onClickHeading = (useDimension,curSelected)=>{
    if(useDimension.innerWidth <= 1200 && curSelected !== undefined){
          
    }  
    
}
const RenderSetting=(props)=>{
  const label = props.props
  switch(label){
    case('Designation'):
      return  <ShowDesignation />;
    case('Social Media'):
      return  <ShowMedia />;
    case('Restore'):
      return  <ShowRestore />;
    case('Add Image'):
      return  <ShowImage />;
    case('Manage Space'):
      return <ShowManageSpace />;
    case('Font Size'):
      return <ShowFontSize />;
    case('Color'):
      return <ShowColor />;
    case('Font Style'):
      return <ShowFontFamily />;
    case('Bar'):
      return <ShowBar />;
    case('Cutom Section'):
      return <ShowCustomSection />;
    default:
      return <></>;
  }
}
const DisplaySettingView=(props)=>{
  const [setWrapIsOpen,settingInWrap] = props.props
  const onClickBack =()=>{
    setWrapIsOpen(false)
  }
  return(
    <div className="setting-view-display-mb">
        <div className='back-btn-mobile-wrap'>
        <div className='btn btn-sp' onClick={onClickBack}><IoMdArrowRoundBack style={{height:'100%',width:'100%',color:'white'}} /></div>
        </div>
        <div className='setting-container-mobile'>
        <RenderSetting props={settingInWrap} />
        </div>
    </div>
  )
}
const onClickSetting=(wrapIsOpen,setWrapIsOpen,setSettingInWrap,label)=>{
    if(wrapIsOpen === false){
      setWrapIsOpen(!wrapIsOpen)
    }
    setSettingInWrap(label)
}

const MobileEx =()=>{
  const [wrapIsOpen,setWrapIsOpen] = useState(false)
  const [settingInWrap,setSettingInWrap] = useState('Restore')
  const curSelected= useContext(DimensionContext)[1]
  const arrayMobileSetting =allSettings[curSelected]?allSettings[curSelected]:allSettings['default']
    return(
      <div className="mobile-xp-wrapp">
      <div className='fixed-mobile-customize-view'>
      <div className='scrollable-wrap'>
        {arrayMobileSetting.map(i=>{ 
          return (
          <div className='one-bit-functionality' onClick={()=>onClickSetting(wrapIsOpen,setWrapIsOpen,setSettingInWrap,i.label)}>
            <div className="one-bit-inner-wrap">
            <div className='mobile-setting-icon-wrap'><GetMobileSettingsIcons props={i.iconText}/></div>
               <small className="label-set">{i.label}</small>
            </div>
          </div>
        )})}
          </div>
        </div>
      {wrapIsOpen?<DisplaySettingView props={[setWrapIsOpen,settingInWrap]}/>:''}
      </div>
    )
  }
export default MobileEx; 