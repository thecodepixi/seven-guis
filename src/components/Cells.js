import React, { useState } from 'react';

// lowest level component, handles each individual cell of the table
const Cell = (props) => {
  const [cellData, setCellData] = useState([]);

  const handleCellChange = (e) => {
    setCellData(e.target.value);
  };
};

// take in passed down y value to add the right number of cells to the row
const Row = (props) => {};

// pass x and y props to table to get table size rows/columns
const Table = ({ x, y }) => {};
