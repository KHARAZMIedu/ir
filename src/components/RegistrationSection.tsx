import { AlertCircle, Banknote, CreditCard } from "lucide-react";

const RegistrationSection = () => {
  return (
    <section id="registration" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          شرایط ثبت نام
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-accent/10 border-r-4 border-accent rounded-lg p-8 mb-8 shadow-md">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <AlertCircle className="w-7 h-7 text-accent" />
              توجه
            </h3>
            <div className="space-y-4 text-foreground text-lg">
              <p className="font-semibold">
                برای ثبت نام در دوره‌ها حتما باید به آموزشگاه مراجعه نمایید.
              </p>
              <p className="font-semibold">
                امکان ثبت نام به دو صورت نقدی و قسطی وجود دارد.
              </p>
              <p className="font-semibold">
                آدرس: زیباشهر، بلوار مطهری، منطقه ۲، نبش یاس ۶
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
                <Banknote className="w-10 h-10 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">پرداخت نقدی</h3>
              <p className="text-success text-xl font-bold">45% تخفیف برای پرداخت نقدی</p>
            </div>
            
            <div className="bg-card rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">پرداخت اقساطی</h3>
              <p className="text-primary text-xl font-bold">پرداخت در ۲ تا ۶ قسط</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
