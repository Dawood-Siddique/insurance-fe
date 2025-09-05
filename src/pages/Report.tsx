import { Header } from "@/components/header";
import { Combobox } from "@/components/ui/combobox";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorAlert } from "@/components/error-alert";

const baseURL = import.meta.env.VITE_BASE_URL;

export default function Report({ onLogout }: { onLogout: () => void }) {
  const [insuredName, setInsuredName] = useState("");
  const [agentName, setagentName] = useState("");
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [insuranceCompanies, setInsuranceCompanies] = useState<{ value: string; label: string }[]>([]);
  const [agents, setAgents] = useState<{ value: string; label: string }[]>([]);
  const [clients, setClients] = useState<{ value: string; label: string }[]>([]);

  const handleGenerateReport = () => {
    // Implement report generation logic here
    console.log("Generating report with the following filters:");
    console.log("Insured Name:", insuredName);
    console.log("Agent Name:", agentName);
    console.log("Insurance Company:", insuranceCompany);
    console.log("Status:", status);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    // Microsoft Excel file will be sent by the backend to be downloaded
    axios.get(`${baseURL}report/download/`, {
      responseType: 'blob',
      params: {
        insured_name: insuredName,
        agent_name: agentName,
        insurance_company: insuranceCompany,
        status: status,
        start_date: startDate,
        end_date: endDate
      }

    }).then((response) => {
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'report.xlsx'; // Set the desired file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error) => {
      console.error('Error generating report:', error);
      setError(error.message || "An unexpected error occurred.");
    });
  };

  useEffect(() => {
    // Helper function to fetch and format data for the Combobox
    const fetchData = (url: string, setter: (data: { value: string; label: string }[]) => void) => {
      axios.get(url)
        .then(res => {
          const formattedData = res.data.map((item: any) => ({ value: item.id.toString(), label: item.name }));
          // const formattedData = data.map(item => ({ value: item.name, label: item.id }));
          setter(formattedData);
        })
        .catch(error => {
          console.error(`Failed to fetch data from ${url}:`, error)
          setError(error.message || "An unexpected error occurred.");
        });
    };

    // Replace with your actual API endpoints
    fetchData(`${baseURL}insurance-company/`, setInsuranceCompanies);
    fetchData(`${baseURL}agent/`, setAgents);
    fetchData(`${baseURL}client/`, setClients);
  }, []);
  return (
    <div>
      <Header onLogout={onLogout} />
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
                searchPlaceholder="Search clients..."
                noResultsMessage="No clients found"
              />
            </div>
          </div>
        <div className="m-5 w-50">
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>

        <div className="m-5 w-50">
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

          <div className="m-5">
            <div>Agent Name</div>
            <div>
              <Combobox
                items={agents}
                value={agentName}
                onChange={setagentName}
                placeholder="Select Agent Name"
                searchPlaceholder="Search agents..."
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
                placeholder="Select Company"
                searchPlaceholder="Search companies..."
                noResultsMessage="No insurance companies found"
              />
            </div>
          </div>

          <div className="m-5">
            <div>Status</div>
            <div>
              <Combobox
                items={[
                  { value: 'active', label: 'Active' },
                  { value: 'cancelled', label: 'Cancelled' },
                  { value: 'complete', label: 'Complete' },
                ]}
                value={status}
                onChange={setStatus}
                placeholder="Select Status"
                searchPlaceholder="Search status..."
                noResultsMessage="No status found"
              />
            </div>
          </div>

          <div className="m-5">
            <Button onClick={handleGenerateReport} className="mt-6">
              Generate Report
            </Button>
          </div>
        </div>

      </div>
      <ErrorAlert error={error} onClose={() => setError(null)} />
    </div>
  );
}