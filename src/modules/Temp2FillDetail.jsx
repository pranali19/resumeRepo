import React from 'react'
import './Form.css'
import Input2 from './components/Temp2Input'

class FillDetails extends React.Component{
    constructor(props){
        super(props)
    }



    render(){
        this.head = this.props.props.head
        this.onClickNext = this.props.props.onClickNext
        this.onClickPrev = this.props.props.onClickPrev
     
        return (
            <div className='wrap-input-form-component-fillDetails ' id='temp1'>
            <h1 className='heading-form-steps'>{this.head}</h1>
            <div className='inputs-wrap'>
                <Input2  />
            </div>
            <div className='btn-wrap-form'>      
                    <button type="button" className='btn-form'  name="prev" onClick={this.onClickPrev.bind(this)}>prev</button>
                   <button type="button" className='btn-form'  name="next" onClick={this.onClickNext.bind(this)}> next</button>      
            </div>
            </div>   
        )
              }

}
export default FillDetails
