"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Définition d'un tableau d'options pour le filtre de statut des tickets
// Chaque option a une structure avec:
// - label: le texte affiché à l'utilisateur (ex: "Open")
// - value: la valeur correspondante dans la base de données (ex: "OPEN")

// Le ? dans value?: string indique que value est optionnel
const statues: { label: string; value: string }[] = [
  { label: "All Statuses", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "Started", value: "STARTED" },
  { label: "Closed", value: "CLOSED" },
];

const StatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select
      defaultValue={searchParams.get("status") || "ALL"}
      onValueChange={(status) => {
        const params = new URLSearchParams(searchParams.toString());
        if (status === "ALL") {
          params.delete("status"); // Supprime le paramètre status si "ALL" est sélectionné
        } else {
          params.set("status", status);
        }
        const query = params.toString() ? `?${params.toString()}` : "";
        router.push(`/tickets${query}`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by status..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statues.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
