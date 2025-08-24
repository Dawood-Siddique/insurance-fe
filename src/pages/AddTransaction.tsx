import { Header } from "@/components/header"
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const baseURL = "http://127.0.0.1:8000/"
const Types = [
    {value: "cancelled", label: "cancelled"},
    {value: "payment", label: "payment"},
    {value: "credit-adjustment", label: "credit-adjustment"},
    {value: "payback", label: "payback"}
]

export default function AddTransaction() {
    const { policyId } = useParams<{ policyId: string }>();
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState<number | null>(null);
    const [description, setDescription] = useState("");


    return (
        <div>
            <Header />
            <div className="flex flex-col ml-20 mr-20 ">
                <h1 className="text-3xl">Add Transaction for Policy ID: {policyId}</h1>
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
                    Current Beneficiary Balance: 5000
                </div>
                <div className="mt-5 space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <Button variant={"outline"} >Cancel</Button>
                    <Button >Save</Button>
                </div>
            </div>
        </div>
    )
}
