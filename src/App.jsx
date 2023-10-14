import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const rows = [];
  for (let i = 1; i <= 7; i++) {
    const columns = [];
    for (let j = 1; j <= 10; j++) {
      columns.push(<td key={j}>Row {i}, Col {j}</td>);
    }
    rows.push(<tr key={i}>{columns}</tr>);
  }

  return (
    <div className='table-container'>
     <p className='add-new'>Add New</p>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Month, Year</th>
            <th>Dates ExCluded</th>
            <th>Number of Days</th>
            <th>Lead Count</th>
            <th>Expected DRR</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

export default App
