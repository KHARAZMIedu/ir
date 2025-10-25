import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  teacher: string;
  description: string;
  duration: string;
  price: string;
  icon: LucideIcon;
  fullDescription: string;
  onShowDetails: () => void;
}

const CourseCard = ({
  title,
  teacher,
  description,
  duration,
  icon: Icon,
  onShowDetails,
}: CourseCardProps) => {
  return (
    <article className="bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
      <div className="h-48 bg-gradient-hero flex items-center justify-center">
        <Icon className="w-20 h-20 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground">
          <span className="font-semibold">مدرس:</span> {teacher}
        </p>
        <p className="text-foreground min-h-[3rem]">{description}</p>
        
        <div className="flex justify-between items-center pt-4">
          <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium">
            مدت زمان: {duration}
          </span>
        </div>
        
        <Button
          onClick={onShowDetails}
          className="w-full bg-primary hover:bg-primary-glow transition-all"
        >
          اطلاعات بیشتر
        </Button>
      </div>
    </article>
  );
};

export default CourseCard;
