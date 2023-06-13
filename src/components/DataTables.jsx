import React, { useState } from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Table Components
export function DataTables({
  columns,
  data = [],
  defaultSortFieldId,
  filterText,
  onFilter,
  onClick,
}) {
  const CustomStylesTable = {
    table: {
      style: {
        width: "auto", // set the width of the table wrapper
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#D5D5D540",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };

  // CSS styles
  const styles = `
        .pagination {
            display: flex;
            border-radius: 10px;
            justify-content: center;
            background-color: #D5D5D540;
            margin-top: 20px;
            width: 100%;
            padding: 10px 0;
        }
        .pagination li {
            display: inline-block;
            margin-right: 5px;
            padding: 5px;
            border-radius: 15px;
            background-color: transparent;
            width: 40px;
            text-align: center;
        }
        .pagination li.active {
            background-color: #8F0D1E;
        }
        .pagination li.disabled {
            opacity: 0.5;
            cursor: default;
        }
        .pagination li a {
            cursor: pointer;
            color: black;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #fff;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: grey;
        }
        // .pagination li:hover{
        //     background-color: #8F0D1E;
        // }
        // .pagination li:hover a{
        //     background-color: #8F0D1E;
        //     color: #fff;
        // }
        .pagination li.disabled:hover{
            background-color: transparent;
        }
        .pagination li.disabled:hover a{
            background-color: transparent;
            color: grey;
        }
        `;

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState("all");

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    // setCurrentPage(0);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  let pageCount = 0;

  if (data !== null) {
    currentPageData =
      itemsPerPage === "all" ? data : data.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(data.length / itemsPerPage);
  }

  return (
    <>
      <FilterComponent
        data={data}
        onChangeRows={handleItemsPerPageChange}
        valueRows={itemsPerPage}
        filterText={filterText}
        onFilter={onFilter}
        onClick={onClick}
      />
      {data ? (
        <div>
          {data.length === 0 ? (
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "24px" }}>Loading...</h1>
            </div>
          ) : (
            <DataTable
              columns={columns}
              customStyles={CustomStylesTable}
              data={currentPageData}
              defaultSortAsc={false}
              defaultSortFieldId={defaultSortFieldId}
            />
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
        </div>
      )}
      {itemsPerPage !== "all" && (
        <div>
          <style>{styles}</style>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            forcePage={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      )}
    </>
  );
}

export function DataTablesSaring({
  columns,
  data = [],
  defaultSortFieldId,
  filterText,
  onFilter,
  onClick,
}) {
  const CustomStylesTable = {
    table: {
      style: {
        width: "auto", // set the width of the table wrapper
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#D5D5D540",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };

  // CSS styles
  const styles = `
        .pagination {
            display: flex;
            border-radius: 10px;
            justify-content: center;
            background-color: #D5D5D540;
            margin-top: 20px;
            width: 100%;
            padding: 10px 0;
        }
        .pagination li {
            display: inline-block;
            margin-right: 5px;
            padding: 5px;
            border-radius: 15px;
            background-color: transparent;
            width: 40px;
            text-align: center;
        }
        .pagination li.active {
            background-color: #8F0D1E;
        }
        .pagination li.disabled {
            opacity: 0.5;
            cursor: default;
        }
        .pagination li a {
            cursor: pointer;
            color: black;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #fff;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: grey;
        }
        .pagination li:hover{
            background-color: #8F0D1E;
        }
        .pagination li:hover a{
            background-color: #8F0D1E;
            color: #fff;
        }
        .pagination li.disabled:hover{
            background-color: transparent;
        }
        .pagination li.disabled:hover a{
            background-color: transparent;
            color: grey;
        }
        `;

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState("all");

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    // setCurrentPage(0);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  let pageCount = 0;

  if (data !== null) {
    currentPageData =
      itemsPerPage === "all" ? data : data.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(data.length / itemsPerPage);
  }

  return (
    <>
      <FilterComponentSaring
        data={data}
        onChangeRows={handleItemsPerPageChange}
        valueRows={itemsPerPage}
        filterText={filterText}
        onFilter={onFilter}
        onClick={onClick}
      />
      {data ? (
        <div>
          {data.length === 0 ? (
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "24px" }}>Loading...</h1>
            </div>
          ) : (
            <DataTable
              columns={columns}
              customStyles={CustomStylesTable}
              data={currentPageData}
              defaultSortAsc={false}
              defaultSortFieldId={defaultSortFieldId}
            />
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
        </div>
      )}
      {itemsPerPage !== "all" && (
        <div>
          <style>{styles}</style>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            forcePage={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      )}
    </>
  );
}

//Filter Components
const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
}))`
  display: inline-block;
  float: left;
  height: 30px;
  width: 200px;
  border-radius: 10px;
  border: 1px solid #bfbfbf;
  padding: 15px;
`;

export function FilterComponent({
  filterText,
  onFilter,
  onClick,
  data = [],
  onChangeRows,
  valueRows,
}) {
  return (
    <>
      <div
        style={{
          display: "block",
          padding: "14px",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <Input
          id="search"
          placeholder="Pencarian..."
          value={filterText}
          onChange={onFilter}
        />
        {data ? (
          <select
            style={{
              border: "1px solid grey",
              borderRadius: "10px",
              width: "auto",
              height: "30px",
              fontSize: "12px",
              padding: "5px",
              marginLeft: "10px",
            }}
            value={valueRows}
            onChange={onChangeRows}
          >
            <option value="5">Tampilkan 5</option>
            <option value="10">Tampilkan 10</option>
            <option value="15">Tampilkan 15</option>
            <option value="20">Tampilkan 20</option>
            <option value="all">Tampilkan Semua</option>
          </select>
        ) : (
          <select
            style={{
              border: "1px solid grey",
              borderRadius: "10px",
              width: "auto",
              height: "30px",
              fontSize: "12px",
              padding: "5px",
              marginLeft: "10px",
            }}
          >
            <option value="null">Data Tidak Tersedua</option>
          </select>
        )}
        <div style={{ display: "inline-block", float: "right" }}>
          <button
            style={{ fontSize: "12px" }}
            className="btn-mrh"
            onClick={onClick}
          >
            <i className="fa fa-plus mr-2 mt-1"></i>Tambah
          </button>
        </div>
      </div>
    </>
  );
}

export function FilterComponentSaring({
  filterText,
  onFilter,
  onClick,
  data = [],
  onChangeRows,
  valueRows,
}) {
  return (
    <>
      <div
        style={{
          display: "block",
          padding: "5px 14px",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <Input
          id="search"
          placeholder="Pencarian..."
          value={filterText}
          onChange={onFilter}
        />
        {data ? (
          <select
            style={{
              border: "1px solid grey",
              borderRadius: "10px",
              width: "auto",
              height: "30px",
              fontSize: "12px",
              padding: "5px",
              marginLeft: "10px",
            }}
            value={valueRows}
            onChange={onChangeRows}
          >
            <option value="5">Tampilkan 5</option>
            <option value="10">Tampilkan 10</option>
            <option value="15">Tampilkan 15</option>
            <option value="20">Tampilkan 20</option>
            <option value="all">Tampilkan Semua</option>
          </select>
        ) : (
          <select
            style={{
              border: "1px solid grey",
              borderRadius: "10px",
              width: "auto",
              height: "30px",
              fontSize: "12px",
              padding: "5px",
              marginLeft: "10px",
            }}
          >
            <option value="null">Data Tidak Tersedia</option>
          </select>
        )}
        <div style={{ display: "inline-block", float: "right" }}>
          <button
            style={{ fontSize: "12px" }}
            className="btn-mrh"
            onClick={onClick}
          >
            <i className="fa fa-filter mr-2 mt-1"></i>Saring
          </button>
        </div>
      </div>
    </>
  );
}

export const FilterDate = ({
  selectedStart,
  onChangeStart,
  selectedEnd,
  onChangeEnd,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <label style={{ marginRight: "10px" }} htmlFor="custom-date-picker-input">
        Tanggal Awal:
      </label>
      <DatePicker
        selected={selectedStart}
        onChange={onChangeStart}
        className="custom-date-picker" // Add custom class name
        dateFormat="yyyy-MM-dd" // Set date format
        calendarClassName="custom-date-picker-calendar" // Set calendar class name
        popperPlacement="bottom" // Set calendar position
      />
      <br />
      <label style={{ marginRight: "10px" }} htmlFor="custom-date-picker-input">
        Tanggal Akhir:
      </label>
      <DatePicker
        selected={selectedEnd}
        onChange={onChangeEnd}
        className="custom-date-picker" // Add custom class name
        dateFormat="yyyy-MM-dd" // Set date format
        calendarClassName="custom-date-picker-calendar" // Set calendar class name
        popperPlacement="bottom" // Set calendar position
      />
    </div>
  );
};
