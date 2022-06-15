import React from 'react';
import './Form.css';
import store from './components/utils/store';
import {setTemplateAction, updateResumeDetails} from './components/utils/action'
import res1 from '../Images/res1.jpg';
import res2 from '../Images/res2.jpg';
import res3 from '../Images/res3.jpg';
import res4 from '../Images/res4.jpg';
import {v4 as uuid} from 'uuid';



class SelectTemp extends React.Component{

   constructor(props) {
       super(props) ; 
       this.state = {
        curTemp:''
    }
       this.imageArray = [{name:'res1',src:res1},{name:'res2',src:res2},{name:'res3',src:res3},{name:'res4',src:res4}]
   }

   componentDidMount(){ 

   }
   setBorder(e){
        const elem = [...document.querySelectorAll('img')]
        elem.map(i=>i.classList.contains('activeImageTemp')?i.classList.remove('activeImageTemp'):'')
        e.target.classList.add('activeImageTemp')
   }
   
   onClickImage = async (e)=>{
        this.setBorder(e)
        store.dispatch(setTemplateAction(e.target.name))
    }
    onClickNextSetTemp(setTemp){
        setTemp()
    }


        render(){
            this.head = this.props.props.head
            this.onClickNext = this.props.props.onClickNext
            this.onClickPrev = this.props.props.onClickPrev



            return (
                <div id='wrap-input-form-component '>
                
                <div className="heading-form-steps-wrap"><h1 className='heading-form-steps'>{this.head}</h1></div>
                
                <div className="select-template-wrap">
                  {this.imageArray.map((i,index)=>{return (
                      <div className='temp-image-wrap' key={"tmp"+uuid()}>
                        <img className="tempImage" key={i.name +toString(index)} name={i.name} src={i.src} onClick={e=>this.onClickImage(e)} />
                      </div>
                      )})}
                </div>
                <div className='btn-wrap-form'>
                     <button type="button" className='btn-form'  name="next" onClick={()=>this.onClickNextSetTemp(this.onClickNext.bind(this))}> next</button>             
                </div>
                </div>   
            )
        }
    }
    export default SelectTemp