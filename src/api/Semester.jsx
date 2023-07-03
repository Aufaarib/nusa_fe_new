import {
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateDataSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getSemester(setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA + "/semester/fetch")
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

export function updateStatusSemester(setSts, status, id, setData) {
  axios
    .post(process.env.REACT_APP_NUSA + `/semester/update/${id}`, {
      status,
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateSuccess();
      getSemester(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}

export function updateSemester(setSts, path, name, description, status, id) {
  axios
    .post(process.env.REACT_APP_NUSA + `/semester/update/${id}`, {
      name,
      status,
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

export function postSemester(setSts, path, name, description, status) {
  axios
    .post(process.env.REACT_APP_NUSA + "/semester/create", {
      name,
      status,
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

export function deleteSemester(setSts, deleteId, setData) {
  axios
    .delete(process.env.REACT_APP_NUSA + `/semester/delete/${deleteId}`)
    .then(() => {
      setSts({ type: "success" });
      AlertStatusHapusSuccess();
      getSemester(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusHapusFailed();
    });
}
