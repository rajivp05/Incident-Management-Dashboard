import React, { useState, useEffect } from 'react';
import IncidentDetails from './IncidentDetails';
import { fetchMockIncidents } from '../services/pagerDutyService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown, faFilter } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ status: '', urgency: '' });
  const [expandedIncidentId, setExpandedIncidentId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ sortBy: '', sortDirection: 'asc' });
  const [statusFilterVisible, setStatusFilterVisible] = useState(false);
  const incidentsPerPage = 5;

  useEffect(() => {
    const loadIncidents = async () => {
      const fetchedIncidents = await fetchMockIncidents();
      setIncidents(fetchedIncidents);
    };
    loadIncidents();
  }, []);

  const handleSortChange = (column) => {
    setSortConfig((prevConfig) => ({
      sortBy: column,
      sortDirection: prevConfig.sortBy === column && prevConfig.sortDirection === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleDetailsClick = (id) => {
    setExpandedIncidentId((prevId) => (prevId === id ? null : id));
  };

  const handleStatusFilterChange = (status) => {
    setFilters((prevFilters) => ({ ...prevFilters, status }));
    setCurrentPage(1);
    setStatusFilterVisible(false);
  };

  const filteredAndSortedIncidents = [...incidents]
    .filter((incident) => {
      return (
        (filters.status ? incident.status === filters.status : true) &&
        (filters.urgency ? incident.urgency === filters.urgency : true)
      );
    })
    .sort((a, b) => {
      const { sortBy, sortDirection } = sortConfig;
      const order = sortDirection === 'asc' ? 1 : -1;
      if (sortBy === 'created_at') {
        return order * (new Date(a.created_at) - new Date(b.created_at));
      } else if (sortBy === 'urgency') {
        return order * a.urgency.localeCompare(b.urgency);
      }
      return 0;
    })
    .slice((currentPage - 1) * incidentsPerPage, currentPage * incidentsPerPage);

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="dashboard-container">
      <h1>Incident Management Dashboard</h1>
      <p className="incident-count">Total Incidents (All): {incidents.length}</p>
      <div className="filters">
      </div>
      <div className="table-container">
        <div className="table-header">
          <div className="header-cell">
            Status
            <FontAwesomeIcon
              icon={faFilter}
              onClick={() => setStatusFilterVisible(!statusFilterVisible)}
              style={{ cursor: 'pointer', marginLeft: '5px' }}
            />
            {statusFilterVisible && (
              <div className="status-filter-dialog">
                <button onClick={() => handleStatusFilterChange('')}>All</button>
                <button onClick={() => handleStatusFilterChange('triggered')}>Triggered</button>
                <button onClick={() => handleStatusFilterChange('acknowledged')}>Acknowledged</button>
                <button onClick={() => handleStatusFilterChange('resolved')}>Resolved</button>
              </div>
            )}
          </div>
          <div className="header-cell" onClick={() => handleSortChange('urgency')}>
            Urgency
            <FontAwesomeIcon
              icon={
                sortConfig.sortBy === 'urgency'
                  ? sortConfig.sortDirection === 'asc'
                    ? faSortUp
                    : faSortDown
                  : faSort
              }
              style={{ cursor: 'pointer', marginLeft: '5px' }}
            />
          </div>
          <div className="header-cell">Title</div>
          <div className="header-cell" onClick={() => handleSortChange('created_at')}>
            Created
            <FontAwesomeIcon
              icon={
                sortConfig.sortBy === 'created_at'
                  ? sortConfig.sortDirection === 'asc'
                    ? faSortUp
                    : faSortDown
                  : faSort
              }
              style={{ cursor: 'pointer', marginLeft: '5px' }}
            />
          </div>
          <div className="header-cell"></div>
        </div>
        {filteredAndSortedIncidents.map((incident) => (
          <React.Fragment key={incident.id}>
            <div className="table-row">
              <div className="cell">{incident.status}</div>
              <div className="cell">{incident.urgency}</div>
              <div className="cell">{incident.title}</div>
              <div className="cell">{new Date(incident.created_at).toLocaleString()}</div>
              <div className="cell">
                <button onClick={() => handleDetailsClick(incident.id)}>
                  {expandedIncidentId === incident.id ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
            </div>
            {expandedIncidentId === incident.id && <IncidentDetails incident={incident} />}
          </React.Fragment>
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage} disabled={filteredAndSortedIncidents.length < incidentsPerPage}>Next</button>
      </div>
    </div>
  );
};

export default Dashboard;
