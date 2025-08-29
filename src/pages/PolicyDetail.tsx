import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TransactionTable } from "@/components/transaction-table";
import { type Transaction } from "@/types";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";

export default function PolicyDetail() {
    const { policyId } = useParams<{ policyId: string }>();
    const [policyDetails, setPolicyDetails] = useState<any>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [proftLoss, setProfitLoss] = useState<number | null>(null);
    const [exptectedProfit, setExptpectedProfit] = useState<number | null>(null);
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
            });
    };

    const handleCancelPolicy = (policy_id: number) => {
        axios.post(`${baseURL}cancel-policy/`, { policy_id: policy_id }).then((response) => {
            console.log(`Policy cancel ${response.data}`);
            navigate("/dashboard");
        }).catch((error) => {
            console.log(error);
        });

    }

    useEffect(() => {
        if (policyId) {
            axios
                .get(`${baseURL}policy-detail/?policy_id=${policyId}`)
                .then((response) => {
                    setPolicyDetails(response.data);
                    setTransactions(response.data.transactions || []);

                    let totalProfitLoss = 0;
                    response.data.transactions.forEach((transaction: Transaction) => {
                        if (
                            transaction.type === "cancelled" ||
                            transaction.type === "credit_adjustment" ||
                            transaction.type === "payback"
                        ) {
                            totalProfitLoss -= Number(transaction.amount);
                        } else {
                            totalProfitLoss += Number(transaction.amount);
                        }
                    });
                    setProfitLoss(totalProfitLoss);
                    setExptpectedProfit(Number(response.data.client_price) - Number(response.data.co_rate))

                    console.log("Policy details fetched:", response.data);
                })
                .catch((error) => {
                    console.error("Error fetching policy details:", error);
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
            <Header />
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
                                <p
                                    className={`text-3xl font-bold ${proftLoss === null
                                        ? ""
                                        : proftLoss >= 0
                                            ? "text-green-500"
                                            : "text-red-500"
                                        }`}
                                >
                                    {proftLoss === null
                                        ? "Calculating..."
                                        : `${proftLoss.toFixed(2)}`}
                                </p>
                            </CardContent>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Expected Profit</p>
                                <p
                                    className={`text-3xl font-bold ${exptectedProfit === null
                                        ? ""
                                        : exptectedProfit >= 0
                                            ? "text-green-500"
                                            : "text-red-500"
                                        }`}
                                >
                                    {exptectedProfit === null
                                        ? "Calculating..."
                                        : `${exptectedProfit.toFixed(2)}`}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                                <CardDescription>Manage this policy.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant={"outline"}
                                    onClick={() => handleCancelPolicy(policyDetails.id)}
                                    disabled={!policyDetails}
                                    className="w-full"
                                >
                                    Cancel Policy
                                </Button>
                            </CardContent>
                            <CardContent>
                                <Button
                                    variant={"destructive"}
                                    onClick={() => handleDeletePolicy(policyDetails.id)}
                                    disabled={!policyDetails}
                                    className="w-full"
                                >
                                    Delete Policy
                                </Button>
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
        </div>
    );
}