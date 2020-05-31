import React, { useContext } from "react";
import AlertContext from "../../../context/alert/AlertContext";

const Alerts = () => {
  const alertCTX = useContext(AlertContext);

  const alertsJSX =
    alertCTX.alerts.length > 0
      ? alertCTX.alerts.map((alert) => {
          return (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
              <i className="fas fa-info-circle"></i> {alert.message}
            </div>
          );
        })
      : null;

  return alertsJSX;
};

export default Alerts;
