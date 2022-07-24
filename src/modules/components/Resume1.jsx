import React,{useEffect,useContext} from "react";
import './resume css/resume1.css'
import {useSelector} from 'react-redux'
import GetIcon from "./utils/GetMediaIcons";
import {v4 as uuid} from 'uuid'
import {colorChange} from './utils/SettingArr'
import DimensionContext from './utils/dimensionContext'

import {getUpperCaseName,getRes} from './utils/resumeUtil'
import {HeadingPara,
        SubHeadlist,
        SubheadParaExperience,
        SubheadParaEducation,
        SectionSHpara,
        SectionPara,
        SectionSLpara} from './utils/Resume1Util'
import ColorContext from "./utils/ColorContext";



const NameContact =(props)=>{
    const {styles,designation} = props.props
    const [stateMedia ,statePersonal ] = useSelector(state=>[state.setSocialMedia, state.setResume.Personal])
    const res = getRes(statePersonal[0])
    let fulName = getUpperCaseName(res["First Name"]) + ' '+getUpperCaseName(res["Last Name"])
    
    return(
        statePersonal != undefined && statePersonal.length >0?
        <div className="resume-div-name-contact-hr-rs-one">
        <div className="resume-section-name-contact-rs-one">
            <div className="section-name-contact-part-name-rs-one">
                <h1 style={styles.Heading} className="section-name-heading-rs-one cl-theme fs-head">{fulName}</h1>
                <div className="group-flex-subhead-contact">
                <h5 style={styles.MinorHeading} className="section-name-subheading-rs-one cl-theme fs-minorHead add-sub">{designation?designation:'Your Designation'}</h5>
                <span className="vertival-line-contact cl-theme"></span>
                <div className="section-contact-wrap-rs-one add-social">
                  <div className="contact-item-rs-one"><p style={styles.Para} className="contact-item-para-rs-one cl-theme fs-para"> <GetIcon props={['Email','']} /> {' '+res['Email']}</p><div className="contact-item-icon-rs-one"></div></div>
                  <div className="contact-item-rs-one"><p style={styles.Para} className="contact-item-para-rs-one cl-theme fs-para"><GetIcon props={['Phone','']} />{" " +res['Phone Number']}</p><div className="contact-item-icon-rs-one"></div></div>
               
                        {stateMedia.map(i=>{
                            return <div key={uuid()} style={{height:'min-content'}} className="contact-item-rs-one"><p style={styles.Para} className='icon-resume cl-theme'><GetIcon props={[i.icon,'']} /></p><p className="contact-item-para-rs-one cl-theme fs-minorHead">{" "+i.value}</p><div className="contact-item-icon-rs-one"></div></div>
                        })}

                </div>
                </div>
            </div>
            <div className="section-name-contact-part-contact-rs-one">
               
            </div>
        </div>
    </div>:''
    )
}
const PersonalSummary=(props)=>{
    const styles = props.props.styles
    const statePersonal  = useSelector(state=> state.setResume.Summary)
    return(
            <HeadingPara {...[statePersonal,styles]}/>
        )
}

const Experience =(props)=>{ 
    const styles = props.props.styles
    const stateExperience = useSelector(state=>state.setResume.Experience)
    return(
        stateExperience != undefined && stateExperience.length != 0?<SubheadParaExperience props={{itemVal:stateExperience,name:'Experience',styles:styles}}/>:''
    )
}
const Education=(props)=>{
    const styles = props.props.styles
    const stateEducation = useSelector(state=>state.setResume.Education)
  return (
    stateEducation != undefined && stateEducation.length != 0?<SubheadParaEducation props={{itemVal:stateEducation,name:'Education',styles:styles}}/>:''   
  )
}
const CustomSection=(props)=>{
    const styles = props.props.styles
    const stateCustom = useSelector(state=>state.setCustomSection)
    const elem = document.querySelector('.fs-subhead')
    const computedStyleColor = elem?getComputedStyle(elem).color:'rgb(69, 6, 69)'
    
    const RenderCases =(props)=>{
        switch(props.type){
            case 'Heading Subheading Para':
                return <SectionSHpara {...[props,styles]}/>
            case 'Heading Para':
                return<SectionPara {...[props,styles]}/>
            case 'Heading List':
                return <SectionSLpara {...[props,styles,computedStyleColor]}/>
        }
        
    }


    const SingleSection=(props)=>{
        return(
            <div class="subgrid-flex-div-rs-one custom-grid-para">
                <div class="grid-other-res-one grid-item-one-rs">
                    <h2 style={{...styles.SubHeading,color:computedStyleColor}} class="grid-other-minor-head-rs-one cl-theme fs-subhead">{props.heading}</h2>
                    <RenderCases {...props}/>
                </div>
                <hr class="hr-line-rs-one cl-theme"/>
                </div>
        )}


    return(
        stateCustom != undefined && stateCustom.length != 0? 
        stateCustom.map(i=>{
            return <SingleSection {...i}/>
        })
        :''
    )
}
const Skills=(props)=>{
    const styles = props.props.styles
    const stateSkills = useSelector(state=>state.setResume.Skills)
    return(
        stateSkills != undefined && stateSkills.length != 0? <SubHeadlist props = {{itemArr:stateSkills,name:'Skills',styles:styles}}/>:''
    )
}


const Res1=()=>{
    const [temp, resumeStyle,designation]= useSelector(state=>[state.setTemp.template, state.setResumeStyle['res1'].custom,state.setDesignation])
    const colorThemes=  useContext(ColorContext)[0]    
    useEffect(()=>{
        colorChange({target:{
            value:colorThemes[temp]
        }})
    },[]) 
    return(
        <div className="resume-border-rs-one" id='resume'>
        <div className="resume-inner-wrap-rs-one grid-gap-id">
        <NameContact props={{styles:resumeStyle,designation:designation}} />
           <PersonalSummary props={{styles:resumeStyle}}/>
           <div className="grid-other-res-one grid-item-two-rs" id='Grid-Display-Id'>
              <div className="subgrid-item-1-two-rs subgrid-item-two-rs">
                  <Experience props={{styles:resumeStyle}}/>
              </div>
              <div className="vertival-line cl-theme"></div>
              <div className="subgrid-item-2-two-rs subgrid-item-two-rs">
                <Education props={{styles:resumeStyle}}/>
               <Skills props={{styles:resumeStyle}}/>
               <CustomSection props={{styles:resumeStyle}}/>
              </div>
           </div>
       </div>
        </div>
    )
}
export default Res1