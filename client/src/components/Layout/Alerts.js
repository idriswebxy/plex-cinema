import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "react-bootstrap/Alert";

const Alerts = ({ alerts }) => {
  return (
    <div>
      {alerts !== null &&
        alerts.map((alert, variant, idx) => (
          <Alert key={alert.id} variant={alert.alertType}>
            {alert.msg}
          </Alert>
        ))}
    </div>
  );
};

// Alerts.propTypes = {
//   alerts: PropTypes.array.isRequired,
// };

const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alerts);
