import React from 'react';
import IncidentDetails from './IncidentDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown, faFilter } from '@fortawesome/free-solid-svg-icons';

const IncidentTable = ({
  incidents,
  expandedIncidentId,
  onDetailsClick,
  onSortChange,
  onStatusFilterChange,
  sortConfig,
  statusFilterVisible,
  setStatusFilterVisible,
}) => {
  return (
    <div className="table-container">
      <div className="table-header">
        <div className="header-cell header-title">Title</div>
        <div className="header-cell">
          Status
          <FontAwesomeIcon
            icon={faFilter}
            onClick={() => setStatusFilterVisible(!statusFilterVisible)}
            style={{ cursor: 'pointer', marginLeft: '5px' }}
          />
          {statusFilterVisible && (
            <div className="status-filter-dialog">
              <button onClick={() => onStatusFilterChange('')}>All</button>
              <button onClick={() => onStatusFilterChange('triggered')}>Triggered</button>
              <button onClick={() => onStatusFilterChange('acknowledged')}>Acknowledged</button>
              <button onClick={() => onStatusFilterChange('resolved')}>Resolved</button>
            </div>
          )}
        </div>
        <div className="header-cell" onClick={() => onSortChange('created_at')}>
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
        <div className="header-cell" onClick={() => onSortChange('urgency')}>
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
        <div className="header-cell"></div>
      </div>
      {incidents.length === 0 ? (
        <p className="no-incidents-message">No incidents found. Adjust filters to see results.</p>
      ) : (
        incidents.map((incident) => (
          <React.Fragment key={incident.id}>
            <div className="table-row">
              <div className="cell cell-title cell-margin">{incident.title}</div>
              <div className="cell cell-status cell-margin">{incident.status}</div>
              <div className="cell cell-margin">{new Date(incident.created_at).toLocaleString()}</div>
              <div className="cell cell-urgency cell-margin">{incident.urgency}</div>
              <div className="cell">
                <button onClick={() => onDetailsClick(incident.id)}>
                  {expandedIncidentId === incident.id ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
            </div>
            {expandedIncidentId === incident.id && <IncidentDetails incident={incident} />}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default IncidentTable;
