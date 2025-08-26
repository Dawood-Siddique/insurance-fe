import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { TransactionTable } from "@/components/transaction-table"
import { type Transaction } from "@/types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


const baseURL = "http://127.0.0.1:8000/"

export default function PolicyDetail() {
    const policyId = useParams<{ policyId: string }>().policyId;
    const [policyDetails, setPolicyDetails] = useState<any>(null);


    useEffect(() => {
        if (policyId) {
            // Fetch policy details using policyId
            axios.get(`${baseURL}policy-detail/?policy_id=${policyId}`)
            .then(
                (response) => {
                    setPolicyDetails(response.data);
                    console.log("Policy details fetched:", response.data);
                }
            ).catch((error) => {
                console.error('Error fetching policy details:', error);
            });
        }
    }, [policyId]);

    const tx5: Transaction[] = [{
        id: 5,
        amount: -20,
        date: "2025-08-12",
        type: "debit",
        description: "Coffee shop",
    }];
    return (
        <div>
            <Header />
            <div className="flex flex-col ml-20 mr-20 mt-10 ">
                <div className="flex flex-row justify-between ">
                    <div className="text-2xl font-bold">Policy Detail</div>
                    <Button variant={"outline"}>Edit</Button>
                </div>
                <div>
                    Policy Number: 12345
                </div>
                <div>
                    Payment Method: Bank
                </div>
                <div>
                    <div className="mt-10 font-bold">Policy Information</div>
                    <div className="flex flex-row justify-between">
                        <div>
                            <div>Date</div>
                            <div>10-12-2024</div>
                        </div>
                        <div>
                            <div>Insurance Company</div>
                            <div>ABC Insurance</div>
                        </div>
                    </div>


                    <div className="flex flex-row justify-between">
                        <div>
                            <div>Client</div>
                            <div>Client 1</div>
                        </div>
                        <div>
                            <div>Agent Name</div>
                            <div>ABC Insurance</div>
                        </div>
                    </div>


                    <div className="flex flex-row justify-between">
                        <div>
                            <div>Gross Price</div>
                            <div>100</div>
                        </div>
                        <div>
                            <div>CO Rate</div>
                            <div>200</div>
                        </div>
                    </div>


                    <div className="flex flex-row justify-between">
                        <div>
                            <div>Client Price</div>
                            <div>100$</div>
                        </div>
                        <div>
                            <div>Payment Status</div>
                            <div>Cancelled</div>
                        </div>
                    </div>

                    {/* Transaction history table */}

                    <div className="mt-10 font-bold">Transaction History</div>
                    <TransactionTable transactions={tx5} />

                    <div className="mt-10 font-bold">Profit/Loss 100</div>
                    <Button variant={"destructive"}>Delete Policy</Button>
                </div>
            </div>
        </div>
    )
}
