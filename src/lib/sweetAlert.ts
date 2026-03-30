import Swal from "sweetalert2";
import { Messages } from "./config";

const gymStyle = {
  background: "#0f172a", // dark navy
  color: "#e5e7eb",
  backdrop: "rgba(0,0,0,0.8)",
  customClass: {
    popup: "rounded-2xl shadow-2xl",
    title: "text-lg font-semibold",
    htmlContainer: "text-sm opacity-80",
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
    confirmButtonColor: "#ef4444", // red
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
    background: "#111827",
    color: "#d1fae5",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
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
    confirmButtonColor: "#ef4444",
  }).then(() => {
    if (forward_url !== "") {
      window.location.replace(forward_url);
    }
  });
};