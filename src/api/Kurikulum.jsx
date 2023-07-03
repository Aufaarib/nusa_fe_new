import {
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getKurikulum(setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA + "/curriculum/fetch")
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

export function updateKurikulum(
  setSts,
  code,
  name,
  description,
  semester_id,
  updateId
) {
  axios
    .post(process.env.REACT_APP_NUSA + `/curriculum/update/${updateId}`, {
      code,
      name,
      description,
      semester_id,
    })
    .then(() => {
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function updateStatusKurikulum(setSts, status, updateId, setData) {
  axios
    .post(process.env.REACT_APP_NUSA + `/curriculum/update/${updateId}`, {
      status,
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateSuccess();
      getKurikulum(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}

export function postKurikulum(
  setSts,
  code,
  name,
  status,
  description,
  semester_id,
  created_by
) {
  axios
    .post(process.env.REACT_APP_NUSA + "/curriculum/create", {
      code,
      name,
      status,
      description,
      semester_id,
      created_by,
    })
    .then(() => {
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function deleteKurikulum(setSts, deleteId, setData) {
  axios
    .delete(process.env.REACT_APP_NUSA + `/curriculum/delete/${deleteId}`)
    .then(() => {
      setSts({ type: "success" });
      AlertStatusHapusSuccess();
      getKurikulum(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusHapusFailed();
    });
}
