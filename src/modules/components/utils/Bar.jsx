import { useContext ,createContext} from "react"
import BarContext from "./BarContext"
import ColorContext from './ColorContext'

const SimpleBar=(props)=>{

    return(
        <div class="progress2 progress-moved">
             <InnerBar props={[props.props[0]]}/>        
      </div> 
    )
}
const InnerBar=(props)=>{
    return <div style={{width:props.props[0]+'%',backgroundColor:useContext(ColorContext)}} className="bar fs-para progress-bar2 cl-theme"></div>
}
const InnerBarBitsSquare=(props)=>{
    return <div style={{width:props.props[0],backgroundColor:useContext(ColorContext)}}  className="bar fs-para bar-inner-container-bits-s cl-theme"></div>
}
const InnerBarBitsCircle=(props)=>{
    return <div style={{width:props.props[0],backgroundColor:useContext(ColorContext)}}  className={props.props[1]}></div>
}
export const Bar=(props)=>{
    const type =useContext(BarContext)[0]
    const color = props.props.color
    return(
    <ColorContext.Provider value={color}>
    <div style={{marginRight:'0%'}} className="bar-wrapper1 fs-para">
         
        {type== 'simple-bar'?
        <SimpleBar props={[String((props.props.barVal*10))]}/>:
        type =='square'?<BarBits props={[props.props.barVal,'square']}/>:
        type == 'circle' ?<BarBits props={[props.props.barVal,'circle']}/>:
        ''
        }    
    </div>
    </ColorContext.Provider>
    )
}
export const BarBits=(props)=>{
    const [val,type] = props.props
    let newVal = val/2
    let barVal = [0,0,0,0,0]
    let index=0;
    while(newVal >= 1){
        newVal --
        barVal[index] = 1
        index ++
    }
    if (newVal != 0){barVal[index]=newVal}
    return(
        type === 'square' ?<BarSquaredBits props={barVal}/>:
        type === 'circle'?<BarCircleBits props={barVal} />:''
    )

}
const BarCircleBits =(props)=>{
    const barVal = props.props
        return(
            barVal.map(i=>
                i === 0? <div className="bar-wrapperCircle"><InnerBarBitsCircle props={['0%','bar bar-inner-container-bits-circle cl-theme']}/> </div>:
                i<1? <div className="bar-wrapperCircle"><InnerBarBitsCircle props={['60%','bar bar-inner-container-bits-circle-half cl-theme']}/> </div> : 
                i === 1? <div className="bar-wrapperCircle"><InnerBarBitsCircle props={['100%','bar fs-para bar-inner-container-bits-circle cl-theme']}/> </div> :''
            )
        )
}
export const BarSquaredBits=(props)=>{
    const barVal = props.props
    return(
        barVal.map(i=>
            i === 0? <div className="bar-wrapper2"><InnerBarBitsSquare props={['0%']}/> </div>:
            i<1? <div className="bar-wrapper2"><InnerBarBitsSquare props={['55%']}/> </div> : 
            i === 1? <div className="bar-wrapper2"><InnerBarBitsSquare props={['100%']}/> </div> :''
        )
    )

}