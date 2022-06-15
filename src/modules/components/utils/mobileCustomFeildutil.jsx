import React from 'react';
import {toggleDisplay} from '../CustomField'
import { setImageAction } from './action';


export const onChangeImage=(elemVal,dispatch,setImgEvent)=>{
    const imgval = elemVal.target.files[0]
    const validFileTypes = ['image/gif','image/jpeg','image/png']

    const fileSize = imgval.size/1024/1024;
    if (fileSize > 4){
        alert('Image size is greater than 4 MB')
        return 0
    }
    if(!validFileTypes.includes(imgval['type'])){
        alert('Only Jpeg, gif and png Images are allowed')
        return 0
    }
    const img = URL.createObjectURL(imgval)
    dispatch(setImageAction(img))
    setImgEvent(elemVal)
}
export const onClickDeleteImg =(setImgEvent,dispatch)=>{
    setImgEvent('')
    dispatch(setImageAction(''))
}

export const MediaBtn =(props)=>{
    const options =[ 'FB', 'Instgram', 'Git Hub','Linkedin','Twitter' ]
    const [IDBlock,onPressIcon,iconVal ]= props.props
    return(
        <div className="input-group-prepend">
        <button onClick={()=>toggleDisplay(IDBlock)} className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >{iconVal}</button>
        <div className="dropdown-menu" id={IDBlock}>
            {options.map((i,index)=><option key={String(index)+IDBlock}  className="dropdown-item" onClick={() => onPressIcon(i, IDBlock)} value={i} >{i}</option>)}
        </div>
    </div>
    )
}