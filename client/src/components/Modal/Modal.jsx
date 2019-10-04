import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import "./modal.scss";
import {CLEAR_MAIL_REDUCER} from "../../redux/actions/types";

const Modal = (props) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(props.sending || props.success || props.failed) {
      setShowModal(true)
    }
    else {
      setShowModal(false)
    }
  }, [props.sending, props.success, props.failed]);

  return (
    <React.Fragment>
      {showModal &&
        <div className="alert-modal">
          <div className="alert-modal__content">
            {props.sending && <h2>Sending</h2>}
            {props.success && <h2>Successfully sent!</h2>}
            {props.failed && <h2>Error sending.</h2>}
            <button
              className="alert-modal__btn"
              onClick={() => {
                setShowModal(false);
                props.clearState()
              }
            }
            >
              Ok
            </button>
          </div>
        </div>
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    sending: state.mailReducer.sending,
    success: state.mailReducer.success,
    failed: state.mailReducer.failed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearState: () => {
      dispatch({type: CLEAR_MAIL_REDUCER})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);