import axios from "./axios";

export function getBiayaPendidikan(setData, setSts) {

    axios
        .get(process.env.REACT_APP_NUSA + `/payment-report/educational-payment/fetch`)
        .then((res) => {
        setData(res.data.data);
        setSts({ type: 'success' });
        })
        .catch((error) => {
        setSts({ type: 'error', error });
        });

    // axios
    // .get(`https://63f2e9beaab7d091250fb6d3.mockapi.io/nusa-biaya-pendidikan`)
    // .then((res) => {
    // setData(res.data);
    // setSts({ type: 'success' });
    // })
    // .catch((error) => {
    // setSts({ type: 'error', error });
    // });

}

export function getBiayaPendidikanByDate(setData, setSts, startDate, endDate) {

    axios
        .get(process.env.REACT_APP_NUSA + `/payment-report/educational-payment/fetch?startDate=${startDate}&endDate=${endDate}`)
        .then((res) => {
        setData(res.data.data);
        setSts({ type: 'success' });
        })
        .catch((error) => {
        setSts({ type: 'error', error });
        });

}