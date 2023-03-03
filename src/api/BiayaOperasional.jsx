import axios from "./axios";

export default function getBiayaOperasional(setData, setSts) {

    axios
    .get("https://nusa.nuncorp.id/golang/api/v1/payment-report/operational-payment/fetch")
    .then((res) => {
    setData(res.data.data);
    setSts({ type: 'success' });
    })
    .catch((error) => {
    setSts({ type: 'error', error });
    });
}