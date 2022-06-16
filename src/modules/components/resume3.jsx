import React, { useContext,useEffect } from 'react';
import './resume css/resume3.css'
import {workSummary} from './utils/resumeUtil'
import parse from 'html-react-parser'
// import {onMouseIn as mouseClickBorder} from './CustomField'
import {getUpperCaseName,getRes} from './utils/resumeUtil'
import tinycolor from 'tinycolor2';
import {Bar} from  './utils/Bar'
import {v4 as uuid} from 'uuid'
import {colorChange} from './utils/SettingArr'


import { useSelector } from 'react-redux';
import GetIcon from './utils/GetMediaIcons';
import DimensionContext from './utils/dimensionContext';
import {onClickHeading} from './utils/mobileEx'
import ColorContext from './utils/ColorContext';

const Name=(props)=>{
    const [statePersonal,styles,designation]  = props.props
    
    const res =getRes(statePersonal[0])
    let fulName = getUpperCaseName(String(res["First Name"])) + ' '+getUpperCaseName(String(res["Last Name"]))
    
    return(
        statePersonal != undefined && statePersonal.length >0?
        <div className="name-title-section-rs-three cl-theme">
            <div className="name-title-div-rs-three">
                <div className="name-title-wrap-rs-three ">
                    <h1 style={styles.Heading} className="name-head-rs-three fs-head cl-theme trackForChangeColor">{fulName}</h1>
                    <h4 style={styles.MinorHeading} className="title-h4-rs-three fs-minorhead add-sub cl-theme trackForChangeColor"> {designation?designation:"Your Designation Here"} </h4>
                </div>
            </div>
        </div>
    :''
    )
}
const Image = (props)=>{
    const img = useSelector(state=>state.setImage.image)
    const elem =document.querySelector('#rs-3-grid')
    if(img == '' && elem != null){elem.style.top ='0%'}
    else if (img != '' && elem != null){elem.style.top = '-13%'}
    return(
        <>{
        img != ''?
        <div class="wrap-for-image-rs-three cl-theme">
            <div class="inner-wrap-image-rs-three">
                <img src={img} class="img-profile-rs-three" />
            </div>
        </div>
        :''}
      
   </>
    )
}
const Summary=(props)=>{
    const {elemVal, styles }= props.props 
    return(

        elemVal != undefined && elemVal.length >0  ?
            <div className="para-wrap-rs-three">
                <p style={styles.Para} className="para-rs-three fs-para">
                    {elemVal[0][0].val}
                </p>
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
        <div className="comp-div-wrap-rs-three">

            <h2 style={styles.SubHeading} className="comp-minor-heading-rs-three useDarken cl-theme fs-subhead">Experience</h2>

                { elemVal.map((i,index)=>{
                let expArray = getRes(elemVal[index])

                return(
                    <div className="comp-div-rs-three" key={uuid()}>
                        <h4 style={styles.MinorHeading} className="marco-head-rs-three fs-minorHead">{expArray.head}</h4>
                        <h5 style={styles.MinorSubHeading} className='sp-head-rs-three fs-minorsubhead'>{expArray.Title +' | '} { expArray.Employer?expArray.Employer:''}</h5>
                        {expArray.head == "Project"?<h6 style={styles.Para} className="mini-head-rs-three fs-para ">{expArray['Project URL']?"Url: "+expArray['Project URL']:''} </h6>:''}
                        <h6 style={styles.Para} className="mini-head-rs-three fs-para ">{expArray['Start Date']+'-' + expArray['End Date'] } </h6>
                        <p onClick={()=>innerWidth < 1200 ?setCurSelected('fs-para'):''}  style={styles.Para} className="para-rs-three fs-para">{parse(workSummary(expArray.Summary))}</p>
                    </div>
                    )}
                    
                )}     
            </div>
        :''
    )
}
const Education=(props)=>{
    const {elemVal, styles }= props.props 

    return(
        elemVal != undefined && elemVal.length >0?
        <div className="grid-comp-height-wrap-rs-three">
            <div className="comp-div-wrap-rs-three">

                <h2 style={styles.SubHeading} className="comp-minor-heading-rs-three useDarken cl-theme fs-subhead">Education</h2>

                { elemVal.map((i,index)=>{
                    let eduArray = getRes(elemVal[index])
                    
                    return(
                    <div className="comp-div-rs-three my-1" key={uuid()}>
                        <h4 style={styles.MinorSubHeading} className="sp-head-rs-three fs-minorsubhead">{eduArray.Course + ' ('+ eduArray['Start Date'] +' - '+eduArray['End Date'] +') '}</h4>
                        <p style={styles.Para} className="para-rs-three fs-para">{eduArray['School Name']}</p>
                        {eduArray['Marks Obtained']?<p style={styles.Para} className="para-rs-three fs-para">{'Aggregate: '+eduArray['Marks Obtained']}</p>:''}
                    </div>
                    )

                    })
                }
             
            </div>
        </div>
        :''
    )
}
const Skills=(props)=>{
    const {elemVal, styles }= props.props 
    const elem = document.querySelector('.bar')
    const computedStyleColor = elem?getComputedStyle(elem).backgroundColor:'rgba(67, 65, 65, 0.568)'
 
    return(
        elemVal != undefined && elemVal.length >0?
        <div className="grid-comp-height-wrap-rs-three">
            <div className="comp-div-wrap-rs-three">
                <h2 style={styles.SubHeading} className="comp-minor-heading-rs-three useDarken cl-theme fs-subhead">Skills</h2>
                <div className="comp-div-rs-three listDiplayClass">

                {elemVal.map(i=>{
                    return(
                        <div className="skill-bar-name-rs-three" key={'id'+i[2].val}>
                            <li style={styles.Para} className="li-rs-three fs-para">{i[0].val} <Bar props={{barVal:i[1].val,color:computedStyleColor}} /></li>
                        </div>
                        )
                    })
                }

                </div>
            </div>  
        </div>
    :''
    )
}
const Contact=(props)=>{
    const {elemVal, styles }= props.props 
    const stateMedia = useSelector(state=>state.setSocialMedia)


    return(
         elemVal != undefined && elemVal.length >0?
            <div className="grid-comp-height-wrap-rs-three">
                <div className="comp-div-wrap-rs-three">
                    <div className="minor-head-wrap-rs-three cl-theme trackForChangeColor fs-subhead"><h2 style={styles.SubHeading} className="comp-minor-heading-rs-three fs-subhead cl-theme trackForChangeColor">Contact</h2></div>
                    <div className="comp-div-rs-three">
                    {elemVal[0].map(i=>
                    i.name == 'Email'?<li style={styles.Para} className="li-rs-three-sp-media para-rs-three fs-para"><div style={{marginTop:'auto',marginBottom:'auto'}}><GetIcon props={['Email',]} /></div>{" "+i.val}</li>:
                    i.name== 'Phone Number'?<li style={styles.Para} className="li-rs-three-sp-media para-rs-three fs-para"><div style={{marginTop:'auto',marginBottom:'auto'}}><GetIcon props={['Phone',]} /></div>{" "+i.val}</li> : '' )}
                    {stateMedia.map(i=>{
                return <li style={styles.Para} className="li-rs-three-sp-media para-rs-three fs-para" key={'id'+i.key}><div style={{marginTop:'auto',marginBottom:'auto'}}><GetIcon props={[i.icon,'']} /></div>{"  "}{i.value}</li>
                     })}
                    </div>
                </div>    
            </div>
        :''
    )
}

export const CustomFeild=(props)=>{
    const styles = props.props.styles
    const stateCustom = useSelector(state=>state.setCustomSection)
    const elem = document.querySelector('.bar')
    const computedStyleColor = elem?getComputedStyle(elem).backgroundColor:'rgba(67, 65, 65, 0.568)'

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
            <div className="comp-div-wrap-rs-three" key={uuid()}>
                <h4 style ={styles.MinorHeading} className="marco-head-rs-three fs-minorHead">{val[0].value}</h4>
                <p style ={styles.Para} className="para-rs-three fs-para">{val[1].value} </p>
            </div>
            )})}
     </>
     ) 
    }
    const SectionPara=(props)=>{
        return(
            <>
             {props.vals.map(val=> <p key={uuid()} style={styles.Para} className="para-rs-three fs-para">{val[0].value} </p> )}
            </>
        )
    }
    const SectionSLpara=(props)=>{
        return(
            <div className='listDiplayClass'>
                { props.vals.map(val=> {
                    return(
                        <div key={uuid()} className="skill-bar-name-rs-three">
                            <li  style={styles.Para} className="li-rs-three  fs-para ">{val[0].value}<Bar props={{barVal:val[1].value,color:computedStyleColor}} /></li> 
                        </div>
                    )})
                }
            </div>
        )
    }
    const SingleSection=(props)=>{ 
        const color = tinycolor(computedStyleColor).setAlpha(1)
        
        
        return(
            <div className="grid-comp-height-wrap-rs-three">
            <div className="comp-div-wrap-rs-three">
            <h2 style={{...styles.SubHeading,color:color.darken(70).toString() }} className="comp-minor-heading-rs-three useDarken cl-theme fs-subhead">{props.heading}</h2>
                <RenderCases {...props}/>
                </div>
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
const Res3=()=>{
    const [temp,Resume,designation] = useSelector(state=>[state.setTemp.template,state.setResume,state.setDesignation])
    const styles = useSelector(state=>state.setResumeStyle[temp].custom)
    const [useDimension ,curSelected]= useContext(DimensionContext)
    const colorThemes=  useContext(ColorContext)[0]    
    useEffect(()=>{
        colorChange({target:{
            value:colorThemes[temp]
        }})
    })

    return(
        <div id='resume' className="resume-border-rs-three add-on-resume-border-rs-one">
            <div className="resume-inner-wrap-rs-three">

                <Name props={[Resume.Personal,styles,designation]}/>
                <Image />

            <div className="other-section-grid-rs-three" id='rs-3-grid'>
                <div className="grid-section-one-rs-three">
                    <div className="grid-one-div-wrap-rs-three grid-gap-id">

                        <Summary props={{elemVal:Resume.Summary,styles:styles}} />
                        <Experience props={{elemVal:Resume.Experience ,styles:styles}}/>

                    </div>
                </div>
                <div className="grid-section-two-rs-three"> 
                    <div className="grid-two-div-wrap-rs-three grid-gap-id">

                        <Education props={{elemVal:Resume.Education ,styles:styles}}/>
                        <Skills props={{elemVal:Resume.Skills ,styles:styles}}/>
                        <CustomFeild  props={{styles:styles}}/>
                        <Contact props={{elemVal:Resume.Personal ,styles:styles}}/>

                    </div>       
                </div>
            </div>
        </div>
    </div>
    )
}

export default Res3; 