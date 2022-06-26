import React, { useContext ,useState} from 'react';
import './Form.css';
import {useSpring ,animated} from 'react-spring'
import ColorContext from './components/utils/ColorContext'
import SelectTemp from './Temp1SelectResume';
import FillDetails from './Temp2FillDetail';
import ViewCustomize from './Temp3ViewCustomize'
import store from './components/utils/store';
import { useSelector } from 'react-redux';

const Transition =({props:{btnFunction, colorState , setColorThemes}})=>{
    const template=useSelector(state=>state.setCurPage)

    const fornext ={    
        from:{opacity:0},
        to:{opacity:1},
        duration:3000
      }

      const styles0 = useSpring(
        template===0?fornext:{opacity:0}
      )
      const styles1 = useSpring(
        template===1?fornext:{opacity:0}
      )
      const styles2 = useSpring(
        template===2?fornext:{opacity:0}
      )

      return(
          <>
        {template ===  0
        ? <animated.div className='wrap-input-form formOne' style={styles0} name='formOne' data-order>
            <SelectTemp  props={{...btnFunction,head:'Select Your Resume Template'}}  /> 
          </animated.div>
        :template ===  1
        ? <animated.div className='wrap-input-form formTwo' style={styles1} name='formTwo' data-order>
            <FillDetails props={{...btnFunction,head:'Fill Your Details'}}  />
          </animated.div>
        :template=== 2
        ? <animated.div className='wrap-input-form formThree' style={styles2} name='formThree' data-order>
            <ColorContext.Provider value={[colorState , setColorThemes]} >
              <ViewCustomize props={{...btnFunction}}  />
            </ColorContext.Provider> 
          </animated.div>
        :''
        }
        </>

      )
}
class Wrap extends React.Component{
    constructor(props){
        super(props);        
        this.state = {
            curTemp:0,
            colorThemes:this.themes
        } 
   
    }
     themes = {res1:'#065151',res2:'rgb(69, 6, 69)',res3:'#696761',res4:'rgb(146, 128, 81)'}

    useChangeTheme=(val,temp)=>{
      this.setState({...this.state,colorThemes:{...this.state.colorThemes,[temp]:val}})
    }   
    onClickNewPrev=()=>{
        const newTemp  = store.getState().setCurPage -1
         store.dispatch({type:'setCurPage' , payload:newTemp <=0?0:newTemp})
    }
    onClickNewNext=()=>{
        const newTemp  =store.getState().setCurPage +1
        store.dispatch({type:'setCurPage' , payload:newTemp >=2?2:newTemp})

    }
    btnFunction ={"onClickNext":this.onClickNewNext.bind(this),"onClickPrev":this.onClickNewPrev.bind(this)}


    render(){
        return (      
            <div className='inner-form-main-wrap'>        
                <Transition props={{btnFunction: this.btnFunction,colorState:this.state.colorThemes,setColorThemes:this.useChangeTheme}} />
            </div>   
          )
      }
  }
export default Wrap;

