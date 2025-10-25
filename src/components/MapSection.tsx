import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapSection = () => {
  return (
    <section id="map" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          موقعیت مکانی آموزشگاه
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="rounded-lg overflow-hidden shadow-lg h-[500px]">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=50.18394041061402%2C36.22068770943555%2C50.187839508056645%2C36.22266624789615&amp;layer=mapnik&amp;marker=36.221677,50.185890"
              className="w-full h-full border-0"
              loading="lazy"
              title="نقشه موقعیت آموزشگاه خوارزمی"
            />
          </div>
          
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-primary mb-4 pb-4 border-b-2 border-accent">
                درباره آموزشگاه
              </h3>
              <p className="text-foreground leading-relaxed">
                مجتمع آموزشی خوارزمی با ۱۹ سال سابقه درخشان در زمینه آموزش‌های تخصصی، مفتخر است که با بهره‌گیری از اساتید مجرب، بهترین خدمات آموزشی را ارائه نماید. ما با تکیه بر دانش و تجربه فراوان، محیطی پویا و آموزشی برای رشد و پیشرفت دانشجویان فراهم کرده‌ایم.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-bold text-foreground mb-1">آدرس</h5>
                  <p className="text-muted-foreground">زیباشهر، بلوار مطهری، منطقه ۲، نبش یاس ۶</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-bold text-foreground mb-1">تلفن</h5>
                  <p className="text-muted-foreground">09387405653 - 02832562070</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-bold text-foreground mb-1">ایمیل</h5>
                  <p className="text-muted-foreground">miladsajedi.edu@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-bold text-foreground mb-1">ساعات کاری</h5>
                  <p className="text-muted-foreground">
                    شنبه تا چهارشنبه: ۹:۳۰ صبح تا ۹ شب<br />
                    پنجشنبه: ۹:۳۰ صبح تا ۸ شب
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary-glow shadow-md"
          >
            <a
              href="https://www.openstreetmap.org/?mlat=36.221677&amp;mlon=50.185890#map=19/36.221677/50.185890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              مشاهده نقشه بزرگتر
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
