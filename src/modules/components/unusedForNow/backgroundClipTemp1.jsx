
const Block =(props)=>{
    return(
        <div className="block-outer-wrap">
            <div  className="block-inner-wrap">
               <h1 style={{textAlign:'center'}}>{ props.props.val}</h1>
            </div>
        </div>
    )
}
const BackgroundClip=()=>{
    return (
        <div className="block-mobile">
            <div className="mobile-line-block">
                <div className="mobile-inner-line"></div>
         
            </div>
            <div className= 'block-wrap' >
                <Block props={{val:'step 1'}}/> 
                <Block props={{val:'step 2'}}/>
                <Block props={{val:'step 3'}}/>
            </div>
        </div>
    )
}


export default BackgroundClip