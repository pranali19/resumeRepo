 import { AiOutlineGithub,AiOutlineFontSize,AiOutlineMessage, AiFillInstagram,AiFillLinkedin, AiOutlineTwitter} from 'react-icons/ai';
 import {FaFacebookF} from 'react-icons/fa'
 import {MdLocationOn,MdEmail,MdOutlineLibraryAdd,MdColorLens,MdOutlineSettingsBackupRestore} from 'react-icons/md'
 import {BsTelephoneFill,BsCardImage,BsGrid1X2} from 'react-icons/bs'
 import {BiCodeCurly,BiFontFamily} from 'react-icons/bi'
 import {CgSpaceBetweenV} from 'react-icons/cg'
 import {RiBarChartHorizontalLine} from 'react-icons/ri'


const GetIcon=(props)=>{
    const [iconVal,styles] = props.props
    switch(iconVal){
        case "FB":
            return  <FaFacebookF style={styles}/>
        case "Instagram":
            return  <AiFillInstagram style={styles}/>
        case 'Git Hub':
            return <AiOutlineGithub />
        case 'Linkedin':
            return  <AiFillLinkedin style={styles} />
        case 'Email':
            return  <MdEmail  style={styles} />
        case 'Phone':
            return  <BsTelephoneFill   style={styles}/>
        case 'Location':
                return  <MdLocationOn  style={styles}/>
        case('Twitter'):
                return <AiOutlineTwitter style={styles}/>
    }
}

export const GetMobileSettingsIcons =(props)=>{
  
    const styles = {height:'90%',width:'90%',margin:'auto'}
    switch(props.props){
        case('curlyBrace'):
          return <BiCodeCurly style={styles}/>
        case('socialMedia'):
          return <AiOutlineMessage  style={styles}/>
        case ('restore'):
            return <MdOutlineSettingsBackupRestore style={styles}/>
        case('img'):
            return <BsCardImage style={styles} />
        case('view'):
            return <BsGrid1X2  style={styles}/>
        case('space'):
            return <CgSpaceBetweenV style={styles}/>
        case('fontSize'):
            return <AiOutlineFontSize style={styles} />
        case('color'):
            return <MdColorLens style={styles} />
        case('fontFamily'):
            return <BiFontFamily  style={styles}/>
        case('bar'):
            return <RiBarChartHorizontalLine style={styles} />
        case ('plus'):
            return <MdOutlineLibraryAdd style={styles} />
    }
}
export default GetIcon