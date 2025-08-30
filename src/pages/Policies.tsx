import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";

const baseURL = "http://127.0.0.1:8000/";

type TimeFrame = "All" | "Daily" | "Weekly" | "Monthly";

export default function Policies() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>("All");
  const [totalPolicies, setTotalPolicies] = useState<number | null>(null);
  const [profit, setProfit] = useState<number | null>(null);
  const [revenue, setRevenue] = useState<number | null>(null);
  const [cancelledPolicies, setCancelledPolicies] =useState<number | null>(null);
  const [averageRate, setAverageRate] = useState<number | null>(null);
  const [averageProfit, setAverageProfit] = useState<number | null>(null);

  // Fetch stats based on selected time frame
  useEffect(() =>{
    axios.get(`${baseURL}stats/`).then((res) => {
      const data = res.data;
      setTotalPolicies(data.total_policies);
      setProfit(data.profit);
      setRevenue(data.revenue);
      setCancelledPolicies(data.cancelled_policies);
      setAverageRate(data.average_rate);
      setAverageProfit(data.average_profit);

      console.log(data);
    }).catch((error) => {
      console.error('Error fetching stats:', error);
    });
  }, [])

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center ml-20 mr-20 min-h-screen ">
        <div className="flex justify-between w-full mt-4">
          <div className="text-4xl font-bold">Policies Stat</div>
        </div>
        <div className="flex justify-between w-full mt-4">
          <div className="gap-2 mt-4">
            {(["All", "Daily", "Weekly", "Monthly"] as TimeFrame[]).map((frame) => (
              <Button
                key={frame}
                variant={selectedTimeFrame === frame ? "default" : "outline"}
                onClick={() => setSelectedTimeFrame(frame)}
                className="mr-2"
              >
                {frame}
              </Button>
            ))}
          </div>
        </div>

        {/* Cards for Stats */}

        <div className="flex flex-wrap text-xl font-semibold">
          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Total Policies
            <br />
            {totalPolicies !== null ? totalPolicies : 'Loading...'}
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Profit
            <br />
            {profit !== null ? profit : 'Loading...'}
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Revenue
            <br />
            {revenue !== null ? revenue : 'Loading...'}
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Cancelled Policies
            <br />
            {cancelledPolicies !== null ? cancelledPolicies : 'Loading...'}
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Policy Average Rate
            <br />
            {averageRate !== null ? averageRate : 'Loading...'}
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Policy Average Profit
            <br />
            {averageProfit !== null ? averageProfit : 'Loading...'}
          </div>
        </div>
      
      </div>
    </div>
  );
}