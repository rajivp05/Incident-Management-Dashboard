import React, { useState, useEffect } from 'react';
import { fetchMockIncidents } from '../services/pagerDutyService';
import IncidentTable from './IncidentTable';
import ChartModal from './ChartModal';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ status: '', urgency: '' });
  const [expandedIncidentId, setExpandedIncidentId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ sortBy: '', sortDirection: 'asc' });
  const [statusFilterVisible, setStatusFilterVisible] = useState(false);
  const [isBreakdownVisible, setBreakdownVisible] = useState(false);
  const incidentsPerPage = 10;

  // Fetch incidents whenever currentPage or filters change
  useEffect(() => {
    const loadIncidents = async () => {
      const { incidents: fetchedIncidents, total } = await fetchMockIncidents(currentPage, incidentsPerPage);
      setIncidents(fetchedIncidents);
      setTotalIncidents(total);
    };
    loadIncidents();
  }, [currentPage, filters]);

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
    });

  const chartData = () => {
    const statusCounts = incidents.reduce((acc, incident) => {
      acc[incident.status] = (acc[incident.status] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(statusCounts).map((status) => {
      let color;

      if (status === 'resolved') color = '#58c14a';    
      else if (status === 'acknowledged') color = '#398de7'; 
      else if (status === 'triggered') color = '#e73d61'; 
  
      return {
        name: status.charAt(0).toUpperCase() + status.slice(1),
        y: statusCounts[status],
        color: color,
      };
    });
  };

  const nextPage = () => {
    if (currentPage * incidentsPerPage < totalIncidents) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="dashboard-container">
      <h1>Incident Management Dashboard</h1>
      <p className="incident-count">
        Total Incidents (All): {totalIncidents}
        <button className="view-breakdown-button" onClick={() => setBreakdownVisible(true)}>View Breakdown</button>
      </p>
      <IncidentTable
          incidents={filteredAndSortedIncidents}
          expandedIncidentId={expandedIncidentId}
          onDetailsClick={handleDetailsClick}
          onSortChange={handleSortChange}
          onStatusFilterChange={handleStatusFilterChange}
          sortConfig={sortConfig}
          statusFilterVisible={statusFilterVisible}
          setStatusFilterVisible={setStatusFilterVisible}
        />
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage} disabled={currentPage * incidentsPerPage >= totalIncidents}>Next</button>
      </div>

      <ChartModal
        isVisible={isBreakdownVisible}
        onClose={() => setBreakdownVisible(false)}
        data={chartData()}
      />
    </div>
  );
};

export default Dashboard;
