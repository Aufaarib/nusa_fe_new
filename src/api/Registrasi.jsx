import {
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getAdmissionRegistration(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/admission/registration", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      console.log("ADMISSION REGISTRATION === ", res.data.body);
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function getMyAdmission(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/user/admission", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      console.log("My Admission === ", res.data.body);
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function getAdmissionRegistrationApplicant(setData, setSts, regId) {
  axios
    .get(
      process.env.REACT_APP_BASE_URL +
        "/admission/registration/REG00001/applicant",
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      console.log("REGISTRATION APLICANT === ", res.data.body.applicant);
      setData(res.data.body.applicant);
      setSts(res.data.code);
    })
    .catch((error) => {
      setSts(error.data.code);
    });
}

export function getAdmissionRegistrationParentsAyah(setData, setSts) {
  axios
    .get(
      process.env.REACT_APP_BASE_URL +
        "/admission/registration/REG00001/parent",
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      for (const i of res.data.body.parents) {
        switch (i.relationship) {
          case "ayah":
            console.log("REGISTRATION PARENTS AYAH === ", i);
            setData(i);
            setSts(res.data.code);
        }
      }
    })
    .catch((error) => {
      setSts(error.data.code);
    });
}
export function getAdmissionRegistrationParentsIbu(setData, setSts) {
  axios
    .get(
      process.env.REACT_APP_BASE_URL +
        "/admission/registration/REG00001/parent",
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      for (const i of res.data.body.parents) {
        switch (i.relationship) {
          case "ibu":
            console.log("REGISTRATION PARENTS IBU === ", i);
            setData(i);
            setSts(res.data.code);
        }
      }
    })
    .catch((error) => {
      setSts(error.data.code);
    });
}

export function getAdmissionRegistrationParentsWali(setData, setSts) {
  axios
    .get(
      process.env.REACT_APP_BASE_URL +
        "/admission/registration/REG00001/parent",
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      for (const i of res.data.body.parents) {
        switch (i.relationship) {
          case "perwalian":
            console.log("REGISTRATION PARENTS WALI === ", i);
            setData(i);
            setSts(res.data.code);
        }
      }
    })
    .catch((error) => {
      setSts(error.data.code);
    });
}

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

export function postAdmissionRegistration(
  setSts,
  path,
  code,
  name,
  startDate,
  endDate,
  amount
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + `admission/${code}/phase`,
      {
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
