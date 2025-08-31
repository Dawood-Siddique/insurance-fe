export interface Policy {
  id: number;
  issue_date: string;
  insurance_company: string;
  client: string;
  policy_number: string;
  car_model: string;
  engine_type: string;
  agent: string;
  gross_price: number;
  co_rate: number;
  client_price: number;
  payment_status: 'active' | 'complete' | 'cancelled';
  profit_loss: number;
}

export interface Transaction {
  id: number;
  amount: number;
  created_at: string;
  type: string;
  description: string;
}


export interface Agent {
  id: number;
  name: string;
}

export interface Client {
  id: number;
  name: string;
}

export interface InsuranceCompany {
  id: number;
  name: string;
}