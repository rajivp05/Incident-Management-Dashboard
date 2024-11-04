import React from 'react';

const IncidentCard = ({ title, status, createdAt, urgency }) => {
  return (
    <div className="incident-card">
      <h2>{title}</h2>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
      <p><strong>Urgency:</strong> {urgency}</p>
    </div>
  );
};

export default IncidentCard;