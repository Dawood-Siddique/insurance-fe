import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center ml-20 mr-20 min-h-screen bg-amber-400">
        <div className="flex justify-between bg-blue-400 w-full">
          <div className="text-4xl font-bold">
            Policies
          </div>
          <div>
            <Button >
              <Link to="/add-policy" >
                Add Policy
              </Link>
            </Button>
          </div>
        </div>
        <div>
          Table
        </div>
      </div>
    </div>
  );
};
