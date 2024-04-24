import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

export const MyAlertContext = React.createContext(undefined);

const AlertProvider = props => {
  const { children, ...rest } = props;
  const [config, setConfig] = useState(rest);
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
            {config.content && (
              <p dangerouslySetInnerHTML={{ __html: config.content }} />
            )}
          </Alert>
        </div>
      ) : null}
      {children}
    </MyAlertContext.Provider>
  );
};
// Usage:
// myAlertContext.setConfig({
//     show: true,
//     className: "mt-2 bg-danger border-0 text-white",
//     type: "danger",
//     dismissible: true,
//     heading: "Alert!",
//     content:
//       "<p>Hello World..<a class='m-2 btn btn-sm btn-primary' href='https://google.com' target='_blank'>Google</a></p>",
//   });

export default AlertProvider;
