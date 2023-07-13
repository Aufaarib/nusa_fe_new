import {
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getAdmissionStatement(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/admission/statement", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      console.log("ADMISSION STATEMENT === ", res.data.body);
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

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

// export function getAdmissionRegistration(setData, setSts) {
//   axios
//     .get(process.env.REACT_APP_BASE_URL + "/admission/registration", {
//       headers: { authorization: localStorage.getItem("TOKEN") },
//     })
//     .then((res) => {
//       console.log("ADMISSION REGISTRATION === ", res.data.body);
//       setData(res.data.body);
//       setSts({ type: "success" });
//     })
//     .catch((error) => {
//       setSts({ type: "error", error });
//     });
// }

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

export function postAdmissionAnswer(
  setSts,
  // path,
  code,
  name,
  questionId,
  answer,
  amount
) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + `registration/REG00001/statement`,
      {
        questionId,
        answer,
      },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then(() => {
      setSts({ type: "success" });
      // AlertStatusTambahSuccess(path);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      // AlertStatusTambahFailed();
    });
}

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
