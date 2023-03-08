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
      <div style={{ display : "inline-block", float : "right"}}>
        <button style={{ fontSize : "12px" }} className="btn-mrh"><i className="fa fa-filter mr-2 mt-1"></i>Saring</button>
      </div>
    </div>
    </>
  );
} 

export const FilterDate = ({ selectedStart, onChangeStart, selectedEnd, onChangeEnd}) =>
{
  return(
    <div>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={selectedStart}
        onChange={onChangeStart}
      />
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={selectedEnd}
        onChange={onChangeEnd}
      />
    </div>
  );
} 