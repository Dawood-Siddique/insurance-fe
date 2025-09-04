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
    expected_money_bank: number;
    current_money_bank: number;
    expected_money_cash: number;
    current_money_cash: number;
  };
};

export default function Policies({ onLogout }: { onLogout: () => void }) {
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
  const [expectedMoneyBank, setExpectedMoneyBank] = useState<number | null>(null);
  const [currentMoneyBank, setCurrentMoneyBank] = useState<number | null>(null);
  const [expectedMoneyCash, setExpectedMoneyCash] = useState<number | null>(null);
  const [currentMoneyCash, setCurrentMoneyCash] = useState<number | null>(null);


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
        setExpectedMoneyBank(data.expected_money_bank);
        setCurrentMoneyBank(data.current_money_bank);
        setExpectedMoneyCash(data.expected_money_cash);
        setCurrentMoneyCash(data.current_money_cash);
      }
    }
  }, [selectedTimeFrame, statsData]);

  return (
    <div>
      <Header onLogout={onLogout} />
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
            Expected Bank Money
            <br />
            {expectedMoneyBank !== null ? expectedMoneyBank : 'Loading...'}
          </div>

          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Current Bank Money
            <br />
            {currentMoneyBank !== null ? currentMoneyBank : 'Loading...'}
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Exptected Cash Money
            <br />
            {expectedMoneyCash !== null ? expectedMoneyCash : 'Loading...'}
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Current Cash Money
            <br />
            {currentMoneyCash !== null ? currentMoneyCash : 'Loading...'}
          </div>
        </div>

      </div>
      <ErrorAlert error={error} onClose={() => setError(null)} />
    </div>
  );
}