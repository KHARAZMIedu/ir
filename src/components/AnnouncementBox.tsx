import { Info, Clock, Zap } from "lucide-react";

const AnnouncementBox = () => {
  const currentDate = new Date().toLocaleDateString('fa-IR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 -mt-16 relative z-10">
      <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 border-r-4 border-primary">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b-2 border-dashed border-primary/30">
          <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
            <Info className="w-7 h-7" />
            اطلاعیه‌های مهم
          </h3>
          <span className="text-muted-foreground">{currentDate}</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg transition-all hover:shadow-md">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                اطلاعیه
              </span>
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <p className="text-foreground">
              کلاس Python فردا ساعت ۱۶:۰۰ به علت نبود برق تعطیل است
            </p>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-warning/10 rounded-lg border-r-3 border-warning transition-all hover:shadow-md">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="bg-warning text-warning-foreground px-3 py-1 rounded-full text-sm font-bold">
                هشدار
              </span>
              <Zap className="w-5 h-5 text-warning" />
            </div>
            <p className="text-foreground">
              امتحان میان ترم ICDL هفته آینده برگزار می‌شود
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBox;
