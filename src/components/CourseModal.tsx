import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    title: string;
    teacher: string;
    duration: string;
    price: string;
    fullDescription: string;
  } | null;
}

const CourseModal = ({ isOpen, onClose, course }: CourseModalProps) => {
  if (!course) return null;

  const scrollToRegistration = () => {
    onClose();
    document.querySelector("#registration")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{course.title}</DialogTitle>
          <DialogDescription className="text-right">
            جزئیات کامل دوره آموزشی
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <span className="font-bold text-foreground">مدرس: </span>
            <span className="text-muted-foreground">{course.teacher}</span>
          </div>
          
          <div>
            <span className="font-bold text-foreground">مدت زمان: </span>
            <span className="text-muted-foreground">{course.duration}</span>
          </div>
          
          <div>
            <span className="font-bold text-foreground">توضیحات: </span>
            <p className="text-foreground mt-2 leading-relaxed">{course.fullDescription}</p>
          </div>
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            بستن
          </Button>
          <Button onClick={scrollToRegistration} className="bg-primary hover:bg-primary-glow">
            ثبت نام
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseModal;
