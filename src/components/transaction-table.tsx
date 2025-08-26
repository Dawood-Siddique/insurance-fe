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

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
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
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>
                                    <Button variant={"outline"} asChild>
                                        <Link to={`/add-transaction/${transaction.id}`}>Delete</Link>
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