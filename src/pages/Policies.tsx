import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { ErrorAlert } from "@/components/error-alert";

const baseURL = "http://127.0.0.1:8000/";

type TimeFrame = "All" | "Daily" | "Weekly" | "Monthly" | "Month Start";

type StatsData = {
  [key: string]: {
    policy_count: number;
    profit: number;
    revenue: number;
    loss: number;
    cancel_policy: number;
    average_rate: number;
    average_profit: number;
    expected_money: number;
    current_money: number;
  };
};

export default function Policies() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>("All");
  const [totalPolicies, setTotalPolicies] = useState<number | null>(null);
  const [profit, setProfit] = useState<number | null>(null);
  const [revenue, setRevenue] = useState<number | null>(null);
  const [loss, setLoss] = useState<number | null>(null);
  const [cancelledPolicies, setCancelledPolicies] = useState<number | null>(
    null
  );
  const [averageRate, setAverageRate] = useState<number | null>(null);
  const [averageProfit, setAverageProfit] = useState<number | null>(null);
  const [expectedMoney, setExpectedMoney] = useState<number | null>(null);
  const [currentMoney, setCurrentMoney] = useState<number | null>(null);


  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch stats based on selected time frame
  useEffect(() => {
    axios
      .get(`${baseURL}stats/`)
      .then((res) => {
        setStatsData(res.data);
        console.log("Stats data fetched:", res.data);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
        setError(error.message || "An unexpected error occurred.");
      });
  }, []);

  useEffect(() => {
    if (statsData) {
      const keyMap: { [key in TimeFrame]: string } = {
        "Daily": "1",
        "Weekly": "7",
        "Monthly": "30",
        "All": "all",
        "Month Start": "start",
      };
      const key = keyMap[selectedTimeFrame];
      const data = statsData[key];

      if (data) {
        setTotalPolicies(data.policy_count);
        setProfit(data.profit);
        setRevenue(data.revenue);
        setCancelledPolicies(data.cancel_policy);
        setLoss(data.loss);
        setAverageRate(data.average_rate);
        setAverageProfit(data.average_profit);
        setExpectedMoney(data.expected_money);
        setCurrentMoney(data.current_money);
      }
    }
  }, [selectedTimeFrame, statsData]);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center ml-20 mr-20 min-h-screen ">
        <div className="flex justify-between w-full mt-4">
          <div className="text-4xl font-bold">Policies Stat</div>
        </div>
        <div className="flex justify-between w-full mt-4">
          <div className="gap-2 mt-4">
            {(["All", "Daily", "Weekly", "Monthly", "Month Start"] as TimeFrame[]).map((frame) => (
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
            Loss
            <br />
            {loss !== null ? loss : 'Loading...'}
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
            Average Expected Profit
            <br />
            {averageProfit !== null ? averageProfit : 'Loading...'}
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Expected Money
            <br />
            {expectedMoney !== null ? expectedMoney : 'Loading...'}
          </div>

          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Current Money
            <br />
            {currentMoney !== null ? currentMoney : 'Loading...'}
          </div>
        </div>

      </div>
      <ErrorAlert error={error} onClose={() => setError(null)} />
    </div>
  );
}