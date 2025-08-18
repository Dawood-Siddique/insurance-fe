import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/ui/combobox"
import { useState } from "react"
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


    return (
        <div className="flex justify-center h-screen ">
            <div className="flex-row">
                <div className="text-2xl font-bold">Policy Management</div>
                <div className="flex flex-row gap-4">
                    <div>
                        Date
                        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div>
                        Insurance Company
                        <div>
                            <Combobox
                                items={insuranceCompanyObj}
                                value={company}
                                onChange={setCompany}
                                placeholder="Select company..."
                                searchPlaceholder="Search company..."
                                noResultsMessage="No company found."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div>
                        Policy Number
                        <Input type="text" value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} />
                    </div>
                    <div>
                        Insured Name
                        <div>
                            <Combobox
                                items={insurdNameObj}
                                value={insuredName}
                                onChange={setInsuredName}
                                placeholder="Select insured..."
                                searchPlaceholder="Search insured..."
                                noResultsMessage="No insured found."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div>
                        Car Model
                        <Input type="text" value={carModel} onChange={(e) => setCarModel(e.target.value)} />
                    </div>
                    <div>
                        Engine Type
                        <Input type="text" value={engineType} onChange={(e) => setEngineType(e.target.value)} />
                    </div>
                </div>

                <div>
                    Agent Name
                    <div>
                        <Combobox
                            items={agentNameObj}
                            value={agentName}
                            onChange={setAgentName}
                            placeholder="Select Agent..."
                            searchPlaceholder="Search Agent..."
                            noResultsMessage="No Agent found."
                        />
                    </div>

                </div>

                {/* Payment Information */}

                <div>
                    <div className="text-2xl font-bold">Payment Information</div>
                    <div className="flex flex-row gap-4">
                        <div>
                            Gross/Price
                            <Input type="text" value={grossPrice} onChange={(e) => setGrossPrice(e.target.value)} />
                        </div>
                        <div>
                            New CO Rates
                            <Input type="text" value={newCoRates} onChange={(e) => setNewCoRates(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex flex-row gap-4">
                        <div>
                            Client Price
                            <Input type="text" value={clientPrice} onChange={(e) => setClientPrice(e.target.value)} />
                        </div>
                        <div>
                            Profit
                            <Input type="text" value={profit} onChange={(e) => setProfit(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex flex-row gap-4">
                        <div>
                            Payment Method
                            <div>
                                <Combobox
                                    items={paymentMethodObj}
                                    value={payment}
                                    onChange={setPayment}
                                    placeholder="Select Method..."
                                    searchPlaceholder="Search Method"
                                    noResultsMessage="No Method found."
                                />
                            </div>
                        </div>

                        <div>
                            Payment Status
                            <div>
                                <Combobox
                                    items={paymentStatusObj}
                                    value={paymentStatus}
                                    onChange={setPaymentStatus}
                                    placeholder="Select Status..."
                                    searchPlaceholder="Search Status"
                                    noResultsMessage="No Status found."
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        Remarks
                        <Input type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                    </div>

                    <div>
                        Reference Number
                        <Input type="text" value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} />
                    </div>

                </div>

                {/* Cancel and Save Button */}
                <div className="mt-4">
                    <Button variant="secondary">Cancel</Button>
                    <Button>Save</Button>
                </div>
            </div>

        </div>
    )
}
