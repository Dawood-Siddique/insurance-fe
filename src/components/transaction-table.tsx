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
import { Link } from "react-router-dom";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
    const handleDelete = (transaction_id: number) => {
        axios.delete(`${baseURL}ledger/`,
            {
                data: { transaction_id: transaction_id }
            }).then(response => {
                console.log(`Transaction delete ${response.data}`)
                window.location.reload();
            }).catch(error => {
                console.log(error)
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
                                    <Button variant={"outline"} onClick={() => handleDelete(transaction.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}