import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";

const baseURL = "http://127.0.0.1:8000/";

type TimeFrame = "All" | "Daily" | "Weekly" | "Monthly";

export default function Policies() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>("All");

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
            150
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Profit
            <br />
            150
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Revenue
            <br />
            150
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Cancelled Policies
            <br />
            150
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Policy Average Rate
            <br />
            150
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-10 m-10 w-74" >
            Policy Average Profit
            <br />
            150
          </div>

        </div>

      </div>
    </div>
  );
}