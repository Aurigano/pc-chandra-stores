import { Command } from "cmdk";
import { CommandInput, CommandList, CommandItem } from "../ui/command";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ICommandProps {
  commands: { value: string; label: string }[];
  onSelect?: (value: string) => void;
  width?: string;
}

export default function CommandSearch({ commands, onSelect, width = "100%" }: ICommandProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const navigate = useNavigate();

  const handleValueChange = (value: string) => {
    setInputValue(value);
    setOpen(!!value);
  };

  const handleSelect = (value: string) => {
    // Close the dropdown after selection
    setOpen(false);
    setInputValue("");
    
    // If onSelect prop is provided, use it
    if (onSelect) {
      onSelect(value);
    }
    
    // Navigate immediately to the selected state
    navigate(`/storelocator/${value}`);
  };

  const filteredCommands = Array.isArray(commands)
    ? commands.filter((command) =>
        command.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];
    
  return (
    <Command style={{ width }}>
      <CommandInput
        placeholder="Type a command or search..."
        onValueChange={handleValueChange}
        value={inputValue}
      />
      {
        <CommandList>
          {open &&
            filteredCommands.length > 0 &&
            filteredCommands.map((command) => (
              <CommandItem 
                key={command.value} 
                value={command.value}
                onSelect={handleSelect}
              >
                {command.label}
              </CommandItem>
            ))}
        </CommandList>
      }
    </Command>
  );
}
