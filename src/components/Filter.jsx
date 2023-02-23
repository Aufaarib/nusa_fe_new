import React from "react";
import styled from "styled-components";

const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.small ? 5 : undefined
}))
`
  height: 32px;
  width: 200px;
  margin-bottom: 20px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #BFBFBF;
  padding: 0 32px 0 16px;
`;

const FilterComponent = ({ filterText, onFilter, onClick}) => (
  <>
    <button className="btn-ungu float-right mb-5" onClick={onClick}><i className="fa fa-plus-square-o mr-2 mt-1"></i> Tambah</button>

    <Input 
      id="search"
      placeholder="Pencarian..."
      value={filterText}
      onChange={onFilter}
    />
  </>
);

export default FilterComponent;
