import axios from 'axios';

const AddData = async (API_ENDPOINT,data) => {
  try {
    const response = await axios.post(API_ENDPOINT, data);
    return response.data;
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
};

export default AddData;
