import { useState } from "react";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import AnnouncementBox from "@/components/AnnouncementBox";
import CourseCard from "@/components/CourseCard";
import CourseModal from "@/components/CourseModal";
import TeacherCard from "@/components/TeacherCard";
import ExamCard from "@/components/ExamCard";
import RegistrationSection from "@/components/RegistrationSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import { Code2, Monitor, Calculator, GraduationCap } from "lucide-react";

interface Course {
  title: string;
  teacher: string;
  description: string;
  duration: string;
  price: string;
  icon: typeof Code2;
  fullDescription: string;
}

const Index = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const courses: Course[] = [
    {
      title: "Python",
      teacher: "آقای مهندس اخباری",
      description: "یادگیری برنامه نویسی Python از پایه تا پیشرفته",
      duration: "۳ ماه",
      price: "۱,۲۰۰,۰۰۰ تومان",
      icon: Code2,
      fullDescription:
        "در این دوره شما برنامه نویسی Python را از پایه تا پیشرفته یاد خواهید گرفت. این دوره شامل مباحث مقدماتی، شیء گرایی، کار با پایگاه داده و ساخت پروژه عملی می‌باشد.",
    },
    {
      title: "ICDL",
      teacher: "خانم مهندس قاسمی و آقای مهندس ایوبی",
      description: "آموزش کامل مهارت های هفتگانه کامپیوتر",
      duration: "۳ ماه",
      price: "۸۰۰,۰۰۰ تومان",
      icon: Monitor,
      fullDescription:
        "دوره ICDL شامل آموزش هفت مهارت اصلی کامپیوتر شامل: مفاهیم پایه فناوری اطلاعات، استفاده از کامپیوتر و مدیریت فایل‌ها، واژه پردازی، صفحه گسترده، پایگاه داده، ارائه مطلب و اطلاعات و ارتباطات می‌باشد.",
    },
    {
      title: "حسابداری",
      teacher: "آقای مهندس مهرگان فرد",
      description: "آموزش اصول حسابداری و نرم افزارهای مالی",
      duration: "۳ ماه",
      price: "۱,۵۰۰,۰۰۰ تومان",
      icon: Calculator,
      fullDescription:
        "در این دوره اصول حسابداری مقدماتی و پیشرفته، نرم افزارهای مالی، تهیه گزارشات مالی، حقوق و دستمزد و سایر مباحث مرتبط با حسابداری آموزش داده می‌شود. این دوره برای افرادی که قصد ورود به بازار کار حسابداری را دارند بسیار مناسب است.",
    },
    {
      title: "دیپلم",
      teacher: "آقای مهندس محمدبیگی",
      description: "اخذ دیپلم رسمی آموزش و پرورش",
      duration: "۶ ماه",
      price: "۲,۰۰۰,۰۰۰ تومان",
      icon: GraduationCap,
      fullDescription:
        "این دوره برای افرادی طراحی شده که قصد اخذ دیپلم رسمی آموزش و پرورش را دارند. در این دوره تمامی دروس لازم تدریس شده و در پایان، مدرک معتبر اعطا می‌گردد.",
    },
  ];

  const teachers = [
    { name: "آقای مهندس ایوبی", subject: "مدرس ICDL" },
    { name: "آقای مهندس اخباری", subject: "مدرس Python" },
    { name: "خانم مهندس قاسمی", subject: "مدرس ICDL" },
    { name: "آقای مهندس مهرگان فرد", subject: "مدرس حسابداری" },
    { name: "آقای محمدبیگی", subject: "مدرس دیپلم" },
  ];

  const exams = [
    {
      title: "آزمون تستی دیپلم",
      description: "سنجش سطح دانش و آمادگی برای دریافت دیپلم",
      features: [
        "شامل ۱۰ سوال تستی استاندارد",
        "زمان آزمون: ۵ دقیقه",
        "دریافت نتایج بلافاصله پس از آزمون",
        "پوشش تمامی مهارت‌های دیپلم",
      ],
      examUrl: "https://kharazmiedu.github.io/qizDiplom/",
    },
    {
      title: "آزمون ICDL",
      description: "آزمون مهارت‌های هفتگانه کامپیوتر",
      features: [
        "شامل ۳۰ سوال تستی استاندارد",
        "زمان آزمون: ۴۵ دقیقه",
        "دریافت نتایج بلافاصله پس از آزمون",
        "پوشش تمامی مهارت‌های هفتگانه ICDL",
      ],
      examUrl: "https://kharazmiedu.github.io/qizICDL/",
    },
  ];

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main>
        <HeroSlider />
        <AnnouncementBox />
        
        {/* Courses Section */}
        <section id="courses" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground relative pb-4">
              دوره های آموزشی
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent rounded-full" />
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {courses.slice(0, 2).map((course) => (
                <CourseCard
                  key={course.title}
                  {...course}
                  onShowDetails={() => handleCourseClick(course)}
                />
              ))}
              
              <div className="bg-card rounded-lg shadow-md overflow-hidden relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <img
                  src="https://raw.githubusercontent.com/KHARAZMIedu/.ir/main/IMG-20250914-WA0000.webp"
                  alt="بنر تبلیغاتی مجتمع فنی آموزشی خوارزمی"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-2xl font-bold text-white mb-3">فرصت های ویژه</h3>
                  <p className="text-white/90 mb-6 text-center">ثبت نام در دوره های جدید با تخفیف ویژه</p>
                  <button
                    onClick={() => document.querySelector("#registration")?.scrollIntoView({ behavior: "smooth" })}
                    className="bg-white text-primary px-6 py-3 rounded-full font-bold hover:bg-accent hover:text-accent-foreground transition-all shadow-md"
                  >
                    همین حالا ثبت نام کنید
                  </button>
                </div>
              </div>
              
              {courses.slice(2).map((course) => (
                <CourseCard
                  key={course.title}
                  {...course}
                  onShowDetails={() => handleCourseClick(course)}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Teachers Section */}
        <section id="about" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground relative pb-4">
              اساتید برجسته
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent rounded-full" />
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {teachers.map((teacher) => (
                <TeacherCard key={teacher.name} {...teacher} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Exams Section */}
        <section id="exams" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground relative pb-4">
              آزمون‌های آنلاین
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent rounded-full" />
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {exams.map((exam) => (
                <ExamCard key={exam.title} {...exam} />
              ))}
            </div>
          </div>
        </section>
        
        <RegistrationSection />
        <MapSection />
      </main>
      
      <Footer />
      
      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse}
      />
    </div>
  );
};

export default Index;
