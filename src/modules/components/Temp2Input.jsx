import React from 'react'

import {PersonalDetails,WorkExperience,EducationDetails,Skills,Summary} from './Temp2FuncAll'
import { BsFillCaretDownFill} from 'react-icons/bs';


const RenderContent=(props)=>{

    switch(props.props){
        case 'Personal':
            return <PersonalDetails />
        case 'Experience':
            return <WorkExperience  />
        case 'Education':
            return <EducationDetails />
        case 'Skills':
            return <Skills />
        case 'Summary':
            return <Summary />
        
    }
}

class Input2 extends React.Component{

    constructor(props){
        super(props);
        this.listSection = ['Personal', 'Experience','Education','Skills', 'Summary',]
    }
    inputClickHandler(pramId,e){
        const elem = document.getElementById(pramId)
        if (elem.classList.contains('inp-wrap-fd-show')){
            elem.classList.replace('inp-wrap-fd-show','inp-form-display-none')
        }
        else{
            elem.classList.add('inp-wrap-fd-show')
        }
       
    }


    render(){

        return(
            <>
            {this.listSection.map((i,index)=>{
                const SectionKey = i+"section"+String(index)
                return(
             <div className="drop-down-input-wrap" key={SectionKey+"wpID"}>
               <div onClick={e=>{this.inputClickHandler(SectionKey,e)}} className='input-field-name-icon-wrap' >
                    <div className='input-field-name-div'>{i}</div>
                    <div className='input-field-icon-div'><BsFillCaretDownFill/></div>
                </div>
                <div className='inp-wrap-fd' id={SectionKey} >
                <RenderContent props={i} />
                </div>  
           </div>)
        })}
        </>
        )
    }

}
export default Input2
