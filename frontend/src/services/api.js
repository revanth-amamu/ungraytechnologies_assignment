import axios from 'axios';

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(endpoint, {
      auth: {
        username: 'trial',
        password: 'assignment123',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};
