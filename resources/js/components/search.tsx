import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleUser, Trophy } from "lucide-react";
import debounce from "lodash/debounce";
import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

interface Selected {
    id: number;
    name: string;
}

type Type = 'user' | 'team';

interface SearchProps {
    onSelect: (user: number) => void;
    type: Type;
}

export default function Search({ onSelect, type }: SearchProps) {
    const [focus, setFocus] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const controllerRef = useRef<AbortController | null>(null);
    const [results, setResults] = useState<Selected[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchResults = useCallback(async (value: string, type: Type) => {
        if (value.length < 2) {
            setResults([])
            setOpen(false)
            return
        }

        if (controllerRef.current) {
            controllerRef.current.abort()
        }

        controllerRef.current = new AbortController()

        setLoading(true)
        setOpen(true)
        try {
            const response = await axios.get<Selected[]>(`/api/search?type=${type}&query=${value}`, {
                signal: controllerRef.current.signal
            })
            setResults(response.data)
            setOpen(true)
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error(error)
            }
        } finally {
            setLoading(false)
        }
    }, [])

    const debouncedFetchResults = useMemo(() => debounce(fetchResults, 300), [fetchResults])

    const handleSelect = (selected: Selected) => {
        onSelect(selected.id);
        setInputValue('');
        setResults([]);
    }

    useEffect(() => {
        if (focus) {
            inputRef.current?.focus();
        }
    }, [focus]);

    useEffect(() => {
        debouncedFetchResults(inputValue, type)
    }, [inputValue, debouncedFetchResults, type])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverAnchor asChild>
                <div className="relative">
                    <Input type="text" name="search" id="search" placeholder={`Search for a ${type}`}
                        value={inputValue} ref={inputRef} onBlur={() => { setTimeout(() => setFocus(false), 150) }} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSelect(results[0]);
                                setFocus(false);
                            }
                        }} />
                </div>
            </PopoverAnchor>
            <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <Command>
                    <CommandList>
                        {loading ? (
                            <div className="flex flex-row gap-2 items-center p-2 hover:bg-gray-100 rounded-md">
                                <Skeleton className="w-[26px] h-[26px] rounded-full" />
                                <Skeleton className="w-[100px] h-[26px] rounded-md" />
                            </div>
                        ) : (
                            results.length > 0 ? (
                                results.map((result) => (
                                    <CommandItem key={result.id} onSelect={() => {
                                        handleSelect(result);
                                    }}>
                                        <div className="flex flex-row gap-2 items-center p-2 hover:bg-gray-100 rounded-md">
                                            {type === 'user' ? <CircleUser className="w-[26px] h-[26px] rounded-full" /> : <Trophy className="w-[26px] h-[26px] rounded-full" />}
                                            <span>{result.name}</span>
                                        </div>
                                    </CommandItem>
                                ))
                            ) : (
                                <CommandItem disabled>No results found.</CommandItem>
                            ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}