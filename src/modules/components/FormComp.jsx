import React from 'react';
import '../Form.css';

class FormComp extends React.Component{

   constructor(props) {
       super(props) 

   }

   componentDidMount(){ 
   }
   
   componentDidUpdate(){
   }

        render(){
            this.head = this.props.props.head
            this.aboveState = this.props.props.aboveState
            this.onClickNext = this.props.props.onClickNext
            this.onClickPrev = this.props.props.onClickPrev
            
            return (
                <div className='wrap-input-form-component'>
                <h1>{this.head}</h1>
                    <label className='label-form'>Test<input type='text' className='inp'/>
                    </label>
                    <label className='label-form'>Test<input type='text' className='inp'/>
                    </label>
                    <label className='label-form'>Test<input type='text' className='inp'/>
                    </label>
                    <label className='label-form'>Test<input type='text' className='inp'/>
                    </label>
                    <label className='label-form'>Test<input type='text' className='inp'/>
                    </label>
                    <div className='btn-wrap-form'>
                   
                         {/* */}
                         {this.aboveState.prevBtnVal?<button type="button" className='btn-form'  name="prev" onClick={this.onClickPrev.bind(this)}>prev</button>:'p'}
                         {this.aboveState.nextBtnVal?<button type="button" className='btn-form'  name="next" onClick={this.onClickNext.bind(this)}> next</button> :'o'}
                     
                    </div>
                </div>   
            )
        }
    }
    export default FormComp