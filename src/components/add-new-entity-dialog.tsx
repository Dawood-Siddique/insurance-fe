import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface AddNewEntityDialogProps {
    dialogTitle: string;
    dialogDescription: string;
    inputLabel: string;
    triggerText: string;
    onSave: (value: string) => void;
}

export function AddNewEntityDialog({
    dialogTitle,
    dialogDescription,
    inputLabel,
    triggerText,
    onSave,
}: AddNewEntityDialogProps) {
    const [isNewEntityDialogOpen, setIsNewEntityDialogOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleSave = () => {
        if (inputValue.trim()) {
            onSave(inputValue.trim());
            setInputValue("");
            setIsNewEntityDialogOpen(false);
        }
    };

    return (
        <Dialog open={isNewEntityDialogOpen} onOpenChange={setIsNewEntityDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className="text-blue-600 text-sm p-0 h-auto">{triggerText}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>
                        {dialogDescription}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="entityName" className="text-right">
                            {inputLabel}
                        </label>
                        <Input
                            id="entityName"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewEntityDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
