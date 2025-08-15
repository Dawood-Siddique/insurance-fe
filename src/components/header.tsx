import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div>Salut</div>
      <div className="flex gap-4">
        <Button variant="link">Dashboard</Button>
        <Button variant="link">Policies</Button>
        <Button variant="link">Reports</Button>
        <Button >Logout</Button>
      </div>
    </header>
  );
}
