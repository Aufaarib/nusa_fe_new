import axios from "./axios";

export default function getTipeTransaksi(setData, setSts) {

    axios.get("https://nusa.nuncorp.id/golang/api/v1/transaction-type/fetch")
        .then((response) => {
        setData(response.data.data);
        setSts({ type: 'success' });
        })
        .catch((error) => {
        setSts({ type: 'error', error });
        });


}