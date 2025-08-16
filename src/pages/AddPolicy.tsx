import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/ui/combobox"
import { useState } from "react"

const insuranceCompanies = [
    { value: "allianz", label: "Allianz" },
    { value: "axa", label: "AXA" },
    { value: "generali", label: "Generali" },
    { value: "zurich", label: "Zurich" },
]

export default function AddPolicy() {
    const [company, setCompany] = useState("")

    return (
        <div className="flex justify-center h-screen ">
            <div className="flex-row">
                <h1>Policy Management</h1>
                <div className="flex flex-row gap-4">
                    <div>
                        Date
                        <Input type="date" />
                    </div>
                    <div>
                        Insurance Company
                        <div>
                            <Combobox
                                items={insuranceCompanies}
                                value={company}
                                onChange={setCompany}
                                placeholder="Select company..."
                                searchPlaceholder="Search company..."
                                noResultsMessage="No company found."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div>
                        Policy Number
                        <Input type="text" />
                    </div>
                    <div>
                        Insured Name
                        <Input type="text" />
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div>
                        Car Model
                        <Input type="text" />
                    </div>
                    <div>
                        Engine Type
                        <Input type="text" />
                    </div>
                </div>

                <div>
                    Agent Name
                    <Input type="text" />
                </div>
            </div>
        </div>
    )
}
