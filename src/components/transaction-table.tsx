import { type Transaction } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/alert";
import axios from "axios";
import { useState } from "react";
import { ErrorAlert } from "@/components/error-alert";

const baseURL = import.meta.env.VITE_BASE_URL;

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
    const [error, setError] = useState<string | null>(null);

    const handleDelete = (transaction_id: number) => {
        axios.delete(`${baseURL}ledger/`,
            {
                data: { transaction_id: transaction_id }
            }).then(response => {
                console.log(`Transaction delete ${response.data}`)
                window.location.reload();
            }).catch(error => {
                console.log(error)
                setError(error.message || "An unexpected error occurred.");
            })
    }

    return (
        <div>
            <div className="w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...transactions].reverse().map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.created_at}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>
                                    <Alert
                                        onConfirm={() => handleDelete(transaction.id)}
                                        title="Are you absolutely sure?"
                                        description="This action cannot be undone. This will permanently delete this transaction and remove its data from our servers."
                                        trigger={
                                            <Button variant={"outline"}>
                                                Delete
                                            </Button>
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <ErrorAlert error={error} onClose={() => setError(null)} />
        </div>
    );
}