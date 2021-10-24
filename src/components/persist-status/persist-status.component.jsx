import React from "react";

import "./persist-status.styles.scss";

const PersistStatus = ({ persisting, persistError, onRetry }) => {
  return (
    <div>
      {persisting ? (
        <div className="persist-progress">Saving Changes</div>
      ) : persistError ? (
        <div className="persist-fail">
          <span>Saving changes failed</span>
          <button onClick={onRetry}>Retry</button>
        </div>
      ) : (
        <div className="persist-ok">Changes saved</div>
      )}
    </div>
  );
};

export default PersistStatus;
