import DataTable from "react-data-table-component";
import { CustomStylesTable } from "./CustomStyles";

export default function DataTables ({columns, data}) {

    return(
        <DataTable
            pagination
            paginationComponentOptions={{
            rowsPerPageText: 'Tampilkan',
            rangeSeparatorText: 'dari',
            selectAllRowsItem: true,
            selectAllRowsItemText: 'Seluruh'
            }}
            columns={columns}
            customStyles={CustomStylesTable}
            data={data}
        />
    )


};