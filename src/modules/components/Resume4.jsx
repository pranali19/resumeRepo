import React, { useContext, useEffect } from 'react';
import './resume css/resume4.css'
import {workSummary} from './utils/resumeUtil'
import parse from 'html-react-parser'
import GetIcon from './utils/GetMediaIcons';
import DimensionContext from './utils/dimensionContext';

import {v4 as uuid} from 'uuid'

import {colorChange} from './utils/SettingArr'

import {getRes} from './utils/resumeUtil'

import {Bar} from  './utils/Bar'
import { useSelector } from 'react-redux';
import ColorContext from './utils/ColorContext';

const Name=(props)=>{
    const {statePersonal,styles,designation }  = props.props

    const res =getRes(statePersonal[0])
    return(
        statePersonal != undefined && statePersonal.length >0?
            <div className="name-wrap-rs4">
                <div style={{display:'flex',height:'fit-content',width:'100%',flexDirection:'row'}}>
                <h1 style={styles.Heading} className="name-heading-rs4 cl-name fs-head cl-theme">{String(res["First Name"]).toUpperCase()}</h1>
                <h1 style={styles.Heading} className="name-heading-rs4 fs-head">{String(res["Last Name"]).toUpperCase()}</h1>
                </div>
                <h3 style={styles.MinorHeading} className="subheading-name-rs4 add-sub fs-minorsubhead">{designation? designation:'Your Designation'}</h3>
            </div>
    :''
    )
}
const Image = (props)=>{
    const img = useSelector(state=>state.setImage.image)
    const elem = document.querySelector('.bar')
    const elemVal = props.props.elemVal[0]
    const initials =elemVal?(elemVal[0].val[0]+elemVal[1].val[0]).toUpperCase():''
    const computedStyleColor = elem?getComputedStyle(elem).backgroundColor:'rgb(146, 128, 81)'
 
    return(
        <>{
        img != ''?
        <div className="resume-img-wrap-rs4">
            <img className="img-rs4" src={img} alt="img" />
        </div>
        :elemVal?
        <div className='resume-img-wrap-rs4'>
            <div style={{backgroundColor:computedStyleColor}} className='rs4-initials-wrap cl-theme'><h1 className='initials-rs4 cl-theme trackForChangeColor'>{initials}</h1></div>
        </div>
        :''}
      
   </>
    )
}
const Summary=(props)=>{
    const {elemVal, styles }= props.props 
    return(

        elemVal != undefined && elemVal.length >0  ?
        <div className="resume-comp-rs4">
            <h3 style={styles.SubHeading} className="subheading-rs4 brColor cl-theme fs-subhead">SUMMARY</h3>
            <p style={styles.Para}  className="para-rs4 summary-para-rs4 fs-para">  {elemVal[0][0].val}</p>
        </div>

       :''
    )
}
const Experience =(props)=>{
    const {elemVal, styles }= props.props 
    const setCurSelected = useContext(DimensionContext)[2]
    const innerWidth = useContext(DimensionContext)[0]['innerWidth']

    return(
        elemVal !=undefined && elemVal.length >0? 
        <div className="resume-comp-rs4">
        <h3 style={styles.SubHeading} className="subheading-rs4 brColor cl-theme fs-subhead">EXPERIENCE</h3>
        <div className="comp-wrap-rs4">

                { elemVal.map((i,index)=>{
                let expArray = getRes(elemVal[index])

                return(
                    <div key={uuid()} className="single-block-rs4">
                            <h5  style={styles.MinorHeading} className="major-head-rs4 fs-minorhead">{expArray.head}</h5>
                            {expArray.head=="Project"?<h6 className="minor-heading-rs4 res4-tEx fs-minorsubhead">{expArray["Project URL"]?"Url: "+expArray["Project URL"] :''}</h6>:''}

                            <div className="company-name-date-wrap">
                            {expArray.Employer?<h6  style={styles.MinorSubHeading}  className="minor-heading-rs4 res4-CNex fs-minorsubhead">{expArray.Employer}</h6>:''}
                            <h6 className="minor-heading-rs4 res4-tEx fs-minorsubhead">{expArray['Start Date']+'-' + expArray['End Date'] }</h6></div>
                            <p onClick={()=>innerWidth < 1200 ?setCurSelected('fs-para'):""}  style={styles.Para}   className='para-rs4 exp-para fs-para'>{parse(workSummary(expArray.Summary))}</p>
                        </div>
                    )}
                    
                )}     
            </div>
        </div>
        :''
    )
}
const Education=(props)=>{
    const {elemVal, styles }= props.props 

    return(
        elemVal != undefined && elemVal.length >0?
        <div className="resume-comp-rs4">
        <h3 style={styles.SubHeading} className="subheading-rs4 cl-theme brColor fs-subhead">EDUCATION</h3>
        <div className="comp-wrap-rs4">
        { elemVal.map((i,index)=>{
                    let eduArray = getRes(elemVal[index])
                    return(
                        <div key={uuid()} className="single-block-rs4">
                            <h5 style={styles.MinorSubHeading} className="minor-head-rs4 fs-minorsubhead">{eduArray.Course}</h5>
                            <p style={styles.Para} className="para-rs4 fs-para">{eduArray['School Name']}</p>
                            <p style={styles.Para} className='para-rs4 fs-para'>{eduArray['Start Date'] +' - '+eduArray['End Date']}</p>
                        </div>
                    )})}
        </div>
    </div>
        :''
    )
}
const Skills=(props)=>{
    const {elemVal, styles }= props.props 
    const elem = document.querySelector('.bar')
    const computedStyleColor = elem?getComputedStyle(elem).backgroundColor:'rgb(146, 128, 81)'
 
    return(
        elemVal != undefined && elemVal.length >0?
        <div className="resume-comp-rs4 ">
            <h3 style={styles.SubHeading} className="subheading-rs4 brColor cl-theme fs-subhead">EXPERTISE</h3>
            <div className="listclass-rs4">
                {elemVal.map(i=>{
                    return(
                        <div className="skill-li-wrap" key={'id'+i[2].val}>
                        <li style={styles.Para} className="li-rs4 fs-para">{i[0].val} <Bar props={{barVal:i[1].val,color:computedStyleColor}} /> </li>
                        </div>
                        )
                    }) }
            </div>
        </div>  
    :''
    )
}
const Contact=(props)=>{
    const {elemVal, styles }= props.props 
    const stateMedia = useSelector(state=>state.setSocialMedia)
    const myIconStyle = {height:'18px',width:'18px',margin:'auto',color:'inherit'}

    return(
         elemVal != undefined && elemVal.length >0?
         <div className="resume-comp-rs4 ">
         <h3 style={styles.SubHeading} className="subheading-rs4 cl-theme brColor fs-subhead">CONTACT</h3>
         <div className="listclass-rs4">
         {elemVal[0].map(i=>i.name == 'Phone Number' ?<div className="contact-li-wrap">
            <li style={styles.Para} className="li-contact-rs4 fs-para"><div className='icon-wrapper-r4 trackForChangeColor cl-theme'><GetIcon  props={['Phone',myIconStyle]} /></div>{i.val}</li></div>:i.name== 'Email'? <div className="contact-li-wrap">
            
            <li style={styles.Para} className="li-contact-rs4 fs-para"><div className='icon-wrapper-r4 trackForChangeColor cl-theme'><GetIcon props={['Email',myIconStyle]} /></div>{i.val}</li></div>: '' )}
         {stateMedia.length > 0?
            stateMedia.map(i=>{
                return <div className="contact-li-wrap"> <li style={styles.Para} className="li-contact-rs4 fs-para"><div className='icon-wrapper-r4 trackForChangeColor cl-theme'><GetIcon props={[i.icon,myIconStyle]} /></div>{"  "}<p className='contact-p'>{i.value}</p></li></div>
             }):
         ''}
         </div> 
     </div>
        :''
    )
}

const CustomFeild=(props)=>{
    const styles = props.props.styles
    const stateCustom = useSelector(state=>state.setCustomSection)
    const elem = document.querySelector('.bar')
    const computedStyleColor = elem?getComputedStyle(elem).backgroundColor:'rgb(146, 128, 81)'

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
            <>
            {props.vals.map(val=> {
            return(
            <div key={uuid()} className="comp-wrap-rs4"> 

                <h5 style ={styles.MinorHeading} className="major-head-rs4 fs-minorHead">{val[0].value}</h5>
                <div className='CutomparaWrapper-rs4'><p style ={styles.Para} className="para-rs4 fs-para">{val[1].value} </p></div>
            </div>
            )})}
     </>
     ) 
    }
    const SectionPara=(props)=>{
        return(
            <>
             {props.vals.map(val=> <div key={uuid()} className='CutomparaWrapper-rs4'><p style={styles.Para} className="para-rs4 fs-para">{val[0].value} </p></div> )}
            </>
        )
    }
    const SectionSLpara=(props)=>{
        return(
            <div className='comp-wrap-rs4'>
                { props.vals.map(val=> {
                    return(
                        
                        <div className="skill-li-wrap" key={'id'+val[0].value}>
                             <li style={styles.Para} className="li-rs4 fs-para">{val[0].value} <Bar props={{barVal:val[1].value,color:computedStyleColor}} /> </li>
                        </div>
                        
                    )})
                }
            </div>
        )
    }
    const SingleSection=(props)=>{  
        return(
            <div className="resume-comp-rs4">
            <h2 style={{...styles.SubHeading,color:computedStyleColor,borderColor:computedStyleColor}} className="subheading-rs4 brColor cl-theme fs-subhead">{props.heading.toUpperCase()}</h2>
                <RenderCases {...props}/>
                </div>
        )
    }

    return(
       <>
        {stateCustom != undefined && stateCustom.length != 0? 
        
            stateCustom.map(i=>
                {return <SingleSection key={uuid()} {...i}/>})
            :''
        }
       </>

    )
}

const Res4=()=>{
    const [temp,Resume,designation] = useSelector(state=>[state.setTemp.template,state.setResume,state.setDesignation])
    const styles = useSelector(state=>state.setResumeStyle[temp].custom)
    const colorThemes=  useContext(ColorContext)[0]    
    useEffect(()=>{
        colorChange({target:{
            value:colorThemes[temp]
        }})
    },[])

    return(
        <div id='resume' className="resume-border-rs-four">

            {/* <!-- side 1 --> */}
            <div className="resume-inner-wrap-rs-four">
            <div className="resume-main-flex-1-rs4 cl-theme brColor">
                <div className="resume-main-flex-1-inner-wrap">
                          {/* <!-- Image --> */}
                   <Image props={{elemVal:Resume.Personal}}/>
                    {/* <!-- /Image --> */}
                    {/* <!-- Contact --> */}
                    <Contact props={{elemVal:Resume.Personal ,styles:styles}}/>
                    {/* <!--/Contact  --> */}
                    {/* <!--  Education --> */}
                    <Education props={{elemVal:Resume.Education ,styles:styles}} />
                    {/* <!-- /Education --> */}
                    {/* <!-- Expertise --> */}
                   <Skills props={{elemVal:Resume.Skills ,styles:styles}} />

                    {/* <!-- /Expertise --> */}
                </div>
            {/* </div>  */}
            {/* <!-- /side 1 --> */}
            {/* <!-- side 2 --> */}

        </div>
        <div className="resume-main-flex-2-rs4">
                    {/* <!-- name --> */}
                        <Name props={{statePersonal:Resume.Personal,styles:styles,temp:temp,designation:designation}}/>
                    {/* <!-- /name --> */}
                    {/* <!-- summary --> */}
                        <Summary props={{elemVal:Resume.Summary,styles:styles}} />
                    {/* <!-- /summary --> */}
                    {/* <!-- experience --> */}
                        <Experience props={{elemVal:Resume.Experience ,styles:styles}}/>
                    {/* <!-- /experience --> */}
                    <CustomFeild props={{styles:styles}}/>
                </div>
        </div>
        </div>

    )
}

export default Res4; 