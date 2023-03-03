import axios from "./axios";

export default function getBank(setData, setSts) {

    axios
        .get("https://nusa.nuncorp.id/golang/api/v1/bank/fetch")
        .then((res) => {
        console.log(res.data.data)
        setData(res.data.data);
        setSts({ type: 'success' });
        })
        .catch((error) => {
        setSts({ type: 'error', error });
        });


}