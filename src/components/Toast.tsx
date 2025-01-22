import { ToastContainer } from "react-toastify";

export const Toast = (): JSX.Element => {
  return (
    <ToastContainer
      autoClose={5000}
      closeOnClick
      draggable
      hideProgressBar={false}
      newestOnTop={false}
      pauseOnFocusLoss
      pauseOnHover
      position="top-right"
      rtl={false}
      theme="dark"
      toastClassName="bg-c-gray-600"
      className="flex flex-col max-tablet-s:p-4 max-tablet-s:gap-4"
    />
  );
};
