'use client';

import Link from 'next/link';
import React, { useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const DeleteButtom = ({ticketId}:{ticketId:number}) => {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);


    const DeleteTicket = async () => {
        try
        {
            setIsDeleting(true);
           await axios.delete(`/api/tickets/${ticketId}`);
            setIsDeleting(false);
            router.push('/tickets');
            router.refresh(); // Refresh the page to reflect the deletion
           
        }
        catch (error) {
            setIsDeleting(false);
            setError('An error occurred while deleting the ticket. Please try again.');
            console.error('Error deleting ticket:', error);
        }
    }
  return (
    <>
        <AlertDialog>
          <AlertDialogTrigger
            className={buttonVariants({
              variant: "destructive",
            })}
          >
            Delete ticket
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                ticket.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className={buttonVariants({
                  variant: "destructive",
                })}
                disabled={isDeleting}
                onClick={DeleteTicket}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <p className="text-destructive">{error}</p>
    </>
  );
}

export default DeleteButtom