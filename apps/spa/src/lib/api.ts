const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const fetchData = async (endpoint: string, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseBodyInText = await response.text()

    if (!responseBodyInText) {
      return
    }

    const data = JSON.parse(responseBodyInText);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetchData