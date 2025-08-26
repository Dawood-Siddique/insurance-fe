import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { TransactionTable } from "@/components/transaction-table"
import { type Transaction } from "@/types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


const baseURL = "http://127.0.0.1:8000/"

export default function PolicyDetail() {
    const policyId = useParams<{ policyId: string }>().policyId;
    const [policyDetails, setPolicyDetails] = useState<any>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [proftLoss, setProfitLoss] = useState<number | null>(null);


    const handleDeletePolicy = (policy_id: number) => {
        axios.delete(`${baseURL}policy/`,
            {
                data: { policy_id: policy_id }
            }).then(response => {
                console.log(`Policy delete ${response.data}`)
            }).catch(error => {
                console.log(error)
            })
    }
    

    useEffect(() => {
        if (policyId) {
            // Fetch policy details using policyId
            axios.get(`${baseURL}policy-detail/?policy_id=${policyId}`)
            .then(
                (response) => {
                    setPolicyDetails(response.data);
                    setTransactions(response.data.transactions || []);
                    
                    // profitLoss is sum of all transaction amounts
                    // if the transaction.type is cancelled or credit-adjustment, then subtract the amount
                    // otherwise add the amount

                    let totalProfitLoss = 0
                    response.data.transactions.forEach((transaction: Transaction) => {
                        if (transaction.type === "cancelled" || transaction.type === "credit_adjustment") {
                            totalProfitLoss -= transaction.amount
                        } else {
                            totalProfitLoss += transaction.amount
                        }
                    })
                    setProfitLoss(totalProfitLoss);

                    console.log("Policy details fetched:", response.data);
                }
            ).catch((error) => {
                console.error('Error fetching policy details:', error);
            });
        }
    }, [policyId]);

    return (
        <div>
            <Header />
            <div className="flex flex-col ml-20 mr-20 mt-10 ">
                <div className="flex flex-row justify-between ">
                    <div className="text-2xl font-bold">Policy Detail</div>
                    <Button >
                        <Link to={`/add-transaction/${policyId}`}>Add Transaction</Link>
                    </Button>
                </div>
                <div>
                    Policy Number: {policyDetails?.policy_number ?? 'Loading...'}
                </div>
                <div>
                    Payment Method: {policyDetails?.payment_method ?? 'Loading...'}
                </div>
                <div>
                    <div className="mt-10 font-bold">Policy Information</div>
                    <div className="flex flex-row justify-between">
                        <div>
                            <div>Date</div>
                            <div>{policyDetails?.issue_date ?? 'Loading...'}</div>
                        </div>
                        <div>
                            <div>Insurance Company</div>
                            <div>{policyDetails?.insurance_company ?? 'Loading...'}</div>
                        </div>
                    </div>


                    <div className="flex flex-row justify-between">
                        <div>
                            <div>Client</div>
                            <div>{policyDetails?.client ?? 'Loading...'}</div>
                        </div>
                        <div>
                            <div>Agent Name</div>
                            <div>{policyDetails?.agent ?? 'Loading...'}</div>
                        </div>
                    </div>


                    <div className="flex flex-row justify-between">
                        <div>
                            <div>Gross Price</div>
                            <div>{policyDetails?.gross_price ?? 'Loading...'}</div>
                        </div>
                        <div>
                            <div>CO Rate</div>
                            <div>{policyDetails?.co_rate ?? 'Loading...'}</div>
                        </div>
                    </div>


                    <div className="flex flex-row justify-between">
                        <div>
                            <div>Client Price</div>
                            <div>{policyDetails?.client_price ?? 'Loading...'}</div>
                        </div>
                        <div>
                            <div>Payment Status</div>
                            <div>{policyDetails?.payment_status ?? 'Loading...'}</div>
                        </div>
                    </div>

                    {/* Transaction history table */}

                    <div className="mt-10 font-bold">Transaction History</div>
                    <TransactionTable transactions={transactions} />

                    <div className="mt-10 font-bold">Profit/Loss {proftLoss}</div>
                    <Button variant={"destructive"} onClick={() => handleDeletePolicy(policyDetails.id)}>Delete Policy</Button>
                </div>
            </div>
        </div>
    )
}
