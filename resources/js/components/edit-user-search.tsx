import { Award } from "lucide-react";
import { Popover, PopoverAnchor, PopoverContent } from "./ui/popover";
import { Skeleton } from "./ui/skeleton";
import { Input } from "./ui/input";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Command, CommandList, CommandItem } from "./ui/command";
import debounce from "lodash/debounce";
import axios from "axios";
import { User } from "@/types";

interface UserSearchProps {
    focus: boolean;
    setFocus: (focus: boolean) => void;
    onUserAssign?: (user: User, role: string, gameId: number) => void;
    role: string;
    gameId: number;
}

interface UserName {
    id: string;
    name: string;
}

export default function UserSearch({ setFocus, focus, onUserAssign, role, gameId }: UserSearchProps) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const controllerRef = useRef<AbortController | null>(null);
    const [results, setResults] = useState<UserName[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = useCallback(async (value: string) => {
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
                const response = await axios.get<UserName[]>(`/api/search?type=referee&query=${value}`, {
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

    const debouncedFetchUsers = useMemo(() => debounce(fetchUsers, 300), [fetchUsers])

    const handleSelect = (user: UserName) => {
        setFocus(false);

        axios.get(route('user', user.id)).then((response) => {
            onUserAssign?.(response.data as User, role, gameId);
        })
    }

    useEffect(() => {
        if (focus) {
            inputRef.current?.focus();
        }
    }, [focus]);

    useEffect(() => {
        debouncedFetchUsers(inputValue)
    }, [inputValue, debouncedFetchUsers])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverAnchor asChild>
                <div className="relative">
                    <Input type="text" className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-full w-full" name="search" id="search" placeholder="Search for a user" 
                        value={inputValue} ref={inputRef} onBlur={() => {setTimeout(() => setFocus(false), 150)}} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSelect(results[0]);
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
                                results.map((user) => (
                                    <CommandItem key={user.id} onSelect={() => {
                                        handleSelect(user);
                                    }}>
                                        <div className="flex flex-row gap-2 items-center p-2 hover:bg-gray-100 rounded-md">
                                            <Award className="w-[26px] h-[26px] rounded-full" />
                                            <span>{user.name}</span>
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
    )
}