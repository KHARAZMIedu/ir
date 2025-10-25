import { ChevronLeft, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const quickLinks = [
    { label: "دوره های آموزشی", href: "#courses" },
    { label: "آزمون ها", href: "#exams" },
    { label: "درباره ما", href: "#about" },
    { label: "ثبت نام", href: "#registration" },
    { label: "تماس با ما", href: "#contact" },
    { label: "موقعیت مکانی", href: "#map" },
  ];

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-6 pb-3 border-b-2 border-accent">
              درباره مجتمع خوارزمی
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              مجتمع آموزشی خوارزمی با ۱۹ سال سابقه درخشان در زمینه آموزش‌های تخصصی، مفتخر است که با بهره‌گیری از اساتید مجرب، بهترین خدمات آموزشی را ارائه نماید.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 pb-3 border-b-2 border-accent">
              لینک های سریع
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-1 transition-all group"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 pb-3 border-b-2 border-accent">
              تماس با ما
            </h3>
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <p>زیباشهر، بلوار مطهری، منطقه ۲، نبش یاس ۶</p>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <p>09387405653 - 02832562070</p>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <p>miladsajedi.edu@gmail.com</p>
              </div>
            </address>
          </div>
        </div>
      </div>
      
      <div className="bg-black/20 py-6">
        <div className="container mx-auto px-4 text-center text-primary-foreground/80">
          <p>کلیه حقوق مادی و معنوی این سایت متعلق به مجتمع آموزشی خوارزمی می‌باشد.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
