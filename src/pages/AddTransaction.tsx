import { Header } from "@/components/header"
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "@/components/error-alert";

const baseURL = "http://127.0.0.1:8000/"
const Types = [
    { value: "cancelled", label: "cancelled" },
    { value: "payment", label: "payment" },
    { value: "credit_adjustment", label: "credit_adjustment" },
    { value: "payback", label: "payback" }
]



export default function AddTransaction({ onLogout }: { onLogout: () => void }) {
    const { policyId } = useParams<{ policyId: string }>();
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState<number | null>(null);
    const [description, setDescription] = useState("");
    const [beneficiaryBalance, setBeneficiaryBalance] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (policyId) {
            axios.get(`${baseURL}total-balance/?policy_id=${policyId}`)
                .then(response => {
                    setBeneficiaryBalance(response.data.total_balance);
                })
                .catch(error => {
                    console.error('Failed to fetch beneficiary balance:', error.response ? error.response.data : error);
                    setError(error.message || "An unexpected error occurred.");
                });
        }
    }, [policyId]);

    const handleCancel = () => {
        navigate(`/policy-detail/${policyId}`);
    }

    const handleSave = () => {
        if (!amount || !type) {
            setError("Please fill in all required fields: Amount and Type.");
            return;
        }
        const transactionData = {
            policy: policyId,
            date: date,
            type: type,
            amount: amount,
            description: description,
        };
        console.log("Sending data to backend:", transactionData);

        axios.post(`${baseURL}ledger/`, transactionData, {
            headers: {
                'Content-Type': 'application/json',
                // Make sure to include your authentication token
                // 'Authorization': `Bearer ${yourAuthToken}`
            }
        })
            .then(response => {
                console.log('Transaction created successfully!', response.data);
                navigate(`/policy-detail/${policyId}`);
                // Optionally, redirect or show a success message
            })
            .catch(error => {
                console.error('Failed to create transaction:', error.response ? error.response.data : error);
                setError(error.message || "An unexpected error occurred.");
            });
    }

    return (
        <div>
            <Header onLogout={onLogout} />
            <div className="flex flex-col ml-20 mr-20 ">
                <div className="text-2xl font-bold">Add New Transaction</div>
                <div className="mt-8 space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="mt-5 space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={type} onValueChange={(value) => setType(value)}>
                        <SelectTrigger id="type">
                            <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Types</SelectLabel>
                                {Types.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-5 space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" value={amount || ''} onChange={(e) => setAmount(parseFloat(e.target.value))} />
                </div>
                <div className="mt-5 text-xl font-bold">
                    Current Beneficiary Balance: {beneficiaryBalance !== null ? beneficiaryBalance : 'Loading...'}
                </div>
                <div className="mt-5 space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <Button variant={"outline"} onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </div>
            <ErrorAlert error={error} onClose={() => setError(null)} />
        </div>
    )
}