import React from 'react';
import DataTable from "react-data-table-component";
import { useState} from "react";

export default function DataTables ({columns, data, defaultSortFieldId}) {

    const CustomStylesTable = {
        table: {
            style: {
                width: 'auto', // set the width of the table wrapper
            },
        },
        cells: {
            style: {
                paddingLeft: '20px', // override the cell padding for data cells
                justifyContent: 'center',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                backgroundColor: '#D5D5D540',
                marginTop: '10px',
                borderRadius: '10px',
                border: '0px',
                minHeight: '72px', // override the row height
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
            },
            denseStyle: {
                minHeight: '32px',
            },
        },
        headCells: {
            style: {
                paddingLeft: '20px', // override the cell padding for head cells
                paddingRight: '10px',
                justifyContent: 'center',
                color: 'rgb(243 241 241)',
            },
        },
        pagination: {
            style: {
                marginTop: '10px',
                color: "black",
                borderRadius: '10px',
                fontSize: '13px',
                minHeight: '56px',
                backgroundColor: "#D5D5D540",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
                    cursor: 'not-allowed',
                    color: 'grey',
                    fill: 'grey',
                },
                '&:hover:disabled': {
                    backgroundColor: '#D5D5D540',
                },
                '&:hover:not(:disabled)': {
                    backgroundColor: '#8F0D1E',
                },
                '&:focus': {
                    outline: 'none',
                    backgroundColor: "#8F0D1E",
                },
            },
        },
    };
    
    return(
        <>
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
        </>
    )
};