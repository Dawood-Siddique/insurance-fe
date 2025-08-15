import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { ComboboxDemo } from "@/components/ui/combobox"

export default function AddPolicy() {
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
                            <ComboboxDemo />
                        </div>
                        {/* <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select> */}
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div>
                        Policy Number
                        <Input type="text" />
                    </div>
                    <div>
                        Insured Name
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>

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
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            </div>
        </div>
    )
}