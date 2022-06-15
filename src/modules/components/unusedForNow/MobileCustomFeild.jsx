
import { useState } from 'react'
import settingArr from '../utils/SettingArr'
import {InputsWrap} from '../CustomField'


export const MobileCustomFeild =()=>{
    const [curSetting,setCurSetting] = useState(0)
    const handleClickTitle=(index)=>{
    const prevSelected = document.querySelector('.bg-whitesmoke')
    if (prevSelected){prevSelected.classList.remove('bg-whitesmoke')}
    document.querySelector('#id'+String(index)).classList.add('bg-whitesmoke')
        setCurSetting(index)
    }
    const Show=()=>{
        return(
           < InputsWrap {...[settingArr[curSetting]['settingVals']]} />
        )
    }
    const checkFirstRender=()=>{
       const elem = [...document.querySelectorAll('.cf-mobile-wrap-one-background')]
    //    elem.map(i=>{
    //      if(i.classList.contains('.bg-whitesmoke'))  
    //    })
    const i = elem.filter(i=>i.classList.contains('bg-whitesmoke'))
    if (i.length == 0){
        return 'cf-mobile-wrap-one-background bg-whitesmoke'
    }
    return 'cf-mobile-wrap-one-background '
    }
    return(
        
            <div className="mobile-outer-custom-wrap">
                <div className='h-wrap-m'><h2 className='heading-mobile-custom'>Customize Resume</h2></div>

                <div  className='mobile-outer-custom-wrap-1'>
                    {settingArr.map((i,index)=>{
                        return (
                            <div className={index==0?checkFirstRender():'cf-mobile-wrap-one-background'} id={'id'+String(index)}>
                            <div className='cf-setting-heading-wrap sp-mobile-setting-wrap' onClick={()=>handleClickTitle(index)}>
                                <h5 className='custom-field-heading sp-mobile-setting-head'>{i.settingHead}</h5>
                            </div>
                            </div>
                            )
                        })}
                </div>
                <div className='mobile-outer-custom-wrap-2'>
                    <Show />
                </div>
            </div>
    )
}
export default MobileCustomFeild