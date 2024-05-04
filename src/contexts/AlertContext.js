import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

export const MyAlertContext = React.createContext(undefined);

const AlertProvider = props => {
  const { children, ...rest } = props;
  const [config, setConfig] = useState(rest);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, [config]);

  return (
    <MyAlertContext.Provider value={{ config, setConfig }}>
      {config.show ? (
        <div className='container-fluid'>
          <Alert
            variant={config.type}
            className={config.className}
            onClose={() => setConfig(prev => ({ ...prev, show: false }))}
            dismissible={config.dismissible}
          >
            {config.heading && <Alert.Heading>{config.heading}</Alert.Heading>}
            {config.content && <div>{config.content}</div>}
          </Alert>
        </div>
      ) : null}
      {children}
    </MyAlertContext.Provider>
  );
};

export default AlertProvider;
