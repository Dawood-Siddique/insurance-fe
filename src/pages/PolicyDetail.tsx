import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Alert } from "@/components/alert";
import { ErrorAlert } from "@/components/error-alert";
import { TransactionTable } from "@/components/transaction-table";
import { type Transaction } from "@/types";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";

export default function PolicyDetail({ onLogout }: { onLogout: () => void }) {
    const { policyId } = useParams<{ policyId: string }>();
    const [policyDetails, setPolicyDetails] = useState<any>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [newStatus, setNewStatus] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleDeletePolicy = (policy_id: number) => {
        axios
            .delete(`${baseURL}policy/`, {
                data: { policy_id: policy_id },
            })
            .then((response) => {
                console.log(`Policy delete ${response.data}`);
                navigate("/dashboard");
            })
            .catch((error) => {
                console.log(error);
                setError(error.message || "An unexpected error occurred.");
            });
    };

    const handleChangeStatus = (policy_id: number, status: string) => {
        axios
            .post(`${baseURL}change-status/`, {
                policy_id: policy_id,
                status: status,
            })
            .then((response) => {
                console.log(`Policy status changed to ${status}: ${response.data}`);
                // navigate("/dashboard");
            })
            .catch((error) => {
                console.log(error);
                setError(error.message || "An unexpected error occurred.");
            });
    };

    useEffect(() => {
        if (policyId) {
            axios
                .get(`${baseURL}policy-detail/?policy_id=${policyId}`)
                .then((response) => {
                    setPolicyDetails(response.data);
                    setTransactions(response.data.transactions || []);
                    console.log("Policy details fetched:", response.data);
                })
                .catch((error) => {
                    console.error("Error fetching policy details:", error);
                    setError(error.message || "An unexpected error occurred.");
                });
        }
    }, [policyId]);

    const DetailItem = ({ label, value }: { label: string; value: any }) => (
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-medium">{value ?? "Loading..."}</p>
        </div>
    );

    return (
        <div>
            <Header onLogout={onLogout} />
            <main className="container mx-auto p-4 md:p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Policy Detail</h1>
                    <Button asChild>
                        <Link to={`/add-transaction/${policyId}`}>Add Transaction</Link>
                    </Button>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Policy Information</CardTitle>
                            <CardDescription>
                                Details for policy number:{" "}
                                {policyDetails?.policy_number ?? "Loading..."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6 sm:grid-cols-2">
                            <DetailItem label="Issue Date" value={policyDetails?.issue_date} />
                            <DetailItem
                                label="Insurance Company"
                                value={policyDetails?.insurance_company}
                            />
                            <DetailItem label="Client" value={policyDetails?.client} />
                            <DetailItem label="Agent Name" value={policyDetails?.agent} />
                            <DetailItem
                                label="Gross Price"
                                value={policyDetails?.gross_price}
                            />
                            <DetailItem label="CO Rate" value={policyDetails?.co_rate} />
                            <DetailItem
                                label="Client Price"
                                value={policyDetails?.client_price}
                            />
                            <DetailItem
                                label="Exptected Profit"
                                value={policyDetails?.expected_profit}
                            />
                            <DetailItem
                                label="Payment Status"
                                value={policyDetails?.payment_status}
                            />
                            <DetailItem
                                label="Payment Method"
                                value={policyDetails?.payment_method}
                            />
                        </CardContent>
                    </Card>

                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Financials</CardTitle>
                                <CardDescription>Profit and Loss summary.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Profit/Loss</p>
                                <p className="font-medium text-4xl">{policyDetails?.profit_loss ?? "Loading..."}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                                <CardDescription>Manage this policy.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="flex items-center space-x-2">
                                    <Select onValueChange={setNewStatus} value={newStatus}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="complete">Complete</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        onClick={() => handleChangeStatus(policyDetails.id, newStatus)}
                                        disabled={!policyDetails || !newStatus}
                                        variant={"secondary"}
                                    >
                                        Update
                                    </Button>
                                </div>
                                <Alert
                                    onConfirm={() => handleDeletePolicy(policyDetails.id)}
                                    title="Are you absolutely sure?"
                                    description="This action cannot be undone. This will permanently delete this policy and remove its data from our servers."
                                    trigger={
                                        <Button
                                            variant={"destructive"}
                                            disabled={!policyDetails}
                                            className="w-full"
                                        >
                                            Delete Policy
                                        </Button>
                                    }
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Transaction History</CardTitle>
                            <CardDescription>
                                A log of all financial transactions for this policy.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TransactionTable transactions={transactions} />
                        </CardContent>
                    </Card>
                </div>
            </main>
            <ErrorAlert error={error} onClose={() => setError(null)} />
        </div>
    );
}
