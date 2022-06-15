

export const resumeTemplateState ={
    template:'res1'
}
export const ImageState={
    image:''
}
export const curPageState=0
export const mediaState=[]

export  const ResumeDetailsState={
    "Personal":[],
    'Experience':[],
    'Education':[],
    'Skills':[],
    'Summary':[]
}
export const customSectionState =[]

const res1Orignal ={
    Heading:{
        fontFamily: 'fangsong',
        fontSize:"2.7rem",
    },
     SubHeading:{
        fontFamily:'fangsong',
        fontSize:"1.3rem",
    },
    Para:{
        fontFamily:'Times New Roman',
        fontSize:"1rem"
    },
    MinorHeading:{fontSize:"1rem"},
    MinorSubHeading:{fontSize:"1rem"},


    AddSubHeading:'Times New Roman',

    
}
const res2Orignal ={
    Heading:{
        fontFamily:'fangsong',
        fontSize:"2.7rem",
    },
    SubHeading:{
        fontFamily:'fangsong',
        fontSize:"1.2rem",
        letterSpacing: '0.17rem',
    },
    Para:{
        fontFamily:'fangsong',
        fontSize:"0.9rem",
    },
    MinorHeading:{fontSize:"1.05rem"},
    MinorSubHeading:{fontSize:"0.9rem"},

    AddSubHeading:'',
  
}
const res3Orignal ={
    Heading:{
    fontFamily: 'fangong',
    fontSize:"2.8rem"
    },
    SubHeading:{
    fontFamily:'monopace',
    fontSize:"1.4rem"
    },
    Para:{
    fontFamily:'fangsong',
    fontSize:'0.94rem'
    },
    
    AddSubHeading:'',
    MinorHeading:{fontSize:"1rem"},
    MinorSubHeading:{fontSize:"0.9rem"},
   
}
const res4Orignal ={
    Heading:{
        fontFamily: 'Open Sans', 
        fontSize:"2.8rem",
        fontFeatureSettings: "smcp",
    fontVariantCaps: 'all-small-caps',
    letterSpacing: '0.6rem',
    },
     SubHeading:{
        fontFamily:'fangsong',
        fontSize:"1.15rem",
        letterSpacing: '0.17rem',
    },
    Para:{
        fontFamily:'Roboto Flex',
        fontSize:"0.9rem"
    },
    MinorHeading:{fontSize:"1rem"},
    MinorSubHeading:{fontSize:"0.9rem"},
    color:'',
    AddSubHeading:'Open Sans',
    
}
export const resumeStyleState = {
    res1:{orignal:res1Orignal,custom:res1Orignal},
    res2:{orignal:res2Orignal,custom:res2Orignal},
    res3:{orignal:res3Orignal,custom:res3Orignal },
    res4:{orignal:res4Orignal,custom:res4Orignal },

}
export const designationState = '';