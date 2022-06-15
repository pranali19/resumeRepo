
import {useState} from 'react'
import {defaultSettings} from './mobileEx'
const useSettingArray = (val)=>{
    const [settingArray, setSettingArray] = useState(val?val:defaultSettings)

    return {settingArray,setSettingArray}
  }
export default useSettingArray;