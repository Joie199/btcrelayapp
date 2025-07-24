import axios from 'axios';

const BITNOB_API = 'https://sandboxapi.bitnob.co/api/v1/transactions/?order=ASC&page=1&take=10';
const API_KEY = 'sk.95eaf7335030.33e1eacd7b46ca1b8ea6e7a47'; // Keep this secret

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

export async function convertUGXToBTC(ugxAmount: number): Promise<number> {
  const response = await axios.get(`${BITNOB_API}/v1/convert`, {
    headers,
    params: {
      amount: ugxAmount,
      baseCurrency: 'UGX',
      targetCurrency: 'BTC',
    },
  });

  const btc = response.data.data.amount;
  return Math.round(btc * 100_000_000); // convert BTC → sats
}

export async function createLightningInvoice(sats: number, description: string) {
  const response = await axios.post(
    `${BITNOB_API}/v1/ln/invoices`,
    {
      amount: sats,
      description,
    },
    { headers }
  );

  return response.data.data.payment_request;
}
