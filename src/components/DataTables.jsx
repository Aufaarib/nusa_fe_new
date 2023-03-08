import DataTable from "react-data-table-component";

export default function DataTables ({columns, data, defaultSortFieldId}) {

    const CustomStylesTable = {
        cells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
                justifyContent: 'center',
                fontWeight: 'bold',
                width: 'auto',
            },
        },
        rows: {
            style: {
                backgroundColor: '#D5D5D540',
                marginTop: '10px',
                borderRadius: '10px',
                border: '0px',
                width: 'auto',
                '&:not(:last-of-type)': {
                    border: '0px'
            },
        },
            },
		denseStyle: {
			minHeight: '32px',
        },
        headRow: {
            style: {
                backgroundColor: '#8F0D1E',
                minHeight: '52px',
                borderRadius: '10px',
                maxWidth: '100%'
            },
            denseStyle: {
                minHeight: '32px',
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                justifyContent: 'center',
                color: 'rgb(243 241 241)',
                maxWidth: '100%'
            },
        },
        pagination: {
            style: {
                marginTop: '10px',
                color: "black",
                fontSize: '13px',
                minHeight: '56px',
                backgroundColor: "#D5D5D540",
                border: '1px solid black',
                borderRadius: '10px'
            },
            pageButtonsStyle: {
                borderRadius: '50%',
                height: '40px',
                width: '40px',
                padding: '8px',
                margin: 'px',
                cursor: 'pointer',
                transition: '0.4s',
                color: "black",
                fill: "black",
                backgroundColor: 'transparent',
                '&:disabled': {
                    cursor: 'unset',
                    // color: theme.button.disabled,
                    // fill: theme.button.disabled,
                },
                '&:hover:not(:disabled)': {
                    // backgroundColor: theme.button.hover,
                },
                '&:focus': {
                    outline: 'none',
                    // backgroundColor: theme.button.focus,
        },
            },
        },
      };

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
            defaultSortAsc={false}
            defaultSortFieldId={defaultSortFieldId}
        />
    )


};