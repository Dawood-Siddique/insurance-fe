import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/ui/combobox"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const insuranceCompanyObj = [
    { value: "allianz", label: "Allianz" },
    { value: "axa", label: "AXA" },
    { value: "generali", label: "Generali" },
    { value: "zurich", label: "Zurich" },
]

const paymentMethodObj = [
    { value: 'cash', label: 'cash' },
    { value: 'bank', label: 'bank' }
]

const paymentStatusObj = [
    { value: 'active', label: 'active' },
    { value: 'complete', label: 'complete' },
    { value: 'cancelled', label: 'cancelled' }
]

const agentNameObj = [
    { value: 'agent1', label: 'Agent 1' },
    { value: 'agent2', label: 'Agent 2' },
]

const insurdNameObj = [
    { value: 'insurd1', label: 'Insurd 1' },
    { value: 'insurd2', label: 'Insurd 2' },
]

export default function AddPolicy() {
    const [company, setCompany] = useState("")
    const [payment, setPayment] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("")
    const [agentName, setAgentName] = useState("")
    const [insuredName, setInsuredName] = useState("")
    const [date, setDate] = useState("")
    const [policyNumber, setPolicyNumber] = useState("")
    const [carModel, setCarModel] = useState("")
    const [engineType, setEngineType] = useState("")
    const [grossPrice, setGrossPrice] = useState("")
    const [newCoRates, setNewCoRates] = useState("")
    const [clientPrice, setClientPrice] = useState("")
    const [profit, setProfit] = useState("")
    const [remarks, setRemarks] = useState("")
    const [referenceNumber, setReferenceNumber] = useState("")

    useEffect(() => {
        const calculatedProfit = (parseFloat(clientPrice || '0') - parseFloat(newCoRates || '0')).toFixed(2);
        setProfit(calculatedProfit);
    }, [clientPrice, newCoRates]);

    const handleSave = () => {
        const policyData = {
            date,
            company,
            policyNumber,
            insuredName,
            carModel,
            engineType,
            agentName,
            grossPrice,
            newCoRates,
            clientPrice,
            profit,
            payment,
            paymentStatus,
            remarks,
            referenceNumber,
        };
        console.log(policyData);
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Company</label>
                                <Combobox
                                    items={insuranceCompanyObj}
                                    value={company}
                                    onChange={setCompany}
                                    placeholder="Select company..."
                                    searchPlaceholder="Search company..."
                                    noResultsMessage="No company found."/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
                                <Input type="text" value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Insured Name</label>
                                <Combobox
                                    items={insurdNameObj}
                                    value={insuredName}
                                    onChange={setInsuredName}
                                    placeholder="Select insured..."
                                    searchPlaceholder="Search insured..."
                                    noResultsMessage="No insured found."/>
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
                                    items={agentNameObj}
                                    value={agentName}
                                    onChange={setAgentName}
                                    placeholder="Select Agent..."
                                    searchPlaceholder="Search Agent..."
                                    noResultsMessage="No Agent found."/>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="border p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gross/Price</label>
                                <Input type="text" value={grossPrice} onChange={(e) => setGrossPrice(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New CO Rates</label>
                                <Input type="text" value={newCoRates} onChange={(e) => setNewCoRates(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Price</label>
                                <Input type="text" value={clientPrice} onChange={(e) => setClientPrice(e.target.value)} />
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
                                    noResultsMessage="No Method found."/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                                <Combobox
                                    items={paymentStatusObj}
                                    value={paymentStatus}
                                    onChange={setPaymentStatus}
                                    placeholder="Select Status..."
                                    searchPlaceholder="Search Status"
                                    noResultsMessage="No Status found."/>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                                <Input type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reference Number</label>
                                <Input type="text" value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} />
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
