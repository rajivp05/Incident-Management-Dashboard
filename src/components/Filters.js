
// No longer using this file since filter and sort are directly implemented in the table isntead of having dropdowns

import React from 'react';

const Filters = ({ setFilters }) => {
  const handleStatusChange = (e) => {
    setFilters((prevFilters) => ({ ...prevFilters, status: e.target.value }));
  };

  const handleUrgencyChange = (e) => {
    setFilters((prevFilters) => ({ ...prevFilters, urgency: e.target.value }));
  };

  const handleSortByChange = (e) => {
    setFilters((prevFilters) => ({ ...prevFilters, sortBy: e.target.value }));
  };

  return (
    <div className="filters">
      <div className="filter-item">
        <label htmlFor="status">Status:</label>
        <select id="status" defaultValue="" onChange={handleStatusChange}>
          <option value="">All</option>
          <option value="triggered">Triggered</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="urgency">Urgency:</label>
        <select id="urgency" defaultValue="" onChange={handleUrgencyChange}>
          <option value="">All</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="sortBy">Sort By:</label>
        <select id="sortBy" defaultValue="created_at" onChange={handleSortByChange}>
          <option value="created_at">Created Date</option>
          <option value="urgency">Urgency</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
