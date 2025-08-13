"use client";

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

import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {  User } from "@prisma/client";
import { userSchema } from "@/ValidationSchemas/user";

// Type du formulaire basé sur le schéma Zod
type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: User; // Optionnel pour l'édition de ticket
}

const UserForm = ({ user }: UserFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // useForm prend en compte le type UserFormData et utilise zodResolver pour la validation
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  // Fonction appelée lors de la soumission du formulaire
  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      setIsSubmitting(true);
      setError("");
      // si on a un ticket en props
      if (user) {
        await axios.patch(`/api/users/${user.id}`, values);
      } else {
        await axios.post("/api/users", values);
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
            defaultValue={user ? user.name : ""}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  {/* {...field} passe toutes les props nécessaires (onChange, value, etc.) */}
                  <Input placeholder="Enter ticket title" {...field} />
                </FormControl>
                <FormMessage />
                {""}
                {/* Affiche les messages d'erreur de validation */}
              </FormItem>
            )}
          />

          <div className="flex w-full space-y-4">
            <FormField
              control={form.control}
              name="username"
              defaultValue={user ? user.username : ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>username</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="Enter username"
                        {...field}
                        />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

            <FormField
                control={form.control}
                name="password"
                defaultValue={ ""}
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input
                        type="password"
                        required={!user} // Si on édite un utilisateur, le mot de passe n'est pas obligatoire
                        placeholder="Enter password"
                        {...field}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            {/* users role */}
            <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="role"
              defaultValue={user ? user.role : "USER"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select role"
                          defaultValue={user ? user.role : ""}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="TECH">TECH</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            </div>

          <Button type="submit" disabled={isSubmitting} className="">
            {user ? "Update User" : "Create User"}
          </Button>
        </form>
      </Form>
      <p className="text-destructive">{error}</p>
    </div>
  );
};

export default UserForm;
