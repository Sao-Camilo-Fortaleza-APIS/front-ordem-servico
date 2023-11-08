import { ToastOptions } from "react-toastify";

export const configToastError: ToastOptions<{}> = {
  autoClose: 7000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored"
}

export const configToastSuccess: ToastOptions<{}> = {
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "colored"
}