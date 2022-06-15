import React, { Component } from 'react';
import store from './utils/store'
import {v4 as uuid } from 'uuid';
import Res1 from './Resume1'
import {getSelectedState} from './utils/resumeUtil'

class ResumeOneClass extends React.Component {
       constructor(props){
           super(props)  
           this.resumeStyle = getSelectedState(store.getState())
       }
       PersonalSkills = {heading:'Personal Skills',key: uuid(),type:"Heading List",vals:[
           [{name:'subheading' ,val:'Creativity' ,key: uuid()},{name : 'level',val:'9' ,key:uuid()}],
           [{name:'subheading' ,val:'Team Work' ,key: uuid()},{name : 'level',val:'9' ,key:uuid()}],
           [{name:'subheading' ,val:'Hard Work' ,key: uuid()},{name : 'level',val:'9' ,key:uuid()}],
           [{name:'subheading' ,val:'Leadership' ,key: uuid()},{name : 'level',val:'9' ,key:uuid()}]
       ]
       }
    componentDidMount(){
    }


    render(){


      
        return (
            <>
                <Res1 />
            </>
        )
    }
}
export default ResumeOneClass