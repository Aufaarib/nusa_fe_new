import {
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getGuru(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/teacher", {
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

export function updateGuru(
  setSts,
  path,
  code,
  Fullname,
  Gender,
  Religion,
  BirthPlace,
  BirthDate
) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/teacher/${code}`,
      {
        Fullname,
        Gender,
        Religion,
        BirthPlace,
        BirthDate,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateSuccess(path);
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

export function postGuru(
  setSts,
  path,
  fullname,
  gender,
  religion,
  birthPlace,
  birthDate
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/teacher",
      {
        fullname,
        gender,
        religion,
        birthPlace,
        birthDate,
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
