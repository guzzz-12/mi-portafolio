import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import "./modal.scss";
import {CLEAR_MAIL_REDUCER} from "../../redux/actions/types";
import Spinner from "../Spinner/Spinner";

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
            {props.sending &&
              <React.Fragment>
                {/* <h2>Enviando mensaje...</h2> */}
                <Spinner show={true} color="#000" />
              </React.Fragment>
            }
            {props.success && <h2>Enviado con éxito!</h2>}
            {props.failed && <h2 style={{marginBottom: "1rem"}}>Error al enviar</h2>}
            {props.errorMessage &&
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  color: "red"
                }}
              >
                {props.errorMessage}
              </p>
            }
            {props.failed || props.success ? 
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
              : null
            }
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
    failed: state.mailReducer.failed,
    errorMessage: state.mailReducer.errorMessage
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
