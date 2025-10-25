import { UserRound } from "lucide-react";

interface TeacherCardProps {
  name: string;
  subject: string;
}

const TeacherCard = ({ name, subject }: TeacherCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-hero flex items-center justify-center shadow-md">
        <UserRound className="w-14 h-14 text-primary-foreground" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{name}</h3>
      <p className="text-primary font-medium">{subject}</p>
    </div>
  );
};

export default TeacherCard;
