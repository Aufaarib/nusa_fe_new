import React from "react";
import styled from "styled-components";

const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.small ? 5 : undefined
}))
`
  height: 32px;
  width: 200px;
  margin-left: 54rem;
  margin-bottom: 10px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #BFBFBF;
  padding: 0 32px 0 16px;
`;

const FilterComponent = ({ filterText, onFilter}) => (
  <>
    <Input 
      id="search"
      type="text"
      placeholder="Cari Nama Pemilik..."
      value={filterText}
      onChange={onFilter}
    />
  </>
);

export default FilterComponent;
