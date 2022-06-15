import React, {  useEffect, useRef, useState } from 'react';
import './temp.css';
import CustomField,{onMouseIn as mouseAddBorder,onMouseLeave as mouseRemoveBorder } from './components/CustomField'
import ResumeView from './components/ResumeView'
import {Resume} from './components/ResumeView';
import {handleClickPrintPdf} from './components/ResumeView'
import BarContext from './components/utils/BarContext'
import DimensionContext  from './components/utils/dimensionContext'

import Modal from './components/utils/modal'
import MobileEx from './components/utils/mobileEx';
import { useSelector } from 'react-redux';

const ResumeCheck =(props)=>{
    const scaleWrapperRef = useRef()
    const [innerWidth,modalState,setIsModalState,onClickPrev]= props.props
    return(
       <>
       
       {innerWidth >= 1200 ? <ResumeView props={[modalState,setIsModalState]} />:
       <div ref={scaleWrapperRef} className='scaleWrapper'>
       <div  className='scaledResume scale-rs-onclk'>
            <Resume />       
            <div style={{width:'100%',display:'flex',flexDirection:'row',height:'10%'}}>
                <NextBtn  props={onClickPrev} />
                <div className='btn-wrap-form btn-3-temp'>
                <button onClick={()=>handleClickPrintPdf(modalState,setIsModalState,true,scaleWrapperRef)} style={{width:'50%' ,marginLeft:'auto',marginRight:'auto'}} className="btn btn-success">download</button></div>
                 
                 
            </div> 
            <div style={{height:'20vh',width:'100%',}}/>    
       </div>
        </div>
       
     
       }
       {modalState?<Modal props={[modalState,setIsModalState]} />:<></>}
        </>
   )
}
const NextBtn =(props)=>{
  const onClickPrev =props.props
  return(
    <div className='btn-wrap-form btn-3-temp'>
        <button type="button" className='btn-form btn btn-sp-3'  name="prev" onClick={ onClickPrev}>prev</button>
    </div>
  )
}   
const allDataCl = ['.fs-head','.fs-subhead','.fs-minorsubhead','.fs-minorhead','.fs-para']     
export const removeBorderUseEff=()=>{
  [...document.querySelector('#resume').querySelectorAll(allDataCl)].map(i=>i?i.classList.remove('Border'):'')

}

const ViewCustomize =(props)=>{
    const [dimensions, setDimensions] =useState({innerHeight: parseInt(window.innerHeight),innerWidth: parseInt(window.innerWidth)})
    const [btnType , setBtnType] = useState('simple-bar')
    const [modalState,setIsModalState] = useState(false)
    const [curSelected , setCurSelected] = useState('default')
    const [prevSelected , setprevSelected] = useState(null)

    // const themes = {res1:'#065151',res2:'rgb(69, 6, 69)',res3:'#696761',res4:'rgb(146, 128, 81)'}
    // const [colorThemes, setColorThemes] = useState(themes)

    const elem = document.querySelector('#resume')
  const [isDesktop,setIsDesktop] = useState(true)

  


  useEffect(()=>{
    if(!isDesktop){
    if(elem){
      elem.addEventListener('click',handleCurSelected)
      if(curSelected){mouseAddBorder( "."+curSelected)}
      if(prevSelected){mouseRemoveBorder("."+prevSelected )}
    
    return()=>elem.removeEventListener('click',handleCurSelected)
    
    }}
  },[curSelected,isDesktop])
  useEffect(()=>{
    if(dimensions.innerWidth > 1200){
      if(elem){
        removeBorderUseEff()
      }
      else{
          if(!isDesktop){
            setIsDesktop(true)
          }
    }
  }
  else if(dimensions.innerWidth < 1200){
      if(isDesktop){setIsDesktop(false)}
    }
  },[dimensions])
  useEffect(()=>{
        window.addEventListener('resize',handleResize)
        return ()=>window.removeEventListener('resize',handleResize)      
    },[])


    const handleResize=()=>{
        const {innerWidth, innerHeight} = window;
 
        setDimensions({innerHeight:parseInt(innerHeight),innerWidth:parseInt(innerWidth)})
    }

    const handleCurSelected=(e)=>{
          const classList = e.target.classList
          const prev = curSelected
          setprevSelected(prev)
            if(classList.contains('fs-head')){setCurSelected('fs-head')}
              else if(classList.contains('fs-subhead')){setCurSelected('fs-subhead')}
              else if(classList.contains('fs-minorsubhead')){setCurSelected('fs-minorsubhead')}
              else if(classList.contains('fs-minorhead')){setCurSelected('fs-minorhead')}
              else if(classList.contains('fs-para')){setCurSelected('fs-para')}
              else{ setCurSelected('default') }
              
    }

    const { onClickPrev}= props.props
            
            return (  
                <BarContext.Provider value={[btnType , setBtnType]}>
                    <DimensionContext.Provider value={[dimensions,curSelected,setCurSelected]}>
                <div className='main-grid-wrap-custom-view' id='resumeWrapId'>             
                    {dimensions.innerWidth >= 1200 ? 
                    <div style={{height:'auto'}}>
                        <CustomField />
                    </div>
                    :''}
                    <ResumeCheck props={[dimensions.innerWidth,modalState,setIsModalState,onClickPrev]}/>
                     {dimensions.innerWidth < 1200?'':<NextBtn props={onClickPrev} />}
                    {dimensions.innerWidth < 1200 ?<MobileEx />:''}
                    </div>
                    </DimensionContext.Provider>
                    </BarContext.Provider>
            )
}
    
    export default ViewCustomize