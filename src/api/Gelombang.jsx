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

//   export function getAdmissionRegistration(setData, setSts) {
//     axios
//       .get(process.env.REACT_APP_BASE_URL + "/admission/registration", {
//         headers: { authorization: localStorage.getItem("TOKEN") },
//       })
//       .then((res) => {
//         console.log(res.data.body);
//         setData(res.data.body);
//         setSts({ type: "success" });
//       })
//       .catch((error) => {
//         setSts({ type: "error", error });
//       });

// axios
//     .get("https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-bank")
//     .then((res) => {
//     setData(res.data);
//     setSts({ type: 'success' });
//     })
//     .catch((error) => {
//     setSts({ type: 'error', error });
//     });
//   }

// export function updateGuru(
//   setSts,
//   path,
//   code,
//   Fullname,
//   Gender,
//   Religion,
//   BirthPlace,
//   BirthDate
// ) {
//   axios
//     .put(
//       process.env.REACT_APP_BASE_URL + `/teacher/${code}`,
//       {
//         Fullname,
//         Gender,
//         Religion,
//         BirthPlace,
//         BirthDate,
//       },
//       { headers: { authorization: localStorage.getItem("TOKEN") } }
//     )
//     .then(() => {
//       setSts({ type: "success" });
//       AlertStatusUpdateSuccess(path);
//     })
//     .catch((error) => {
//       setSts({ type: "error", error });
//       AlertStatusUpdateFailed();
//     });
// }

export function updateAdmissionPhase(
  setSts,
  path,
  id,
  code,
  increment,
  name,
  startDate,
  endDate,
  amount
) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/admission/${code}/phase/${id}`,
      {
        increment,
        name,
        startDate,
        endDate,
        amount,
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

export function postAdmissionPhase(
  setSts,
  path,
  code,
  increment,
  name,
  startDate,
  endDate,
  amount
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + `/admission/${code}/phase`,
      {
        increment,
        name,
        startDate,
        endDate,
        amount,
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
