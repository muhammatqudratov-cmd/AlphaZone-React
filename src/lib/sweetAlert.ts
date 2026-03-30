import Swal from "sweetalert2";
import { Messages } from "./config";

const gymStyle = {
  background: "#FDFEFE",
  color: "#183642",
  backdrop: "rgba(24,54,66,0.22)",
  buttonsStyling: false,
  customClass: {
    popup: "alpha-swal-popup",
    title: "alpha-swal-title",
    htmlContainer: "alpha-swal-content",
    confirmButton: "alpha-swal-confirm",
    cancelButton: "alpha-swal-cancel",
  },
};

/** ERROR */
export const sweetErrorHandling = async (err: any) => {
  const error = err.response?.data ?? err;
  const message = error?.message ?? Messages.error1;

  await Swal.fire({
    ...gymStyle,
    icon: "error",
    title: "Error",
    text: message,
    showConfirmButton: true,
    confirmButtonText: "OK",
    iconColor: "#457B9D",
  });
};

/** SUCCESS (TOP) */
export const sweetTopSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  await Swal.fire({
    ...gymStyle,
    position: "top-end",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });
};

/** SMALL TOAST SUCCESS */
export const sweetTopSmallSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    background: "#FDFEFE",
    color: "#183642",
    iconColor: "#457B9D",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
    customClass: {
      popup: "alpha-swal-popup",
      title: "alpha-swal-title",
    },
  });

  Toast.fire({
    icon: "success",
    title: msg,
  });
};

/** FAILURE + REDIRECT */
export const sweetFailureProvider = (
  msg: string,
  show_button: boolean = false,
  forward_url: string = ""
) => {
  Swal.fire({
    ...gymStyle,
    icon: "error",
    title: msg,
    showConfirmButton: show_button,
    confirmButtonText: "OK",
    iconColor: "#457B9D",
  }).then(() => {
    if (forward_url !== "") {
      window.location.replace(forward_url);
    }
  });
};
