import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div>Salut</div>
      <div className="flex gap-4">
        <Button variant="link" asChild>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
        <Button variant="link" asChild>
          <Link to="/policies">Policies</Link>
        </Button>
        <Button variant="link" asChild>
          <Link to="/reports">Reports</Link>
        </Button>
        <Button>Logout</Button>
      </div>
    </header>
  );
}
