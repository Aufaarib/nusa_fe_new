import {
  AlertStatusHapusFailed,
  AlertStatusHapusSuccess,
  AlertStatusTambahFailed,
  AlertStatusTambahSuccess,
  AlertStatusUpdateFailed,
  AlertStatusUpdateSuccess,
} from "../components/ModalPopUp";
import axios from "./axios";

export function getTipeTransaksi(setData, setSts) {
  axios
    .get(process.env.REACT_APP_NUSA + "/transaction-type/fetch")
    .then((response) => {
      setData(response.data.data);
      setSts({ type: "success" });
    })
    .catch((error) => {
      setSts({ type: "error", error });
    });

  //     axios.get("https://63dcbb592308e3e319eca644.mockapi.io/nusa-tipe-transaksi")
  //     .then((response) => {
  //     setData(response.data);
  //     setSts({ type: 'success' });
  //     })
  //     .catch((error) => {
  //     setSts({ type: 'error', error });
  //     });
}

export function deleteTipeTransaksi(setSts, deleteId, setData) {
  axios
    .delete(process.env.REACT_APP_NUSA + `/transaction-type/delete/${deleteId}`)
    .then(() => {
      setSts({ type: "success" });
      AlertStatusHapusSuccess();
      getTipeTransaksi(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusHapusFailed();
    });

  // axios.delete(`https://63dcbb592308e3e319eca644.mockapi.io/nusa-tipe-transaksi/${deleteId}`)
  // .then(() => {
  //   setSts({ type: 'success' });
  //   })
  // .catch((error) => {
  //     setSts({ type: 'error', error });
  // });
}

export function postTipeTransaksi(
  setSts,
  description,
  status,
  created_by,
  path
) {
  axios
    .post(process.env.REACT_APP_NUSA + "/transaction-type/create", {
      description,
      status,
      created_by,
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusTambahSuccess(path);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusTambahFailed();
    });

  // axios.post('https://63dcbb592308e3e319eca644.mockapi.io/nusa-tipe-transaksi',{
  //     description,
  //     status,
  //     created_by
  // })
  // .then(() => {
  //     setSts({ type: 'success' });
  // })
  // .catch((error) => {
  //     setSts({ type: 'error', error });
  // });
}

export function updateTipeTransaksi(setSts, status, id, setData) {
  axios
    .post(process.env.REACT_APP_NUSA + `/transaction-type/update/${id}`, {
      status,
    })
    .then(() => {
      setSts({ type: "success" });
      AlertStatusUpdateSuccess();
      getTipeTransaksi(setData, setSts);
    })
    .catch((error) => {
      setSts({ type: "error", error });
      AlertStatusUpdateFailed();
    });
}
