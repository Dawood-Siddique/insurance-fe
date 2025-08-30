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
      <div className="flex flex-col items-center ml-20 mr-20 min-h-screen">
        <div className="text-4xl font-bold">Policies Stat</div>
        <div className="flex gap-2 mt-4">
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
    </div>
  );
}