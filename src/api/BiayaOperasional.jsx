import axios from "./axios";

export function getBiayaOperasional(setData, setSts) {

    axios
    .get(process.env.REACT_APP_NUSA + "/payment-report/operational-payment/fetch")
    .then((res) => {
    setData(res.data.data);
    setSts({ type: 'success' });
    })
    .catch((error) => {
    setSts({ type: 'error', error });
    });
}

export function getBiayaOperasionalByDate(setData, setSts, startDate, endDate) {

    axios
    .get(process.env.REACT_APP_NUSA + `/payment-report/operational-payment/fetch?startDate=${startDate}&endDate=${endDate}`)
    .then((res) => {
    setData(res.data.data);
    setSts({ type: 'success' });
    })
    .catch((error) => {
    setSts({ type: 'error', error });
    });
}