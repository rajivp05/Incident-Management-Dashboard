import React from 'react';

const IncidentDetails = ({ incident }) => {
  return (
    <div className="table-row details-row">
      <div className="details-cell">
        <p><strong>ID:</strong> {incident.id}</p>
        <p><strong>Assignee:</strong> {incident.assignments[0]?.summary || 'Unassigned'}</p>
        <p><strong>Updated At:</strong> {new Date(incident.updated_at).toLocaleString()}</p>
        <p><strong>Service:</strong> {incident.service.summary}</p>
        <p><strong>Team:</strong> {incident.teams[0]?.summary || 'No Team'}</p>
      </div>
    </div>
  );
};

export default IncidentDetails;
