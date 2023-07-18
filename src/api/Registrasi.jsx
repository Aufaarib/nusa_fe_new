import {
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusReVerified,
  AlertStatusReVerifiedFailed,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateDataSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function validateEmail(setSts, otp) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL + "/user/verification",
      { otp },
      { headers: { authorization: localStorage.getItem("TOKEN") } }
    )
    .then((res) => {
      // console.log("ADMISSION STATEMENT === ", otp);
      // setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      // console.log("ADMISSION STATEMENT === ", otp);
      setSts({ type: "error", error });
    });
}

export function revalidateEmail(setSts, otp) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/user/verification", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      // console.log("ADMISSION STATEMENT === ", otp);
      // setData(res.data.body);
      setSts({ type: "success" });
      AlertStatusReVerified();
    })
    .catch((error) => {
      // console.log("ADMISSION STATEMENT === ", otp);
      setSts({ type: "error", error });
      AlertStatusReVerifiedFailed();
    });
}

export function getAdmissionStatement(setData, setSts) {
  axios
    .get(process.env.REACT_APP_BASE_URL + "/admission/statement", {
      headers: { authorization: localStorage.getItem("TOKEN") },
    })
    .then((res) => {
      // console.log("ADMISSION STATEMENT === ", res.data.body);
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function getAdmissionAnswer(setData, setSts) {
  axios
    .get(
      process.env.REACT_APP_BASE_URL +
        "/admission/registration/REG00001/statement",
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      // console.log("ADMISSION STATEMENT ANSWER === ", res.data.body);
      setData(res.data.body.statements);
      setSts(res.data.code);
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
      // console.log("ADMISSION REGISTRATION === ", res.data.body);
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
      // console.log("My Admission === ", res.data.body);
      setData(res.data.body);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function getAdmissionSteps(setData, setSts) {
  axios
    .get(
      process.env.REACT_APP_BASE_URL + "/admission/registration/REG00001/steps",
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      // console.log("REGISTRATION STEPS === ", res.data.body);
      setData(res.data.body);
      setSts(res.data.code);
    });
  // .catch((res) => {
  //   setSts(res.data.code);
  // });
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
      // console.log("REGISTRATION APLICANT === ", res.data.body.applicant);
      setData(res.data.body.applicant);
      setSts(res.data.code);
    });
  // .catch((res) => {
  //   setSts(res.data.code);
  // });
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
            // console.log("REGISTRATION PARENTS IBU === ", i);
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
            // console.log("REGISTRATION PARENTS WALI === ", i);
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

export function getPaymentInvoice(setData, setSts, code) {
  axios
    .get(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${code}/payment`,
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then((res) => {
      for (const i of res.data.body) {
        console.log("OAAAAAAA === ", i);
        setData(i);
        setSts({ type: "success" });
      }
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function uploadHasilTest(setData, setSts, code) {
  axios
    .post(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${code}/aproved/registration`,
      {},
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setSts({ type: "success" });
      setData();
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });
}

export function approvedRegistration(setData, setSts, code) {
  axios
    .put(
      process.env.REACT_APP_BASE_URL +
        `/admission/registration/${code}/aproved/registration`,
      {},
      {
        headers: { authorization: localStorage.getItem("TOKEN") },
      }
    )
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateSuccess();
      getAdmissionRegistration(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}
