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

export function getAdmission(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/admission", {
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
}

export function getAdmissionDetails(setData, setSts, code) {
  axios
    .get(process.env.REACT_APP_BASE_URL + `/admission/${code}`, {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      console.log(res.data.body.phases);
      setData(res.data.body.phases);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

//   export function updateKurikulum(setSts, path, code, name, description) {
//     axios
//       .put(
//         process.env.REACT_APP_BASE_URL + `/curriculum/${code}`,
//         {
//           name,
//           description,
//         },
//         { headers: { authorization: localStorage.getItem("TOKEN") } }
//       )
//       .then(() => {
//         setSts({ type: "success" });
//         AlertStatusUpdateDataSuccess(path);
//       })
//       .catch((error) => {
//         setSts({ type: "error", error });
//         AlertStatusUpdateFailed();
//       });
//   }

export function updateStatusAdmission(setSts, code, setData) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL + `/admission/${code}/toggle-status`,
      null,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateSuccess();
      getAdmission(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}

export function postAdmission(
  setSts,
  path,
  academicYearId,
  name,
  increment,
  startDate,
  endDate,
  amount
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/admission",
      {
        academicYearId: academicYearId,
        phases: [
          {
            increment: increment,
            name: name,
            startDate: startDate,
            endDate: endDate,
            amount: amount,
          },
        ],
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

//   export function deleteKurikulum(setSts, deleteId, setData) {
//     axios
//       .delete(process.env.REACT_APP_NUSA + `/curriculum/delete/${deleteId}`)
//       .then(() => {
//         setSts({ type: "success" });
//         AlertStatusHapusSuccess();
//         getKurikulum(setData, setSts);
//       })
//       .catch((error) => {
//         setSts({ type: "error", error });
//         AlertStatusHapusFailed();
//       });
//   }
