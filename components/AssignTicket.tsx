"use client";

import { Ticket, User } from "@prisma/client";
import React, { useState } from "react";

import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const AssignTicket = ({ ticket, users }: { ticket: Ticket; users: User[] }) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState("");

  const aassignTicket = async (userId: string) => {
    try {
      setIsAssigning(true);
      setError("");
      await axios
        .patch(`/api/tickets/${ticket.id}`, {
          assignedToUserId: userId === "0" ? null : parseInt(userId),
        })
        .catch((error) => {
          setError("unable to assign ticket");
        });
      console.error("Error assigning ticket:", error);
      setIsAssigning(false);
    } catch (error) {
      setError(
        "An error occurred while assigning the ticket. Please try again."
      );
      setIsAssigning(false);
    }
  };

  return (
    <div className="w-full">
      <Select
        onValueChange={aassignTicket}
        defaultValue={ticket.assignedToUserId?.toString() || "0"}
        disabled={isAssigning}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder="Assign Ticket"
            defaultValue={ticket.assignedToUserId?.toString() || "0"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Unassign</SelectItem>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-destructive">{error}</p>}
    </div>
  );
};

export default AssignTicket;
