import React from 'react'
import ResumeOneClass from './ResumeOneClass'
// import ReactToPrint from "react-to-print";
import ResumeThreeClass from './resumeThreeClass'
import ResumeTwoClass from './ResumeTwoClass';
import ResumeFourClass from './ResumeFourClass';
import {useSelector} from 'react-redux'
// import html2PDF from 'html2pdf.js'
import {removeBorderUseEff as removeBorderEff} from '../Temp3ViewCustomize'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const handleDownloadCss=(scaleWrapperRef,height,width,called)=>{
  if(scaleWrapperRef){
    const scaleWrapperRefStyle = scaleWrapperRef.current.style
    const orgHeightVal =scaleWrapperRefStyle.height
    scaleWrapperRefStyle.height = height
    scaleWrapperRefStyle.width =width;
    if(called==='Before'){
      scaleWrapperRef.current.querySelector('.scale-rs-onclk').classList.remove('scaledResume')
    }
    else{
      scaleWrapperRef.current.querySelector('.scale-rs-onclk').classList.add('scaledResume')

    }
    return orgHeightVal
  }
}
export const handleClickPrintPdf=(modal,setIsModal,IsScaled,scaleWrapperRef)=>{
  var orignalHeight;  
  removeBorderEff()
  if(IsScaled){
    orignalHeight = handleDownloadCss(scaleWrapperRef,'auto','auto','Before')
  }

    var elem = document.getElementById('resume');
    var imgfile2 =  html2canvas(elem,{scale:3,dpi:300}).then(canvas=>canvas.toDataURL("img/jpeg",0.3));
  if(IsScaled){handleDownloadCss(scaleWrapperRef,orignalHeight,'100%','After')}

  imgfile2.then(imgFile=>{
    var doc =new jsPDF('p','mm','a4',true);
    doc.addImage(imgFile,'jpeg',0,0,210,297,undefined,'FAST')
    doc.save('Resume.pdf'); }
  )
  setIsModal(!modal)
 
}


export const Resume = (prop)=>{
    const props = prop[0]
    const template  = useSelector(state=>state.setTemp.template)
       switch(template ){
           case 'res1':
               return <ResumeOneClass {...props}  />
            case 'res2':
                return <ResumeTwoClass {...props}  />
            case 'res3':
                return <ResumeThreeClass {...props}   />
            case 'res4':
              return <ResumeFourClass {...props}  />
            default:
              return <ResumeOneClass {...props} />
       }
}
const ResumeView =(props)=>{
  const [modalState,setIsModalState]=props.props
    return(
      <div className='resume-view-outer-wrap'>
              <div className='resume-container'>
             
              <Resume {...[props]} />
            
         <button onClick={()=>handleClickPrintPdf(modalState,setIsModalState)} className="btn btn-success">download</button>
        </div>
    
    
        </div>
    )
}


export default ResumeView