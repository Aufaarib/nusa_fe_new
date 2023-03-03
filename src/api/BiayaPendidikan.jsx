import axios from "./axios";

export default function getBiayaPendidikan(setData, setSts) {

    axios
        .get("https://nusa.nuncorp.id/golang/api/v1/payment-report/educational-payment/fetch")
        .then((res) => {
        setData(res.data.data);
        setSts({ type: 'success' });
        })
        .catch((error) => {
        setSts({ type: 'error', error });
        });


}