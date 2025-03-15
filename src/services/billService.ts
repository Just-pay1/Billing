import axios from "axios";

const URLS_MAP: { [key: string]: string } = {
  '1': 'http://localhost:4000/',
  '2': 'http://localhost:5000/'
};

const TIMEOUT = 15000; // 15 seconds timeout

export const fetchBillFromCompany = async (companyId: string, requestData: any): Promise<any> => {
  const targetUrl = URLS_MAP[companyId];

  if (!targetUrl) {
    throw new Error(`Invalid company ID: ${companyId}`);
  }

  const response = await axios.post(targetUrl, requestData, { timeout: TIMEOUT });
  return response.data;
};