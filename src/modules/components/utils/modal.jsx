const Modal=(props)=>{
    const [modalState,setIsModalState] = props.props
    
    const handleModalDisplay=()=>{
        console.log("modal click")
        setIsModalState(!modalState)
    }
    return(
      <div className='modal sp-modal' id = "d-modal">
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-body'>
              Your download will start shortly ! You can close this window and wait.
            </div>
            <div className='modal-footer'>
              <button onClick={handleModalDisplay} type="button" className='btn btn-secondary' >close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
export default Modal;