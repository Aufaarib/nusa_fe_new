import axios from "./axios";
import {
  AlertStatusTambahSuccess,
  AlertStatusTambahFailed,
} from "../components/ModalPopUp";

export function postTransfer(setStatus, postDataTransfer, path) {
  axios
    .post(process.env.REACT_APP_NUSA + "/transaction/create", postDataTransfer)
    .then(() => {
      setStatus({ type: "success" });
      // console.log(postDataTransfer);
      AlertStatusTambahSuccess(path);
    })
    .catch((error) => {
      setStatus({ type: "error", error });
      // console.log(error);
      AlertStatusTambahFailed();
    });
}

export function postCash(setStatus, postDataCash, path) {
  axios
    .post(process.env.REACT_APP_NUSA + "/transaction/create", postDataCash)
    .then(() => {
      setStatus({ type: "success" });
      // console.log(postDataCash);
      AlertStatusTambahSuccess(path);
    })
    .catch((error) => {
      setStatus({ type: "error", error });
      console.log(error);
      AlertStatusTambahFailed();
    });
}
