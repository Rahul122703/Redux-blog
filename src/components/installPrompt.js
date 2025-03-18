import React, { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("visited");

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!hasVisited) {
        setShowModal(true);
        localStorage.setItem("visited", "true");
      } else {
        setShowButton(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setShowModal(false);
        setShowButton(true);
      });
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}>
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-80 text-center"
            onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold">Install This App</h2>
            <p className="text-gray-600 mt-2">
              Get quick access by installing this app on your device.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleInstallClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Install
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showButton && (
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600">
          Install App
        </button>
      )}
    </>
  );
};

export default InstallPrompt;
