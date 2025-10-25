import { CheckCircle, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExamCardProps {
  title: string;
  description: string;
  features: string[];
  examUrl: string;
}

const ExamCard = ({ title, description, features, examUrl }: ExamCardProps) => {
  return (
    <article className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
      <div className="bg-gradient-hero text-primary-foreground p-6 text-center">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p>{description}</p>
      </div>
      
      <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
        <div>
          <p className="text-foreground mb-6 leading-relaxed">
            با شرکت در این آزمون آنلاین، سطح دانش و آمادگی خود را محک بزنید. این آزمون شامل سوالات استاندارد و مطابق با سرفصل‌های آموزشی می‌باشد.
          </p>
          
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-foreground p-2 rounded hover:bg-muted/50 transition-colors">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Button
          asChild
          className="w-full bg-primary hover:bg-primary-glow transition-all shadow-md group"
        >
          <a href={examUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            شروع آزمون
          </a>
        </Button>
      </div>
    </article>
  );
};

export default ExamCard;
