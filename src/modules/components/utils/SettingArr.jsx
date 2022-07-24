
var tinycolor = require('tinycolor2');


 
const doSomething=()=>{
    console.log('do something')
}
const changeHeadingForBg=(elem,colorVal)=>{
 
    if (tinycolor(colorVal).isDark()){
        elem.style.color = 'white';
    }
    else{ 
        elem.style.color = 'black';
    }
}
const DarkenColor=(elem,colorVal)=>{
    elem.style.color = tinycolor(colorVal).darken(70).toString();
}
export const addAdditionalField = (e, dataCl) => {
    const resumeElem = document.querySelector('#resumeWrapId')
    const Subhead = resumeElem.querySelector('.' + dataCl)
    Subhead.textContent = e.target.value
}

export const colorChange = (e) => {
    
    const resumeElem = document.querySelector('#resumeWrapId')
    const allHead = [...resumeElem.querySelectorAll('.cl-theme')]
    allHead.map(i => {
        if (i.tagName == 'HR' || i.tagName == 'DIV') {
            if(i.classList.contains('brColor')){
                i.style.borderColor = e.target.value
            }
            else{
                console.log(i,e.target.value)
            i.style.backgroundColor = e.target.value 
            if (i.classList.contains('trackForChangeColor')){
                changeHeadingForBg(i,e.target.value)
            }
        }
        }
        else {
            if (i.classList.contains('trackForChangeColor')){
                changeHeadingForBg(i,e.target.value)
            }
            else if(i.classList.contains('useDarken')){
                DarkenColor(i,e.target.value)
            }
            else{
            i.style.color = e.target.value
            }
            if(i.classList.contains('brColor')){
                i.style.borderColor = e.target.value
            }
        }
    })
}



const onClickToggleGrid=()=>{
    document.querySelector('.vertival-line').style.display = 'initial';
    const dis=document.querySelector('#Grid-Display-Id').style
    dis.display = 'grid';
    [...document.querySelectorAll('.sp-display-flex')].map(i=>{
        i.style.display='initial'})
        displayListType(false)
        displayBar(false)
 
}

const onClickToggleFlex=()=>{
    document.querySelector('.vertival-line').style.display = 'none';
    const dis=document.querySelector('#Grid-Display-Id').style
    dis.display = 'flex';
    dis.flexDirection='column';
    [...document.querySelectorAll('.sp-display-flex')].map(i=>{
        i.style.display='inline-flex';})
    displayListType()

    displayBar(true)
}

const onClickListTypeList=()=>{
    const elem = [...document.querySelectorAll('.listDiplayClass')]
    onClickToggle1Bar()
    elem.map(i=>{i.classList.remove('displaylistFlex')})
}
const onClickListTypeLine=()=>{
    const elem = [...document.querySelectorAll('.listDiplayClass')]
    onClickToggleNoBar()
    elem.map(i=>{i.classList.add('displaylistFlex')})
}
const onClickToggle1Bar=()=>{
    const elem = [...document.querySelectorAll('.bar-wrapper1')]
    elem.map(i=>{i.style.display = 'flex'})
}
const onClickToggleBar=(props)=>{
    
}
const onClickToggleNoBar=()=>{
    const elem = [...document.querySelectorAll('.bar-wrapper1')]
    elem.map(i=>{i.style.display = 'none'})
}
const displayBar=(val)=>{
    if(val == true){
        [...document.querySelectorAll('.bar-wrapper1')].map(i=>{
            i.style.display = 'none'
    })
}
    else{
        [...document.querySelectorAll('.bar-wrapper1')].map(i=>{
            i.style.display = 'flex'
    })  
    }
}
const displayListType =(val)=>{
    if (val == true){
    [...document.querySelectorAll('.others-li-rs-one')].map(i=>{
        i.style.margin = '0% 2% 0% 0%';
        })
}
else{
     [...document.querySelectorAll('.others-li-rs-one')].map(i=>{
      i.style.margin = '2%';
    })
}
}
const options1 = [
    'Driod sans','Times New Roman','Open Sans', 'Playfair Display', 'Nunito Sans', 'Josefin Sans', 'Libre Baskerville', 'Abel', 'Manrope', 'Cormorant Garamond', 'Jost', 'Nanum Myeongjo', 'Arima madurai','fangsong', 'san-serif', 'monospace','Cinzel'
]
const options2 = [
    'Roboto Flex','Driod sans','Times New Roman','Open Sans',  'Nunito Sans', 'Josefin Sans', 'Libre Baskerville',  'Jost', 'Nanum Myeongjo', 'Arima madurai','fangsong', 'san-serif', 'monospace'
]
const options3 = [
    'Roboto Flex','Driod sans','Times New Roman', 'Jost','fangsong', 'san-serif',"serif"
]
export const barData =  { name: 'ManageDisplayBar', type: 'toggle', id: 'BarTogID', label: 'Manage Bar Type', onClickFunc: [onClickToggleBar, onClickToggleBar,onClickToggleBar,onClickToggleBar ], btnLabels:['Simple Bar','Squared bar','Circle Bar ','Hide Bar'],btnNames:['simple-bar','square','circle',''] ,dataCl: 'li'}
        
 
export const gapData = { name: 'ManageDisplay', type: 'gap', className: '', label: 'Manage Space', onChangeFunc: doSomething, dataCl: 'view-fg', HasBtn: false }

export const HeadingFontStyle = { name: 'HeadingFontStyle', dataState:["Heading","fontFamily"] , type: 'select', options: options1, className: ' form-select custom-select-op', label: 'Heading Font Style :',   dataState:["Heading","fontFamily"], dataCl: ['.fs-head'] }

export const  SubHeadingFontStyle = { name: 'SubHeadingFontStyle', dataState:["SubHeading","fontFamily"] , type: 'select', options: options1, className: ' form-select custom-select-op', label: 'Sub Heading Font Style :',  dataState:["SubHeading","fontFamily"], dataCl: ['.fs-subhead','.fs-minorHead'] }
        
export const  ParaFontStyle = { name: 'ParaFontStyle', dataState:["Para","fontFamily"] ,  type: 'select', options: options3, className: ' form-select custom-select-op', label: 'para Font Style :',   dataState:["Para","fontFamily"], dataCl: ['.fs-para' ] }


export const  HeadingFontSize=  { name: 'HeadingFontSize', type: 'fontSize', className: '', label: 'Heading Font Size' ,dataState:["Heading","fontSize"] , dataCl: '.fs-head'}
export const SubHeadingFontSize= { name: 'SubHeadingFontSize', type: 'fontSize', className: '', label: 'Subheading Font Size',  dataState:["SubHeading","fontSize"] ,dataCl: '.fs-subhead' }
export const MinorHeadingFontSize=  { name: 'MinorHeadingFontSize', type: 'fontSize', className: '', label: 'Minor Heading Font Size',dataState:[ "MinorHeading","fontSize"] ,dataCl:'.fs-minorHead'}
export const MinorSubHeadingFontSize= { name: 'MinorSubHeadingFontSize', type: 'fontSize', className: '', label: 'Minor Subheading Font Size',dataState:["MinorSubHeading","fontSize"] ,dataCl: '.fs-minorsubhead'}
export const ParagraphFontSize=  { name: 'ParagraphFontSize', type: 'fontSize', className: '', label: 'Paragraph Font Size',dataState:["Para","fontSize"] ,dataCl: '.fs-para'}
export const colorSetting =   { name: 'color', type: 'color', className: ' color-inp form-control form-control-color', label: 'Color', dataCl: 'cl-theme', onChangeFunc: colorChange, HasBtn: false, IsDisabled: false }
                 
const settingArr = [
    {
        settingHead:'Restore to Default',
        settingVals:  [{name:'restoreBtn',type:'button',label:'Restore'}]
    },
    {
        settingHead: 'Color Theme',
        settingVals: [colorSetting]
    },
    {
        settingHead: 'Font Style',
        settingVals: [HeadingFontStyle ,  SubHeadingFontStyle,  ParaFontStyle ]
    },
    {
        settingHead: 'Additional Fields',
        settingVals: [{ name: 'SubHead', type: 'text', className: ' custom-adInfo', label: 'Designation', onChangeFunc: addAdditionalField, dataCl: 'add-sub', HasBtn: true, IsDisabled: true },
        { name: 'AddSocialMedia', type: 'list', className: ' custom-adInfo', label: 'Add Social Media', onChangeFunc: addAdditionalField, dataCl: 'add-social', HasBtn: true, IsDisabled: false }
        ]
    },
    {
        settingHead: 'Add Custom Sections',
        settingVals: [{ name: 'AddCustomSections', type: 'radio', className: '', label: 'Test', onChangeFunc: doSomething, dataCl: '', HasBtn: false }]
    },
    {
        settingHead: 'Manage View',
        settingVals: [
        { name: 'ManageDisplay', type: 'toggle', id: 'flexGridID', label: 'Manage Display Type', onClickFunc: [ onClickToggleGrid, onClickToggleFlex], btnLabels:['Grid','flex'],dataCl: 'view-fg'},
        ]},
    { settingHead: 'Manage Components',
    settingVals: [barData ]   },
    {
        settingHead:'Add Image',
        settingVals:[{name:'AddImage',type:'image',className:'',label:'Add Image'}]
    },
    {
        settingHead: 'Manage Space',
        settingVals: [gapData]
    },
    {
        settingHead: 'Font Size',
        settingVals: [HeadingFontSize, SubHeadingFontSize, MinorHeadingFontSize, MinorSubHeadingFontSize, ParagraphFontSize,   ]
    }
]
       
export default settingArr