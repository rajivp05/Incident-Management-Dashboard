// import axios from 'axios';
import exampleResponse from '../mocks/mockData';


 // Using mock data for UI since actual API does not fetch any incidents.

export const fetchMockIncidents = async () => {
    return exampleResponse.incidents;
  };


  // Leaving the API call code below as it is for reference

// const API_URL = 'https://api.pagerduty.com/incidents';
// const API_TOKEN = process.env.REACT_APP_PAGERDUTY_API_TOKEN;

// const options = {
//   method: 'GET',
//   url: API_URL,
//   headers: {
//     Accept: 'application/vnd.pagerduty+json;version=2',
//     'Content-Type': 'application/json',
//     Authorization: `Token token=${API_TOKEN}`,
//   },
// };

// export const fetchIncidents = async (filters = {}) => {

//   if (process.env.NODE_ENV === 'development') {
//     return exampleResponse.incidents;
//   }
//   try {
//     const response = await axios.request({ ...options, params: filters });
//     return response.data.incidents;
//   } catch (error) {
//     console.error('Error fetching incidents:', error);
//     throw new Error('Failed to fetch incidents.');
//   }
// };

// export const fetchIncidentDetails = async (incidentId) => {
//   try {
//     const response = await axios.get(`${API_URL}/${incidentId}`, options);
//     return response.data.incident;
//   } catch (error) {
//     console.error('Error fetching incident details:', error);
//     throw new Error('Failed to fetch incident details.');
//   }
// };