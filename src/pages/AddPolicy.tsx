import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/ui/combobox"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AddNewEntityDialog } from "@/components/add-new-entity-dialog"

// The hardcoded data objects are removed, as we will fetch from the backend.
const baseURL = "http://127.0.0.1:8000/"
// const yourAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1ODA5MDc2LCJpYXQiOjE3NTU3MjI2NzYsImp0aSI6ImQwNjljNDNlNzkwZTRjMWZiNmI4YThjYzhmZTVkOTAwIiwidXNlcl9pZCI6MX0.1o4ypV_CW9nnfMSitYoGmF9nzwouvvDVeRHVWFdOc7w"

const paymentMethodObj = [
    { value: 'cash', label: 'Cash' },
    { value: 'bank', label: 'Bank' }
]

const paymentStatusObj = [
    { value: 'active', label: 'Active' },
    { value: 'complete', label: 'Complete' },
    { value: 'cancelled', label: 'Cancelled' }
]


export default function AddPolicy() {
    // --- State for form inputs ---
    // For foreign keys, we will store the ID. Initialize with null.
    const [company, setCompany] = useState(null);
    const [agentName, setAgentName] = useState(null);
    const [insuredName, setInsuredName] = useState(null);

    // State for direct fields
    const [date, setDate] = useState("");
    const [policyNumber, setPolicyNumber] = useState("");
    const [carModel, setCarModel] = useState("");
    const [engineType, setEngineType] = useState("");
    const [grossPrice, setGrossPrice] = useState<number>(0);
    const [newCoRates, setNewCoRates] = useState<number>(0);
    const [clientPrice, setClientPrice] = useState<number>(0);
    const [profit, setProfit] = useState("");
    const [remarks, setRemarks] = useState("");
    const [referenceNumber, setReferenceNumber] = useState<number>(0);
    const [payment, setPayment] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");

    // --- State for options fetched from backend ---
    const [insuranceCompanies, setInsuranceCompanies] = useState([]);
    const [agents, setAgents] = useState([]);
    const [clients, setClients] = useState([]); // For "Insured Name"

    // --- Fetch data from backend on component mount ---
    useEffect(() => {
        // Helper function to fetch and format data for the Combobox
        const fetchData = (url, setter) => {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const formattedData = data.map(item => ({ value: item.id, label: item.name }));
                    setter(formattedData);
                })
                .catch(error => console.error(`Failed to fetch data from ${url}:`, error));
        };

        // Replace with your actual API endpoints
        fetchData(`${baseURL}/insurance-company/`, setInsuranceCompanies);
        fetchData(`${baseURL}/agent/`, setAgents);
        fetchData(`${baseURL}/client/`, setClients);
    }, []);

    // --- Effect for calculating profit ---
    useEffect(() => {
        const calculatedProfit = (clientPrice - newCoRates).toFixed(2);
        setProfit(calculatedProfit);
    }, [clientPrice, newCoRates]);

    // --- Handle form submission ---
    const handleSave = () => {
        // Construct the payload with keys matching the Django model fields
        const policyData = {
            issue_date: date,
            insurance_company: company, // Send the ID
            policy_number: policyNumber,
            client: insuredName, // Send the ID
            car_model: carModel,
            engine_type: engineType,
            agent: agentName, // Send the ID
            gross_price: grossPrice,
            co_rate: newCoRates,
            client_price: clientPrice,
            payment_method: payment,
            payment_status: paymentStatus,
            remarks: remarks,
            reference_number: referenceNumber,
        };

        console.log("Sending data to backend:", policyData);

        // Send the data to your backend API
        fetch(`${baseURL}/policy/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Make sure to include your authentication token
                // 'Authorization': `Bearer ${yourAuthToken}`
            },
            body: JSON.stringify(policyData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(data => {
            console.log('Policy created successfully!', data);
            // Optionally, redirect or show a success message
        })
        .catch(error => {
            console.error('Failed to create policy:', error);
            // Show an error message to the user
        });
    };

    // --- Handle creating a new entity (e.g., Insurance Company) ---
    const handleSaveNewCompany = (newCompanyName) => {
        console.log('New company name:', newCompanyName)
        // fetch(`${baseURL}/insurance-company/`, {
        //     method: 'POST',
        //     headers: { 
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${yourAuthToken}`
        //     },
        //     body: JSON.stringify({ name: newCompanyName })
        // })
        // .then(res => res.json())
        // .then(newCompany => {
        //     // Add the new company to the dropdown list and select it
        //     const newOption = { value: newCompany.id, label: newCompany.name };
        //     setInsuranceCompanies(prev => [...prev, newOption]);
        //     setCompany(newCompany.id);
        // })
        // .catch(error => console.error('Failed to create new company:', error));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Policy Management</h1>

                <div className="space-y-8">
                    {/* Policy Details */}
                    <div className="border p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Policy Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 mb-1">
                                    <label className="block text-sm font-medium text-gray-700">Insurance Company</label>
                                    <AddNewEntityDialog
                                        dialogTitle="Add New Insurance Company"
                                        dialogDescription="Enter the name of the new insurance company."
                                        inputLabel="Company Name"
                                        triggerText="Add New Company?"
                                        onSave={handleSaveNewCompany}
                                    />
                                </div>
                                <Combobox
                                    items={insuranceCompanies}
                                    value={company}
                                    onChange={setCompany}
                                    placeholder="Select company..."
                                    searchPlaceholder="Search company..."
                                    noResultsMessage="No company found." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
                                <Input type="text" value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Insured Name</label>
                                <Combobox
                                    items={clients} // Use clients fetched from backend
                                    value={insuredName}
                                    onChange={setInsuredName}
                                    placeholder="Select insured..."
                                    searchPlaceholder="Search insured..."
                                    noResultsMessage="No insured found." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
                                <Input type="text" value={carModel} onChange={(e) => setCarModel(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Engine Type</label>
                                <Input type="text" value={engineType} onChange={(e) => setEngineType(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
                                <Combobox
                                    items={agents} // Use agents fetched from backend
                                    value={agentName}
                                    onChange={setAgentName}
                                    placeholder="Select Agent..."
                                    searchPlaceholder="Search Agent..."
                                    noResultsMessage="No Agent found." />
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="border p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gross/Price</label>
                                <Input type="number" value={grossPrice} onChange={(e) => setGrossPrice(parseFloat(e.target.value) || 0)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New CO Rates</label>
                                <Input type="number" value={newCoRates} onChange={(e) => setNewCoRates(parseFloat(e.target.value) || 0)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Price</label>
                                <Input type="number" value={clientPrice} onChange={(e) => setClientPrice(parseFloat(e.target.value) || 0)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profit</label>
                                <Input type="text" value={profit} readOnly />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                                <Combobox
                                    items={paymentMethodObj}
                                    value={payment}
                                    onChange={setPayment}
                                    placeholder="Select Method..."
                                    searchPlaceholder="Search Method"
                                    noResultsMessage="No Method found." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                                <Combobox
                                    items={paymentStatusObj}
                                    value={paymentStatus}
                                    onChange={setPaymentStatus}
                                    placeholder="Select Status..."
                                    searchPlaceholder="Search Status"
                                    noResultsMessage="No Status found." />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                                <Input type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reference Number</label>
                                <Input type="number" value={referenceNumber} onChange={(e) => setReferenceNumber(parseInt(e.target.value, 10) || 0)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cancel and Save Button */}
                <div className="mt-8 flex justify-end space-x-4">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSave}>Save Policy</Button>
                </div>
            </div>
        </div>
    )
}