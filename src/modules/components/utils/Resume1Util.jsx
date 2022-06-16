import React, {useContext} from 'react'
import {Bar} from './Bar'
import {workSummary} from './resumeUtil'
import parse from 'html-react-parser'
import DimensionContext  from './dimensionContext'
import {v4 as uuid} from 'uuid'

export const HeadingPara=(props)=>{
    const styles  = props[1]
    props = props[0]
    return (
        props[0] != undefined && props[0].length >0 ?
            <div id={props[0][1].val} class="grid-other-res-one grid-item-one-rs">
                <h2 style={styles.SubHeading} class="grid-other-minor-head-rs-one cl-theme fs-subhead">{props[0][0].name}</h2>
                <div class="para-rapper-rs-one "><p style={styles.Para} class="grid-other-para-rs-one fs-para"> {props[0][0].val}</p></div>
                <hr class="hr-line-rs-one cl-theme"/>
            </div> 
        :''
        )

}
export const SubHeadlist=(props)=>{
    const {itemArr,name,styles }= props.props
    const elem = document.querySelector('.fs-subhead')
    const computedStyleColor = elem?getComputedStyle(elem).color:'rgb(69, 6, 69)'
    
    return(
        <div className="grid-other-res-one List-grid-one-rs">
            <h2 style={styles.SubHeading} className="grid-other-minor-head-rs-one cl-theme fs-subhead">{name}</h2>
            <div className="others-one-minor-div-section-rs-one sp-display-flex listDiplayClass">
                    {itemArr.map(i=>{
                        return (
                            <li key ={uuid()} id={'id'+String(i[2].val)} style={styles.Para} className="others-li-rs-one fs-para"><p className="list-para fs-para">{i[0].val}</p>{i[1].val?
                                <Bar className='fs-para' style={{marginTop:'auto',marginBottom:'auto'}} props={{barVal:i[1].val,id:'id'+String(i[2].val),color:computedStyleColor}}  />:
                                ""}
                            </li> 
                            )
                    })}
            </div>
            <hr class="hr-line-rs-one cl-theme"/>
        </div>
    )
}
export const SubheadParaExperience =(props)=>{
    const {itemVal,name,styles} = props.props;
    const setCurSelected = useContext(DimensionContext)[2]
    const innerWidth = useContext(DimensionContext)[0]['innerWidth']
    const SingleSHPara = (props)=>{
        let newArr ={}
        props.props.i.map(val=>newArr[val.name] = val.val)
        const h5str = newArr.Title + [' --'+newArr.Employer?newArr.Employer:''] +" "+[newArr.City!=undefined?newArr.City:''] +['--'+newArr.new != undefined? newArr.new:'']
        
        return(
            <div className="others-one-minor-div-section-rs-one xp-para">
                <h4 style={{...styles.MinorHeading,textDecoration:'Underline'}} className="grid-other-macro-head-rs-one fs-minorsubhead">{newArr.head != undefined?newArr.head:''}</h4>
                <h5  style={styles.MinorSubHeading} className="grid-other-mini-head-rs-one fs-para">{ h5str}</h5>
                {newArr.head =="Project"?<h6 style={styles.Para} className="grid-other-mini-head-rs-one h6-head-rs-one fs-para">{newArr['Project URL']?"Url: "+newArr['Project URL']:''}</h6>:""}

                <h6 style={styles.Para} className="grid-other-mini-head-rs-one h6-head-rs-one fs-para">{'From : '+newArr['Start Date']+ ' - '+newArr['End Date']}</h6>
                <div onClick={()=>innerWidth < 1200?setCurSelected('fs-para'):''}  className="para-rapper-rs-one fs-para"><div style={styles.Para} className="grid-other-para-rs-one fs-para">{parse(workSummary(newArr.Summary))} </div></div>
            </div>
        )
    }
    return(
        <div className="subgrid-flex-div-one-rs-one grid-xp">
        <div className="grid-other-res-one grid-item-one-rs">
            <h2 style={styles.SubHeading} className="grid-other-minor-head-rs-one cl-theme fs-subhead">{name}</h2>
            {itemVal.map(i=> <SingleSHPara key={uuid()} props={{i}}/>)}
             
            </div>
            <hr className="hr-line-rs-one cl-theme"/>
            </div>
    )
}
export const SubheadParaEducation=(props)=>{
    const {itemVal,name,styles} = props.props;
    const SHPara = (props)=>{
        let newArr ={}
        props.props.i.map(val=>newArr[val.name] = val.val)
        return(
            <div class="others-one-minor-div-section-rs-one">
            <h4 style={styles.MinorHeading} class="grid-other-macro-head-rs-one fs-minorsubhead">{newArr.Course + ' '+'('+newArr['School Name']+')'} </h4>
            {newArr['Marks Obtained']?<h5 style={styles.Para} class="grid-other-mini-head-rs-one fs-para">{'Aggregate : '+newArr['Marks Obtained']}</h5>:''}
            <h5 style={styles.Para} class="grid-other-mini-head-rs-one fs-para">{'year : '+newArr['Start Date'] + ' '+ newArr['End Date']}</h5>  
        </div>
        )
    }
return(
    <div class="subgrid-flex-div-one-rs-one subgrid-flex-div-rs-one grid-edu">
    <div class="grid-other-res-one">
        <h2 style={styles.SubHeading} class="grid-other-minor-head-rs-one cl-theme fs-subhead">{name}</h2>
        {itemVal.map(i=> <SHPara key={uuid()} props={{i}}/>)}
        </div>
        <hr class="hr-line-rs-one cl-theme"/>
        </div>
)
}
export const SectionSHpara=(props)=>{
    const styles = props[1]
    props = props[0]
    return(
        <>
        {props.vals.map(val=> {
        return(
        <div key={uuid()} className="others-one-minor-div-section-rs-one">
            <h4 style={styles.MinorHeading} className="grid-other-macro-head-rs-one fs-minorHead">{val[0].value}</h4>
                <div className="para-rapper-rs-one fs-para"><p style={styles.Para} className="grid-other-para-rs-one fs-para">{val[1].value} </p></div>
            </div>
        )})}
        </>
    )
}
export const SectionPara=(props)=>{
    const styles = props[1]
    props = props[0]
    return(
        <>
         {props.vals.map(val=> {
             return(
            <div key={uuid()} className="others-one-minor-div-section-rs-one">
                <div className="para-rapper-rs-one fs-para"><p style={styles.Para} className="grid-other-para-rs-one fs-para">{val[0].value} </p></div>
            </div>)
         })}
        </>
    )
}
export const SectionSLpara=(props)=>{
    const styles = props[1]
    const color = props[2]
    props = props[0]
    return(
        <>
         {props.vals.map(val=> {
             return(
            <div key={uuid()} className="others-one-minor-div-section-rs-one sp-display-flex">
                <li style={styles.Para} className="others-li-rs-one fs-para "><p className="list-para">{val[0].value}</p><Bar props={{barVal:val[1].value,color:color}} /></li> 
            </div>
            )
        })}
        </>
    )
}