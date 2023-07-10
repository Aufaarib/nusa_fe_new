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

export function getTahunAjaran(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/academic/year", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      console.log(res.data.body);
      setData(res.data.body);
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

export function updateTahunAjaran(
  setSts,
  path,
  year,
  name,
  status,
  curriculumId,
  code
) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/academic/year/${code}`,
      {
        year,
        name,
        status,
        curriculumId,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateDataSuccess(path);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}

// export function updateStatusKurikulum(setSts, code, setData) {
//   axios
//     .put(
//       process.env.REACT_APP_BASE_URL + `/curriculum/${code}/toggle-status`,
//       null,
//       {
//         headers: { authorization: localStorage.getItem("TOKEN") },
//       }
//     )
//     .then(() => {
//       setSts({ type: "success" });
//       AlertStatusUpdateSuccess();
//       getKurikulum(setData, setSts);
//     })
//     .catch((error) => {
//       setSts({ type: "error", error });
//       AlertStatusUpdateFailed();
//     });
// }

export function postTahunAjaran(
  setSts,
  path,
  year,
  name,
  status,
  curriculumId
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/academic/year",
      {
        year,
        name,
        status,
        curriculumId,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusTambahSuccess(path);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusTambahFailed();
    });
}

// export function deleteKurikulum(setSts, deleteId, setData) {
//   axios
//     .delete(process.env.REACT_APP_NUSA + `/curriculum/delete/${deleteId}`)
//     .then(() => {
//       setSts({ type: "success" });
//       AlertStatusHapusSuccess();
//       getKurikulum(setData, setSts);
//     })
//     .catch((error) => {
//       setSts({ type: "error", error });
//       AlertStatusHapusFailed();
//     });
// }
