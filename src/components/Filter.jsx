import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.small ? 5 : undefined
}))
`
  display: inline-block;
  float: left;
  height: 30px;
  width: 200px;
  border-radius: 5px;
  border: 1px solid #BFBFBF;
  padding: 0 32px 0 16px;
`;

export const FilterComponent = ({ filterText, onFilter, onClick}) =>
{
  return(
    <>
    <div style={{ display : "block", backgroundColor : "#D5D5D540", padding : "5px 14px", marginBottom : "10px", borderRadius : "10px", overflow : "auto"}}>
      <Input 
        id="search"
        placeholder="Pencarian..."
        value={filterText}
        onChange={onFilter}
      />
      {/* <select style={{ borderRadius : "2px", width : "auto", height : "30px", marginLeft : "10px", fontSize : "12px" }} id="per-page">
          <option value="10">Tampilkan 10</option>
          <option value="25">Tampilkan 25</option>
          <option value="50">Tampilkan 50</option>
      </select> */}
      <div style={{ display : "inline-block", float : "right"}}>
        <button style={{ fontSize : "12px" }} className="btn-mrh" onClick={onClick}><i className="fa fa-plus mr-2 mt-1"></i>Tambah</button>
      </div>
    </div>
    </>
  );
} 

export const FilterComponentSaring = ({ filterText, onFilter, onClick}) =>
{
  return(
    <>
    <div style={{ display : "block", backgroundColor : "#D5D5D540", padding : "5px 14px", marginBottom : "10px", borderRadius : "10px", overflow : "auto"}}>
      <Input 
        id="search"
        placeholder="Pencarian..."
        value={filterText}
        onChange={onFilter}
      />
      <div style={{ display : "inline-block", float : "right"}}>
        <button style={{ fontSize : "12px" }} className="btn-mrh" onClick={onClick}><i className="fa fa-filter mr-2 mt-1"></i>Saring</button>
      </div>
    </div>
    </>
  );
} 

export const FilterDate = ({ selectedStart, onChangeStart, selectedEnd, onChangeEnd}) =>
{
  return(
    <div style={{ display : "flex" }}>
      <label style={{ marginRight : "10px" }} htmlFor="custom-date-picker-input">Tanggal Awal:</label>
      <DatePicker
        selected={selectedStart}
        onChange={onChangeStart}
        className="custom-date-picker" // Add custom class name
        dateFormat="yyyy-MM-dd" // Set date format
        calendarClassName="custom-date-picker-calendar" // Set calendar class name
        popperPlacement="bottom" // Set calendar position
      />
      <br/>
      <label style={{ marginRight : "10px" }} htmlFor="custom-date-picker-input">Tanggal Akhir:</label>
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
} 