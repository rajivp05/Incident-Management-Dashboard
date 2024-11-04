import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../styles/ChartModal.css';

const ChartModal = ({ isVisible, onClose, data }) => {
  if (!isVisible) return null;

  const chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Incident Status Breakdown',
    },
    series: [
      {
        name: 'Incidents',
        colorByPoint: true,
        data,
      },
    ],
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className="chart-container">
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartModal;
