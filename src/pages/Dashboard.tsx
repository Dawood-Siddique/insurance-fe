import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { PolicyTable } from "@/components/policy-table";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const baseURL = "http://127.0.0.1:8000/";
const paymentStatusObj = [
    { value: 'active', label: 'Active' },
    { value: 'complete', label: 'Complete' },
    { value: 'cancelled', label: 'Cancelled' }
]

export default function Dashboard() {
  const [policies, setPolicies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [agents, setAgents] = useState([]);
  const [clients, setClients] = useState([]);
  const [insuranceCompanies, setInsuranceCompanies] = useState([]);
  
  // Filter states
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedInsuranceCompany, setSelectedInsuranceCompany] = useState('');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    setDateRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedAgent('');
    setSelectedClient('');
    setDateRange({ start: '', end: '' });
    setSelectedInsuranceCompany('');
    setSelectedPaymentStatus('');
  };

  // Fetch policies
  useEffect(() => {
    axios.get(`${baseURL}policy/`).then((res) => {
      setPolicies(res.data);
    }).catch((error) => {
      console.error('Error fetching policies:', error);
    });
  }, []);

  // Fetch filter options (you might need to adjust these endpoints based on your API)
  useEffect(() => {
    // Fetch agents
    axios.get(`${baseURL}agent/`).then((res) => {
      setAgents(res.data);
    }).catch((error) => {
      console.error('Error fetching agents:', error);
    });

    // Fetch clients
    axios.get(`${baseURL}client/`).then((res) => {
      setClients(res.data);
    }).catch((error) => {
      console.error('Error fetching clients:', error);
    });

    // Fetch insurance companies
    axios.get(`${baseURL}insurance-company/`).then((res) => {
      setInsuranceCompanies(res.data);
    }).catch((error) => {
      console.error('Error fetching insurance companies:', error);
    });
  }, []);

  // Apply all filters
  const filteredPolicies = useMemo(() => {
    return policies.filter((policy: any) => {
      // Text search filter
      if (searchQuery && 
          !policy.policy_number?.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !policy.client?.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !policy.insurance_company?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Agent filter
      if (selectedAgent && policy.agent !== selectedAgent) {
        return false;
      }

      // Client filter
      if (selectedClient && policy.client !== selectedClient) {
        return false;
      }

      // Insurance company filter
      if (selectedInsuranceCompany && policy.insurance_company !== selectedInsuranceCompany) {
        return false;
      }

      // Payment status filter
      if (selectedPaymentStatus && policy.payment_status !== selectedPaymentStatus) {
        return false;
      }

      // Date range filter
      if (dateRange.start || dateRange.end) {
        const policyDate = new Date(policy.issue_date);
        if (dateRange.start && policyDate < new Date(dateRange.start)) {
          return false;
        }
        if (dateRange.end && policyDate > new Date(dateRange.end)) {
          return false;
        }
      }

      return true;
    });
  }, [policies, searchQuery, selectedAgent, selectedClient, dateRange, selectedInsuranceCompany, selectedPaymentStatus]);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center ml-20 mr-20 min-h-screen">
        <div className="flex justify-between w-full p-4">
          <div className="text-4xl font-bold">Policies</div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button>
              <Link to="/add-policy">Add Policy</Link>
            </Button>
          </div>
        </div>
        <Input
          type="text"
          placeholder="Search policies..."
          value={searchQuery}
          onChange={handleSearch}
          className="mt-5 mb-5 w-full max-w-md"
        />
        <div className="flex flex-wrap gap-4 mb-6 w-full">
          <div className="w-40">
            <label className="block text-sm font-medium mb-1">Agent</label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger>
                <SelectValue placeholder="Select agent" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent: any) => (
                  <SelectItem key={agent.id || agent.name} value={agent.name}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-40">
            <label className="block text-sm font-medium mb-1">Client</label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client: any) => (
                  <SelectItem key={client.id || client.name} value={client.name}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-40">
            <label className="block text-sm font-medium mb-1">Insurance Company</label>
            <Select value={selectedInsuranceCompany} onValueChange={setSelectedInsuranceCompany}>
              <SelectTrigger>
                <SelectValue placeholder="Select company" />
              </SelectTrigger>
              <SelectContent>
                {insuranceCompanies.map((company: any) => (
                  <SelectItem key={company.id || company.name} value={company.name}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-40">
            <label className="block text-sm font-medium mb-1">Payment Status</label>
            <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {paymentStatusObj.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-40">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
            />
          </div>
          
          <div className="w-40">
            <label className="block text-sm font-medium mb-1">End Date</label>
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
            />
          </div>
        </div>
        
        <div className="w-full">
          <PolicyTable policies={filteredPolicies} />
        </div>
      </div>
    </div>
  );
}