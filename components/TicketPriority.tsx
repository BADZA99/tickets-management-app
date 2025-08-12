import { Priority } from '@prisma/client';
import { FlameIcon } from 'lucide-react';


interface Props {
  priority: Priority;
}

const priorityMap: Record<Priority, { label: string; level: 1 | 2 | 3 }> = {
    LOW: { label: 'Low', level: 1 },
    MEDIUM: { label: 'Medium', level: 2 },
    HIGH: { label: 'High', level: 3 },
    };
const TicketPriority = ({ priority }:Props) => {
  return (
    <>
      <FlameIcon
        className={`${
          priorityMap[priority].level >= 1 ? "text-red-500" : "text-muted"
        }`}
        size={20}
      />
      <FlameIcon
        className={`${
          priorityMap[priority].level >= 2 ? "text-red-500" : "text-muted"
        }`}
        size={20}
      />
      <FlameIcon
        className={`${
          priorityMap[priority].level >= 3 ? "text-red-500" : "text-muted"
        }`}
        size={20}
      />
    </>
  );
};

export default TicketPriority
