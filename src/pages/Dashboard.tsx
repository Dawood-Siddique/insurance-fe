import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { PolicyTable } from "@/components/policy-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000/";

export default function Dashboard() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}policy/`).then((res) => {
      setPolicies(res.data);
      console.log(res.data);
    }).catch((error) => {
      console.error('Error fetching policies:', error);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center ml-20 mr-20 min-h-screen">
        <div className="flex justify-between bg-blue-400 w-full p-4">
          <div className="text-4xl font-bold">Policies</div>
          <div>
            <Button>
              <Link to="/add-policy">Add Policy</Link>
            </Button>
          </div>
        </div>
        <PolicyTable policies={policies} />
      </div>
    </div>
  );
}