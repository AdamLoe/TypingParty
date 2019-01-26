import React from "react";
import PT from "prop-types";
import { connect } from "react-redux";

let X = ({ onClick }) => (
  <svg onClick={onClick} width="24" height="24" viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path
      fill="black"
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59
    6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
    />
  </svg>
);
X.propTypes = { onClick: PT.func.isRequired };
import { closeNotification } from "../../actions/popups";

let ErrorNotification = ({ notificationMessage, closeNotification }) => (
  <div className="ErrorNotification">
    {notificationMessage}
    <X onClick={closeNotification} />
  </div>
);
ErrorNotification.propTypes = {
  notificationMessage: PT.string.isRequired,
  closeNotification: PT.func.isRequired
};

let NormalNotification = ({ notificationMessage, closeNotification }) => (
  <div className="NormalNotification">
    {notificationMessage}
    <X onClick={closeNotification} />
  </div>
);
NormalNotification.propTypes = {
  notificationMessage: PT.string.isRequired,
  closeNotification: PT.func.isRequired
};

let LoadingModal = () => <div className="LoadingModal">Loading</div>;

let Popups = ({
  showLoading,
  showNotification,
  notificationType,
  notificationMessage,
  notificationKey,
  closeNotification
}) => (
  <div className="Popups">
    {showLoading && <LoadingModal />}
    {showNotification && (
      <>
        {notificationType === "Error" && (
          <ErrorNotification
            notificationMessage={notificationMessage}
            closeNotification={() => closeNotification(notificationKey)}
          />
        )}
        {notificationType === "Normal" && (
          <NormalNotification
            notificationMessage={notificationMessage}
            closeNotification={() => closeNotification(notificationKey)}
          />
        )}
      </>
    )}
  </div>
);
Popups.propTypes = {
  showLoading: PT.bool.isRequired,
  showNotification: PT.bool.isRequired,
  notificationType: PT.string.isRequired,
  notificationMessage: PT.string.isRequired,
  notificationKey: PT.number.isRequired,
  closeNotification: PT.func.isRequired
};

let mapState = state => {
  let {
    showNotification,
    notificationMessage,
    notificationType,
    notificationKey,
    showLoading
  } = state.popups;

  return {
    showNotification,
    notificationMessage,
    notificationType,
    notificationKey,
    showLoading
  };
};

export default connect(
  mapState,
  { closeNotification }
)(Popups);
