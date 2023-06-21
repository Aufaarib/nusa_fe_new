import Swal from "sweetalert2";
import {
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";
import { useNavigate } from "react-router-dom";

export function getCostCenter(setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA + `/cost-center/fetch`)
    .then((res) => {
      setData(res.data.data);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });

  // axios.get(`https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-cost-center`)
  // .then((res) => {
  //     setData(res.data);
  //     setSts({ type: 'success' });
  // })
  // .catch((error) => {
  //     setSts({ type: 'error', error });
  // });
}

export function getCostCenterPendidikan(setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA + `/cost-center/fetch`)
    .then((res) => {
      const data = res.data.data.filter((e) => e.group === "Biaya Pendidikan");
      setData(data);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });

  // axios.get(`https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-cost-center`)
  // .then((res) => {
  //     const data = res.data.filter(
  //         (e) => e.group === "Biaya Pendidikan"
  //     );
  //     setData(data);
  //     setSts({ type: 'success' });
  // })
  // .catch((error) => {
  //     setSts({ type: 'error', error });
  // });
}

export function getCostCenterOperasional(setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA + `/cost-center/fetch`)
    .then((res) => {
      const data = res.data.data.filter((e) => e.group === "Operasional");
      setData(data);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });

  // axios.get(`https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-cost-center`)
  // .then((res) => {
  //     const data = res.data.filter(
  //         (e) => e.group === "Operasional"
  //     );
  //     setData(data);
  //     setSts({ type: 'success' });
  // })
  // .catch((error) => {
  //     setSts({ type: 'error', error });
  // });
}

export function deleteCostCenter(setSts, deleteId, setData) {
  axios
    .delete(process.env.REACT_APP_NUSA + `/cost-center/delete/${deleteId}`)
    .then(() => {
      setSts({ type: "success" });
      AlertStatusHapusSuccess();
      getCostCenter(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusHapusFailed();
    });

  // axios.delete(`https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-cost-center/${deleteId}`)
  // .then(() => {
  //     setSts({ type: 'success' });
  //   })
  // .catch((error) => {
  //     setSts({ type: 'error', error });
  // });
}

export function postCostCenter(
  setStatus,
  path,
  code,
  group,
  sub_group,
  item,
  payment_type,
  created_by
) {
  axios
    .post(process.env.REACT_APP_NUSA + "/cost-center/create", {
      code,
      group,
      sub_group,
      item,
      payment_type,
      created_by,
    })
    .then(() => {
      setStatus({ type: "success" });
      AlertStatusTambahSuccess(path);
    })
    .catch((error) => {
      setStatus({ type: "error", error });
      AlertStatusTambahFailed();
    });

  // axios.post('https://63e1c25ff59c591411a61021.mockapi.io/nusa-list-cost-center',{
  //     code,
  //     group,
  //     sub_group,
  //     item,
  //     payment_type,
  //     created_by
  // })
  // .then(() => {
  //     setStatus({ type: 'success' });
  // })
  // .catch((error) => {
  //     setStatus({ type: 'error', error });
  // });
}
