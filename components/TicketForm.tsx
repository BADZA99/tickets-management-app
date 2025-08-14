"use client";

// Import du schéma de validation Zod pour le ticket
import { ticketSchema } from "@/ValidationSchemas/ticket";
// Import des composants de formulaire de shadcn/ui
import {
  Form,
  FormControl, // Wrapper pour les inputs
  FormField, // Composant qui gère la logique du champ
  FormItem, // Container pour chaque champ
  FormLabel, // Label du champ
  FormMessage, // Affichage des messages d'erreur
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import z from "zod";
// Import de react-hook-form avec Controller pour les composants personnalisés
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Import de l'éditeur markdown pour la description
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Ticket } from "@prisma/client";

// Type du formulaire basé sur le schéma Zod
type TicketFormData = z.infer<typeof ticketSchema>;

interface TicketFormProps {
  ticket?: Ticket; // Optionnel pour l'édition de ticket
}

const TicketForm = ({ ticket }: TicketFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // useForm prend en compte le type TicketFormData et utilise zodResolver pour la validation
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  // Fonction appelée lors de la soumission du formulaire
  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    try {
      setIsSubmitting(true);
      setError("");
      // si on a un ticket en props
      if (ticket) {
        await axios.patch(`/api/tickets/${ticket.id}`, values);
      } else {
        await axios.post("/api/tickets", values);
      }

      setIsSubmitting(false);
      router.push("/tickets");
      router.refresh(); // Rafraîchit la page pour afficher le nouveau ticket
    } catch (error) {
      setError(
        "An error occurred while submitting the form. Please try again."
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          {/* FormField est utilisé pour les champs de formulaire standards */}
          <FormField
            control={form.control} // Contrôle du champ par react-hook-form
            defaultValue={ticket ? ticket.title : ""}
            name="title"
            render={(
              { field } // Rendu personnalisé du champ avec les props de react-hook-form
            ) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  {/* {...field} passe toutes les props nécessaires (onChange, value, etc.) */}
                  <Input placeholder="Enter ticket title" {...field} />
                </FormControl>
                <FormMessage />{" "}
                {/* Affiche les messages d'erreur de validation */}
              </FormItem>
            )}
          />

          {/* Controller est utilisé pour les composants de formulaire personnalisés qui ne sont pas natifs */}
          {/* SimpleMDE est un éditeur markdown qui nécessite une intégration spéciale */}
          <Controller
            name="description"
            defaultValue={ticket ? ticket.description : ""}
            control={form.control} // Contrôle du formulaire
            render={(
              { field } // Rendu personnalisé avec les props du champ
            ) => (
              <SimpleMDE
                placeholder="Enter ticket description"
                {...field} // Passe les props de contrôle (onChange, value, etc.)
              />
            )}
          />

          <div className="flex w-full space-y-4">
            <FormField
              control={form.control}
              name="status"
              defaultValue={ticket ? ticket.status : "OPEN"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select status"
                          defaultValue={ticket ? ticket.status : ""}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="STARTED">STARTED</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full space-y-4">
            <FormField
              control={form.control}
              name="priority"
              defaultValue={ticket ? ticket.priority : ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select priority"
                          defaultValue={ticket ? ticket.priority : ""}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="">
            {ticket ? "Update Ticket" : "Create Ticket"}
          </Button>
        </form>
      </Form>
      {error && (
        <div className="text-destructive mt-4">
          {error} 
        </div>
      )}
    </div>
  );
};

export default TicketForm;
