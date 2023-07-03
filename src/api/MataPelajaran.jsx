import {
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getMapel(setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA + "/course/fetch")
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

export function updateStatusMapel(setSts, status, id, setData) {
  axios
    .post(process.env.REACT_APP_NUSA + `/course/update/${id}`, {
      status,
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateSuccess();
      getMapel(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}

export function updateMapel(
  setSts,
  code,
  course_name,
  description,
  group_course_id,
  id
) {
  axios
    .post(process.env.REACT_APP_NUSA + `/course/update/${id}`, {
      code,
      course_name,
      description,
      group_course_id,
    })
    .then(() => {
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function postMapel(
  setSts,
  code,
  course_name,
  description,
  group_course_id,
  status,
  created_by
) {
  axios
    .post(process.env.REACT_APP_NUSA + "/course/create", {
      code,
      course_name,
      description,
      group_course_id,
      status,
      created_by,
    })
    .then(() => {
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function deleteMapel(setSts, deleteId, setData) {
  axios
    .delete(process.env.REACT_APP_NUSA + `/course/delete/${deleteId}`)
    .then(() => {
      setSts({ type: "success" });
      AlertStatusHapusSuccess();
      getMapel(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusHapusFailed();
    });
}
