import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

export default function PolicyDetail() {
    return (
        <div>
            <Header />
            <div className="flex flex-col ml-20 mr-20 mt-10 bg-amber-100">
                <div className="flex flex-row justify-between ">
                    <div className="text-2xl font-bold">Policy Detail</div>
                    <Button variant={"outline"}>Edit</Button>
                </div>
                <div>
                    Policy Number: 12345
                </div>
                <div>
                    Payment Method: Bank
                </div>
                <div>
                    <div className="mt-10 font-bold">Policy Information</div>
                    <div className="flex flex-row justify-between">
                        <div>
                            <div>Date</div>
                            <div>10-12-2024</div>
                        </div>
                        <div>
                            <div>Insurance Company</div>
                            <div>ABC Insurance</div>
                        </div>
                    </div>


                    <div className="flex flex-row justify-between">
                        <div>
                            <div>Client</div>
                            <div>Client 1</div>
                        </div>
                        <div>
                            <div>Agent Name</div>
                            <div>ABC Insurance</div>
                        </div>
                    </div>
                    

                    <div className="flex flex-row justify-between">
                        <div>
                            <div>Gross Price</div>
                            <div>100</div>
                        </div>
                        <div>
                            <div>CO Rate</div>
                            <div>200</div>
                        </div>
                    </div>
                    

                    <div className="flex flex-row justify-between">
                        <div>
                            <div>Client Price</div>
                            <div>100$</div>
                        </div>
                        <div>
                            <div>Payment Status</div>
                            <div>Cancelled</div>
                        </div>
                    </div>
                
                    {/* Transaction history table */}

                    <div>Transaction History</div>
                    
                </div>
            </div>
        </div>
    )
}
