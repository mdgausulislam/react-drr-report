import './App.css';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar } from 'react-icons/fi';

const App = () => {
  const [action, setAction] = useState(''); // State for Action
  const [id, setId] = useState(''); // State for ID
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [monthDifference, setMonthDifference] = useState(null);
  const [excludedDates, setExcludedDates] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState(null);
  const [numberOfLeads, setNumberOfLeads] = useState(0);
  const [expectedLeadCount, setExpectedLeadCount] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [savedData, setSavedData] = useState([]); // New state for saved data
  const [lastUpdated, setLastUpdated] = useState(null); // New state for last update timestamp

  const handleStartDateChange = (date) => {
    setStartDate(date);
    calculateMonthDifference(date, endDate);
    calculateNumberOfDays(date, endDate, excludedDates);
    calculateExpectedLeadCount(numberOfLeads, numberOfDays);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    calculateMonthDifference(startDate, date);
    calculateNumberOfDays(startDate, date, excludedDates);
    calculateExpectedLeadCount(numberOfLeads, numberOfDays);
  };

  const calculateMonthDifference = (start, end) => {
    if (start && end) {
      const diffInMonths =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
      setMonthDifference(diffInMonths);
    } else {
      setMonthDifference(null);
    }
  };

  const calculateNumberOfDays = (start, end, excluded) => {
    if (start && end) {
      let days = 0;
      for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
        const currentDateString = currentDate.toISOString().split('T')[0];
        if (!excluded.includes(currentDateString)) {
          days++;
        }
      }
      setNumberOfDays(days);
    } else {
      setNumberOfDays(null);
    }
  };

  const calculateExpectedLeadCount = (leads, days) => {
    if (leads > 0 && days > 0) {
      const expectedCount = leads / days;
      console.log('Expected Count:', expectedCount); // Log the expected count
      setExpectedLeadCount(expectedCount);
    } else {
      console.log('Expected Count: N/A'); // Log the "N/A" case
      setExpectedLeadCount(null);
    }
  };


  const handleExcludeDate = (date) => {
    setExcludedDates([...excludedDates, date]);
  };


  const handleSave = () => {
    // Create a new data entry
    const savedEntry = {
      action, // Include Action
      id, // Include ID
      startDate,
      endDate,
      monthDifference,
      excludedDates,
      numberOfDays,
      numberOfLeads,
      expectedLeadCount,
      lastUpdated: new Date().toLocaleString(), // Set the last update timestamp
    };

    // Add the entry to the list of saved data
    setSavedData([...savedData, savedEntry]);

    // Reset the form and clear the flag indicating form submission
    setAction('');
    setId('');
    setStartDate(null);
    setEndDate(null);
    setMonthDifference(null);
    setExcludedDates([]);
    setNumberOfDays(null);
    setNumberOfLeads(0);
    setExpectedLeadCount(null);
    setIsFormSubmitted(true);

    // Update the last update timestamp
    setLastUpdated(savedEntry.lastUpdated);
  };
  const handleCancel = () => {
    // Reset the form and clear the flag indicating form submission
    setStartDate(null);
    setEndDate(null);
    setMonthDifference(null);
    setExcludedDates([]);
    setNumberOfDays(null);
    setNumberOfLeads(0);
    setExpectedLeadCount(null);
    setIsFormSubmitted(false);
  };

  return (
    <div className="mx-auto p-2">
      <h1 className="text-2xl font-bold mb-4">Simple Assignment</h1>
        <table className="w-full md:w-auto">
          <thead>
            <tr className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10">
              <th>Action</th>
              <th>ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Month Difference</th>
              <th>Dates Excluded</th>
              <th>Number of Days</th>
              <th>Lead Count</th>
              <th>Expected DRR</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10">
              <td className="md:table-cell">
                <input
                  type="text"
                  className="block w-20 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                />
              </td>
              <td className="md:table-cell">
                <input
                  type="text"
                  className="block w-20 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </td>
              <td className="md:table-cell">
                <div className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50">
                  <FiCalendar className="date-picker-icon" />
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Start Date"
                    isClearable
                    excludeDates={excludedDates}
                    showTimeSelect={false}
                  />
                </div>
              </td>
              <td className="md:table-cell">
                <div className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50">
                  <FiCalendar className="date-picker-icon" />
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="End Date"
                    isClearable
                    excludeDates={excludedDates}
                    showTimeSelect={false}
                  />
                </div>
              </td>
              <td className="md:table-cell">
                <input
                  type="text"
                  className="block w-20 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  value={monthDifference !== null ? monthDifference : ''}
                  readOnly
                />
              </td>
              <td className="md:table-cell">
                <FiCalendar className="date-picker-icon" />
                <DatePicker
                  selected={null}
                  onChange={handleExcludeDate}
                  excludeDates={excludedDates}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Exclude Date"
                  isClearable
                  highlightDates={(date) =>
                    excludedDates.some((excludedDate) =>
                      date.toLocaleDateString().includes(excludedDate.toLocaleDateString())
                    )
                  }
                />
              </td>
              <td className="md:table-cell">
                <input
                  type="text"
                  className="block w-20 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  value={numberOfDays !== null ? numberOfDays : ''}
                  readOnly
                />
              </td>
              <td className="md:table-cell">
                <input
                  type="number"
                  className="block w-20 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  value={numberOfLeads}
                  onChange={(e) => {
                    setNumberOfLeads(e.target.value);
                    calculateExpectedLeadCount(e.target.value, numberOfDays); // Update the expected lead count
                  }}
                />
              </td>
              <td className="md:table-cell">
                {expectedLeadCount !== null ? (
                  <input
                    type="text"
                    className="block w-20 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                    value={expectedLeadCount.toFixed(2)}
                    readOnly
                  />
                ) : (
                  <span>N/A</span>
                )}
              </td>
              <td className="md:table-cell">
                <button
                  onClick={handleSave}
                  className='block w-full md:w-auto bg-blue-500 px-5 py-2 rounded-md hover:bg-blue-700 text-white font-bold'
                >
                  Save
                </button>
                <br />
                <button
                  onClick={handleCancel}
                  className='block w-full md:w-auto bg-red-500 px-5 py-2 rounded-md hover-bg-red-700 text-white font-bold mt-2'
                >
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
     
      {isFormSubmitted && (
        <p className='font-bold mt-4'>Data submitted successfully. You can reset the form or redirect the user as needed.</p>
      )}
      {/* Display the saved data */}
      <div>
        <h2 className='text-2xl font-bold mt-8'>Saved Data</h2>
        <table className='w-full'>
          <thead>
            <tr>
              <th>Action</th>
              <th>ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Month Difference</th>
              <th>Dates Excluded</th>
              <th>Number of Days</th>
              <th>Lead Count</th>
              <th>Expected DRR</th>
              <th>Last Update</th>
            </tr>
          </thead>
          <tbody>
            {savedData.map((entry, index) => (
              <tr key={index} className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10">
                <td>{entry.action ? entry.action.toLocaleString() : 'N/A'}</td>
                <td>{entry.id ? entry.id.toLocaleString() : 'N/A'}</td>
                <td>{entry.startDate ? entry.startDate.toLocaleDateString() : 'N/A'}</td>
                <td>{entry.endDate ? entry.endDate.toLocaleDateString() : 'N/A'}</td>
                <td>{entry.monthDifference}</td>
                <td>{entry.excludedDates.join(', ')}</td>
                <td>{entry.numberOfDays}</td>
                <td>{entry.numberOfLeads}</td>
                <td>{entry.expectedLeadCount.toFixed(2) * 100}</td>
                <td>{entry.lastUpdated ? entry.lastUpdated.toLocaleString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>

  );
};

export default App;
