"use client"

import * as React from "react"
import { mdiClose, mdiCheck, mdiChevronDown, mdiChevronUp } from "@mdi/js"
import Icon from "@mdi/react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/new-york/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"
import { Badge } from "@/registry/new-york/ui/badge"

const filterVariants = {
  single: "single",
  multi: "multi",
  badge: "badge",
} as const

type FilterVariant = keyof typeof filterVariants

interface FilterProps<T extends { value: string; label: string }> {
  items: T[]
  placeholder: string
  variant?: FilterVariant
  className?: string
  selectedItems: T | T[]
  onSelect?: (value: T | T[] | null) => void
  onClear?: () => void
}

export function Filter<T extends { value: string; label: string }>({
  items,
  placeholder,
  variant = "single",
  className,
  selectedItems,
  onSelect,
  onClear,
}: FilterProps<T>) {
  const [open, setOpen] = React.useState(false)

  // Ensure selectedItems is always an array
  const selectedItemsArray = React.useMemo(() => {
    if (!selectedItems) return []
    return Array.isArray(selectedItems) ? selectedItems : [selectedItems]
  }, [selectedItems])

  const handleSelect = (item: T) => {
    if (variant === "single") {
      onSelect?.(item)
      setOpen(false)
    } else {
      const isSelected = selectedItemsArray.some((i) => i.value === item.value)
      const newItems = isSelected
        ? selectedItemsArray.filter((i) => i.value !== item.value)
        : [...selectedItemsArray, item]
      onSelect?.(newItems)
    }
  }

  const handleRemoveItem = (item: T, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (variant === "single") {
      onSelect?.(null)
    } else {
      const newItems = selectedItemsArray.filter((i) => i.value !== item.value)
      onSelect?.(newItems)
    }
  }

  const isActive = open

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          colorScheme="neutral"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "border-input border-1 data-[state=open]:border-2 data-[state=open]:border-primary rounded-md text-md data-[placeholder]:text-muted-foreground flex w-fit items-center justify-between gap-2 bg-white px-3 py-2 whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[1px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 h-10",
            isActive && "border-2 border-primary",
            className
          )}
        >
          <span className={cn("flex items-center gap-2", isActive ? "text-neutral-fg" : "text-black")}>
            <span className="text-neutral-fg">
              {placeholder}{selectedItemsArray.length > 0 && ":"}
            </span>
            {selectedItemsArray.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {variant === "badge" ? (
                  selectedItemsArray.map((item) => (
                    <Badge
                      key={item.value}
                      variant="secondary"
                      className="text-xs"
                      onClick={(e) => handleRemoveItem(item, e)}
                    >
                      {item.label}
                      <Icon path={mdiClose} className="ml-1 h-3 w-3" />
                    </Badge>
                  ))
                ) : (
                  <span className="text-black">
                    {selectedItemsArray.length === 1
                      ? selectedItemsArray[0].label
                      : `${selectedItemsArray.length} selected`}
                  </span>
                )}
              </div>
            )}
          </span>
          <Icon
            path={open ? mdiChevronUp : mdiChevronDown}
            className="h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => {
                const isSelected = selectedItemsArray.some((i) => i.value === item.value)
                return (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    {isSelected && <Icon path={mdiCheck} className="h-4 w-4" />}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 