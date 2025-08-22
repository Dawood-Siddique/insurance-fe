
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function PolicyTable({ policies }) {

  return (
    <div>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issue Date</TableHead>
              <TableHead>Insured Name</TableHead>
              <TableHead>Policy Number</TableHead>
              <TableHead>Car Model</TableHead>
              <TableHead>Agent Name</TableHead>
              <TableHead>Gross Price</TableHead>
              <TableHead>Client Price</TableHead>
              <TableHead>Profit</TableHead>
              <TableHead>Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policies.map((policy) => (
              <TableRow key={policy.id}>
                <TableCell>{policy.issue_date}</TableCell>
                <TableCell>{policy.client_name}</TableCell>
                <TableCell>{policy.policy_number}</TableCell>
                <TableCell>{policy.car_model}</TableCell>
                <TableCell>{policy.agent_name}</TableCell>
                <TableCell>{policy.gross_price}</TableCell>
                <TableCell>{policy.client_price}</TableCell>
                <TableCell>{policy.profit}</TableCell>
                <TableCell>{policy.payment_status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
