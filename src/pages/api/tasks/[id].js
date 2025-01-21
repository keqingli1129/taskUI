import axios from 'axios';
import { API_BASE_URL } from '../../../config/api';

export default async function handler(req, res) {
  const { id } = req.query;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const response = await axios({
      method: req.method,
      url: `${API_BASE_URL}/api/tasks/${id}`,
      data: req.method === 'PUT' ? req.body : undefined,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal server error' });
  }
}
