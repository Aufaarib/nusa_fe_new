import {
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusTambahSuccess,
  AlertStatusUpdateDataSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getKelompokMapel(setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA + "/group-course/fetch")
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

export function updateStatusKelompokMapel(setSts, status, id, setData) {
  axios
    .post(process.env.REACT_APP_NUSA + `/group-course/update/${id}`, {
      status,
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateSuccess();
      getKelompokMapel(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}

export function updateKelompokMapel(
  setStatus,
  path,
  name,
  status,
  id,
  created_by
) {
  axios
    .post(process.env.REACT_APP_NUSA + `/group-course/update/${id}`, {
      name,
      status,
      created_by,
    })
    .then(() => {
      setStatus({ type: "success" });
      AlertStatusUpdateDataSuccess(path);
    })
    .catch((error) => {
      setStatus({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}

export function postKelompokMapel(setStatus, path, name, status, created_by) {
  axios
    .post(process.env.REACT_APP_NUSA + "/group-course/create", {
      name,
      status,
      created_by,
    })
    .then(() => {
      setStatus({ type: "success" });
      AlertStatusTambahSuccess(path);
    })
    .catch((error) => {
      setStatus({ type: "error", error });
      AlertStatusHapusFailed();
    });
}

export function deleteKelompokMapel(setSts, deleteId, setData) {
  axios
    .delete(process.env.REACT_APP_NUSA + `/group-course/delete/${deleteId}`)
    .then(() => {
      setSts({ type: "success" });
      AlertStatusHapusSuccess();
      getKelompokMapel(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusHapusFailed();
    });
}
