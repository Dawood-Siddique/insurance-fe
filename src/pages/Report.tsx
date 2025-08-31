import { Header } from "@/components/header";
import { Combobox } from "@/components/ui/combobox";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const baseURL = "http://127.0.0.1:8000/"

export default function Report() {
  const [insuredName, setInsuredName] = useState("");
  const [agentName, setagentName] = useState("");
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [status, setStatus] = useState("");

  const [insuranceCompanies, setInsuranceCompanies] = useState([]);
  const [agents, setAgents] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Helper function to fetch and format data for the Combobox
    const fetchData = (url: string, setter: any) => {
      axios.get(url)
        .then(res => {
          const formattedData = res.data.map(item => ({ value: item.id, label: item.name }));
          // const formattedData = data.map(item => ({ value: item.name, label: item.id }));
          setter(formattedData);
        })
        .catch(error => console.error(`Failed to fetch data from ${url}:`, error));
    };

    // Replace with your actual API endpoints
    fetchData(`${baseURL}insurance-company/`, setInsuranceCompanies);
    fetchData(`${baseURL}agent/`, setAgents);
    fetchData(`${baseURL}client/`, setClients);
  }, []);
  return (
    <div>
      <Header />
      <div className="flex flex-col flex-center ml-20 mr-20 min-h-screen">
        <div className="flex justify-between w-full mt-4">
          <div className="text-4xl font-bold">Report</div>
        </div>
        <div className="mt-10 ">
          <div className="m-5">
            <div>Insured Client Name</div>
            <div>
              <Combobox
                items={clients}
                value={insuredName}
                onChange={setInsuredName}
                placeholder="Select Insured Name"
                noResultsMessage="No clients found"
              />
            </div>
          </div>

          <div className="m-5">
            <div>Agent Name</div>
            <div>
              <Combobox
                items={agents}
                value={agentName}
                onChange={setagentName}
                placeholder="Select Agent Name"
                noResultsMessage="No agents found"
              />
            </div>
          </div>

          <div className="m-5">
            <div>Insurance Company</div>
            <div>
              <Combobox
                items={insuranceCompanies}
                value={insuranceCompany}
                onChange={setInsuranceCompany}
                placeholder="Select Insurance Company"
                noResultsMessage="No insurance companies found"
              />
            </div>
          </div>

          <div className="m-5">
            <div>Status</div>
            <div>
              <Combobox
                items={[
                  { value: 'Active', label: 'Active' },
                  { value: 'Cancelled', label: 'Cancelled' },
                  // { value: 'Expired', label: 'Expired' },
                ]}
                value={status}
                onChange={setStatus}
                placeholder="Select Status"
                noResultsMessage="No status found"
              />
            </div>
          </div>

          <div className="m-5">
                <Button  variant="default">
                  Generate Report
                </Button>
          </div>
        </div>

      </div>
    </div>
  );
}