import React, { useContext ,useEffect} from 'react';
import './resume css/resume2.css'
import {workSummary} from './utils/resumeUtil'
import parse from 'html-react-parser'

import {colorChange} from './utils/SettingArr'
import DimensionContext from './utils/dimensionContext'
import {v4 as uuid} from 'uuid'

import {Bar} from './utils/Bar'
import  {useSelector} from 'react-redux'
import {getSelectedState} from './utils/resumeUtil'

import {getUpperCaseName,getRes} from './utils/resumeUtil'
import GetIcon from './utils/GetMediaIcons';
import ColorContext from './utils/ColorContext';
const NameContact=(props)=>{
    const {statePersonal , styles,designation}  = props.props 
    
    const res =getRes(statePersonal[0])
    let fulName = (getUpperCaseName(res["First Name"]) + getUpperCaseName(res["Last Name"])).split(' ')
     const initials = getUpperCaseName(res["First Name"])[0] + getUpperCaseName(res["Last Name"])[0]
     
    return (
        statePersonal != undefined && statePersonal.length >0?
        <div className="resume-div-name-rs-two">
            <div className="resume-section-name-contact-rs-one">
                <div className="name-logo-wrap-rs-two">
                <div className="outer-wrap-logo-rs-two">
                    <div className="inner-wrap-logo-rs-two cl-theme"><h1 styles={styles.Heading} className="logo-initials-head-rs-two cl-theme trackForChangeColor">{initials}</h1></div>
                </div>
                <div className="section-name-part-name-rs-two">
                    <h1 style={styles.Heading} className="section-name-heading-rs-one cl-theme fs-head"><b  className="bold-fname-head-rs-two cl-theme">{getUpperCaseName(res["First Name"])}</b>{ " " +getUpperCaseName(res["Last Name"])}</h1>
                    <h5 style={styles.MinorHeading} className="section-name-subheading-rs-one cl-theme fs-subhead add-sub">{designation?designation:'Your Designation'}</h5>
                </div>
            </div>
            </div>
    </div>
   :''
    )
}

const Summary =(props)=>{
    const {elemVal , styles}  = props.props 
  
    return(
        elemVal != undefined && elemVal.length > 0?
            <div className="other-summary-wrap-rs-two">     
                <div className="para-wrapper-rs-two "><p style={styles.Para} className="other-para-rs-two fs-para"><b style={styles.SubHeading} className="other-minor-head-rs-two  cl-theme fs-subhead">{elemVal[0][0]['name'].toUpperCase()} </b> {elemVal[0][0]['val']}</p></div>
            <hr className="hr-line-rs-one" />
            </div>
        :''
    )
}

const Skills=(props)=>{
    const {elemVal , styles}  = props.props 
    const elem = document.querySelector('.fs-subhead')
    const computedStyleColor = elem?getComputedStyle(elem).color:'rgb(69, 6, 69)'
    return(
        elemVal != undefined && elemVal.length > 0?
            <div className="wrap-grid-item-rs-two">
                <p style={styles.SubHeading} className="other-minor-head-rs-two cl-theme fs-subhead">SKILLS</p>
                <div className="li-wrap-rs-two listDiplayClass">
                    {
                    elemVal.map(i=>{
                        return <li key={uuid()} style={styles.Para} className="other-contact-li-rs-two fs-para">{i[0].val}{i[1].val?<Bar props={{barVal:i[1].val,id:'id'+String(i[2].val),color:computedStyleColor}} />:''}</li> 
                    })
                    }
                </div>
            </div>
        :''   
        )
}

const Contact=(props)=>{
    const {elemVal , styles}  = props.props 
    const myIconStyle ={marginRight:'1%'}

    return(
        elemVal != undefined && elemVal.length >0?
            <div className="wrap-grid-item-rs-two rs-2-wg-mb">
                <p style={styles.SubHeading} className="other-minor-head-rs-two cl-theme fs-subhead">CONTACT</p>
                <div className="li-wrap-rs-two">
                    {elemVal[0].map(i=>
                    {
                        if(i.name == 'Phone Number' || i.name == 'Email'){
                            const tempNameVal = i.name =='Phone Number'?'Phone':i.name
                            return <p style={styles.Para} className="other-para-rs-two fs-para"><GetIcon props={[tempNameVal,myIconStyle]} />{' '}{i.val}</p>
                        }
                    })}
                </div>
            </div>
        :''
    )}

const SocialMedia=(props)=>{
    const {styles}=props.props
     const stateMedia = useSelector(state=>state.setSocialMedia)

    return(
        stateMedia.length > 0 ?
        <div class="wrap-grid-item-rs-two rs-2-wg-mb">
            <p style={styles.SubHeading} class="other-minor-head-rs-two cl-theme fs-subhead">SOCIAL MEDIA</p>
            <div class="li-wrap-rs-two add-social">
                    {stateMedia.map(i=>{
                        return <li key={uuid()} style={styles.Para} class="other-contact-sp-media fs-para other-para-rs-two"><div className='icon-rs-2 '><GetIcon props={[i.icon,'']} /></div>{i.value}</li>
                    })} 
            </div>
        </div>:''
    )
}
const Experience =(props)=>{
    const {elemVal , styles}  = props.props 
    const setCurSelected = useContext(DimensionContext)[2]
    const innerWidth = useContext(DimensionContext)[0]['innerWidth']
    
    return(
        <>
        {elemVal != undefined && elemVal.length >0? 
        <div className="wrap-grid-item-rs-two wrap-grid-item-rs-sp-two">
        <p style={styles.SubHeading} className="other-minor-head-rs-two cl-theme fs-subhead">EXPERIENCE</p>
        {elemVal.map((i,index)=>{
            let curvalArr=getRes(elemVal[index])

            return (
                <div key={uuid()} className="other-comp-wrap-rs-two">
                    <h4 style={styles.MinorHeading} className="other-macro-head-rs-two fs-minorhead">{curvalArr.Title } {curvalArr.Employer? ' at '+curvalArr.Employer:''}</h4>
                    {curvalArr.Title?<h5 style={styles.MinorSubHeading} className="other-mini-head-rs-two fs-para">{curvalArr['Project URL']?"Url: "+curvalArr['Project URL']:''}</h5>:''}

                    <h5 style={styles.MinorSubHeading} className="other-mini-head-rs-two fs-para">{"year :"+curvalArr['Start Date']+' - '+curvalArr['End Date']}</h5>
                <div onClick={()=>innerWidth < 1200 ?setCurSelected('fs-para'):''}  className="para-wrap-rs-two"><p style={styles.Para} className="other-para-rs-two fs-para">{parse(workSummary(curvalArr.Summary))}</p></div>
                </div>
            )
        
    })}
    </div>:''}
    </>
    )
}
const Education=(props)=>{
    const {elemVal , styles}  = props.props 
    
    return(
        <>
        {elemVal != undefined && elemVal.length >0?
        <div className="wrap-grid-item-rs-two">
            <h2 style={styles.SubHeading} className="other-minor-head-rs-two cl-theme fs-subhead">EDUCATION</h2>
                {
                elemVal.map((i,index)=>{
                    let eduArr=getRes(elemVal[index])
                    return(
                        <div key={uuid()} className="other-comp-wrap-rs-two">
                            <h4 style={styles.MinorSubHeading} className="other-macro-head-rs-two fs-minorsubhead">{eduArr['Course']}</h4>
                            {eduArr['Marks Obtained']?<h5 style={styles.Para} className="other-mini-head-rs-two fs-para">{'Aggregate: '+ eduArr['Marks Obtained']}</h5>:''}
                            <p style={styles.Para} className="para-rs-two fs-para">{'year '+eduArr['Start Date']+" - "+ eduArr['End Date']}</p>    
                        </div>
                    )
                })}
        

    </div>:''}
    </>
    )
}

export const CustomSection=(props)=>{
    const stateCustom = useSelector(state=>state.setCustomSection)
    const styles = props.props.styles
    const elem = document.querySelector('.fs-subhead')
    const computedStyleColor = elem?getComputedStyle(elem).color:'rgb(69, 6, 69)'

    const RenderCases =(props)=>{
        switch(props.type){
            case 'Heading Subheading Para':
                return <SectionSHpara {...props}/>
            case 'Heading Para':
                return<SectionPara {...props}/>
            case 'Heading List':
                return <SectionSLpara {...props}/>
        }
    }
    
    const SectionSHpara=(props)=>{     
        return(
            props.vals.map(val=> {
                return(
                <div key={uuid()} className="others-one-minor-div-section-rs-one">
                    <h5 style={styles.MinorHeading} className="other-macro-head-rs-two fs-minorhead">{val[0].value}</h5>
                    <div style={styles.Para} className="para-wrapper-rs-two"><p className="other-para-rs-two fs-para">{val[1].value} </p></div>
                </div>
            )})
        ) 
    }
    const SectionPara=(props)=>{      
        return(
            props.vals.map(val=> {
                return(
                <div key={uuid()} className="other-summary-wrap-rs-two">
                    <div className="para-rapper-rs-one fs-para"><p style={styles.Para} className="other-para-rs-two fs-para">{val[0].value} </p></div>
                </div>
            )
            })
        )
    }
    const SectionSLpara=(props)=>{    
        return(
            props.vals.map(val=> {
                return(
                    <div key={uuid()} className="li-wrap-rs-two add-social">
                        <li style={styles.Para} className="other-contact-li-rs-two fs-para "><p className="list-para">{val[0].value}</p><Bar props={{barVal:val[1].value,color:computedStyleColor}} /></li> 
                    </div>
                    )
                })
            )
        }
    const SingleSection=(props)=>{  
        return(
            <div className="subgrid-flex-div-rs-one wrap-grid-item-rs-two rs-2-wg-mb custom-grid-para">
                <div className="grid-other-res-one grid-item-one-rs">
                    <p style={{...styles.SubHeading,color:computedStyleColor}} className="other-minor-head-rs-two cl-theme fs-subhead">{props.heading.toUpperCase()}</p>
                    <RenderCases {...props}/>
                </div>
            </div>
        )
    }

    return(
        <>     
        {stateCustom != undefined && stateCustom.length != 0?
            stateCustom.map(i=>{
                return <SingleSection key={uuid()} {...i}/>
            })
            :''
        }
        </>
    )
}

 const Res2 =()=>{
    const [temp,Resume,designation] = useSelector(state=>[state.setTemp.template,state.setResume,state.setDesignation])
    const styles = useSelector(state=>state.setResumeStyle[temp].custom)
    const colorThemes=  useContext(ColorContext)[0]    
    useEffect(()=>{
        colorChange({target:{
            value:colorThemes[temp]
        }})
    })
    return (
        <div id='resume' class="resume-border-rs-two">
            <div class="resume-inner-wrap-rs-two grid-gap-id">

                <NameContact props={{statePersonal:Resume.Personal,styles:styles,designation:designation}}/>
                <Summary props={{elemVal:Resume.Summary,styles:styles}}/>

            <div class="grid-other-wrapper-rs-two">
            <div class="other-grid-item-1-rs-two">

                <Skills props={{elemVal:Resume.Skills,styles:styles}}/>
                <Contact props={{elemVal:Resume.Personal,styles:styles}}/>
                <SocialMedia props={{styles:styles}}/>
                <CustomSection props={{styles:styles}}/>

            </div>
            <div class="other-grid-item-2-rs-two">

                <Experience props={{elemVal:Resume.Experience,styles:styles}}/>
                <Education  props={{elemVal:Resume.Education,styles:styles}}/>

            </div>
        </div>
    </div>
 </div>
    )
}
export default Res2;