"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface AutocompleteProps {
    items: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    noResultsMessage?: string;
    loadingMessage?: string;
    disabled?: boolean;
    loading?: boolean;
}

export function Autocomplete({
    items,
    value,
    onChange,
    placeholder = "Type to search...",
    noResultsMessage = "No results found.",
    loadingMessage = "Loading...",
    disabled = false,
    loading = false,
}: AutocompleteProps) {
    const [inputValue, setInputValue] = React.useState(value)
    const [isOpen, setIsOpen] = React.useState(false)

    // Sync inputValue with value prop
    React.useEffect(() => {
        setInputValue(value)
    }, [value])

    // Filter items based on input
    const filteredItems = React.useMemo(() => {
        console.log('Filtering items:', items, 'for input:', inputValue)
        if (!inputValue) return []
        const filtered = items.filter(item =>
            item.label.toLowerCase().includes(inputValue.toLowerCase())
        )
        console.log('Filtered items:', filtered)
        return filtered
    }, [items, inputValue])

    // Update dropdown visibility
    React.useEffect(() => {
        setIsOpen(filteredItems.length > 0 || loading)
    }, [filteredItems, loading])

    const handleSelect = (selectedValue: string) => {
        setInputValue(selectedValue)
        onChange(selectedValue)
        setIsOpen(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInputValue(newValue)
        onChange(newValue) // Update value immediately for form state
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setIsOpen(false)
        }
    }

    console.log('Showing dropdown?', isOpen, 'filteredItems.length:', filteredItems.length, 'loading:', loading)

    return (
        <div className="relative">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsOpen(filteredItems.length > 0 || loading)}
                onBlur={() => setTimeout(() => setIsOpen(false), 150)} // Delay to allow selection
                placeholder={placeholder}
                disabled={disabled || loading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {isOpen && (
                <div className="absolute top-full z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {loading ? (
                        <div className="px-3 py-2 text-sm text-muted-foreground">{loadingMessage}</div>
                    ) : filteredItems.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-muted-foreground">{noResultsMessage}</div>
                    ) : (
                        <div>
                            {filteredItems.map((item) => (
                                <div
                                    key={item.value}
                                    onMouseDown={() => handleSelect(item.value)}
                                    className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                >
                                    <span>{item.label}</span>
                                    <Check
                                        className={cn(
                                            "h-4 w-4",
                                            value === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}