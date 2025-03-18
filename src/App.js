import React from "react";
import InstallPrompt from "./components/installPrompt";

const App = () => {
  return (
    <div className="border border-black">
      <h1>Welcome to My React PWA</h1>
      <p>This app supports install prompt and offline access.</p>
      <InstallPrompt />
    </div>
  );
};

export default App;
