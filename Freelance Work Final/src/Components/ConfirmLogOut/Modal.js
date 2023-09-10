import classes from './Modal.module.css'

function Modal(props){
    
    function confirmHandler(){
        props.onConfirm();
    }

    function cancelHandler(){
        props.onCancel();
    }

    return(

        <div className={classes.modal}>
            <p className={classes.con}>Are you sure ?</p>
            <button className={classes.btnalt} onClick={confirmHandler}>Confirm</button>
            <button className={classes.btn} onClick={cancelHandler}>Cancel</button>
        </div>

    );
}

export default Modal;