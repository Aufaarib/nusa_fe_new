import {
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateDataSuccess,
  AlertStatusUpdateFailed,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getKelas(setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA + "/class/fetch")
    .then((res) => {
      setData(res.data.data);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });

  // axios
  //     .get("https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-bank")
  //     .then((res) => {
  //     setData(res.data);
  //     setSts({ type: 'success' });
  //     })
  //     .catch((error) => {
  //     setSts({ type: 'error', error });
  //     });
}

export function updateKelas(setSts, path, name, description, id) {
  axios
    .post(process.env.REACT_APP_NUSA + `/class/update/${id}`, {
      name,
      description,
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateDataSuccess(path);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}

export function postKelas(setSts, path, name, description) {
  axios
    .post(process.env.REACT_APP_NUSA + "/class/create", {
      name,
      description,
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusTambahSuccess(path);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusTambahFailed();
    });
}

export function deleteKelas(setSts, deleteId, setData) {
  axios
    .delete(process.env.REACT_APP_NUSA + `/class/delete/${deleteId}`)
    .then(() => {
      setSts({ type: "success" });
      AlertStatusHapusSuccess();
      getKelas(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusHapusFailed();
    });
}
