
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Policy } from '@/types';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PolicyTable({ policies }: { policies: Policy[] }) {

  return (
    <div>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issue Date</TableHead>
              <TableHead>Insurance Company</TableHead>
              <TableHead>Insured Name</TableHead>
              <TableHead>Policy Number</TableHead>
              <TableHead>Car Model</TableHead>
              <TableHead>Engine Type</TableHead>
              <TableHead>Agent Name</TableHead>
              <TableHead>Gross Price</TableHead>
              <TableHead>CO Rate</TableHead>
              <TableHead>Client Price</TableHead>
              <TableHead>Expected Profit</TableHead>
              <TableHead>Current P/L</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policies.map((policy) => (
              <TableRow key={policy.id}>
                <TableCell>{policy.issue_date}</TableCell>
                <TableCell>{policy.insurance_company}</TableCell>
                <TableCell>{policy.client}</TableCell>
                <TableCell>{policy.policy_number}</TableCell>
                <TableCell>{policy.car_model}</TableCell>
                <TableCell>{policy.engine_type}</TableCell>
                <TableCell>{policy.agent}</TableCell>
                <TableCell>{policy.gross_price}</TableCell>
                <TableCell>{policy.co_rate}</TableCell>
                <TableCell>{policy.client_price}</TableCell>
                <TableCell>{ policy.client_price - policy.co_rate }</TableCell>
                <TableCell>{0}</TableCell>
                <TableCell>{policy.payment_status}</TableCell>
                <TableCell>
                  <Button asChild>
                    <Link to={`/policy-detail/${policy.id}`}>Add Transaction</Link>
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
