import axios from "./axios";

export function getBiayaPendidikan(setData, setSts) {

    axios
        .get(`https://nusa.nuncorp.id/golang/api/v1/payment-report/educational-payment/fetch`)
        .then((res) => {
        setData(res.data.data);
        setSts({ type: 'success' });
        })
        .catch((error) => {
        setSts({ type: 'error', error });
        });


}

export function getBiayaPendidikanByDate(setData, setSts, startDate, endDate) {

    axios
        .get(`https://nusa.nuncorp.id/golang/api/v1/payment-report/educational-payment/fetch?startDate=${startDate}&endDate=${endDate}`)
        .then((res) => {
        setData(res.data.data);
        setSts({ type: 'success' });
        })
        .catch((error) => {
        setSts({ type: 'error', error });
        });


}