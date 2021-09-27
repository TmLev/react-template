import React from "react";
import ReactDOM from "react-dom";

const App = (): JSX.Element => {
  return (
    <div>
      <header>Hello there! App is loaded!</header>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
