import { useState } from "react";
import { Menu, X, GraduationCap, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  const navItems = [
    { label: "خانه", href: "#hero" },
    { label: "دوره ها", href: "#courses" },
    { label: "آزمون ها", href: "#exams" },
    { label: "درباره ما", href: "#about" },
    { label: "ثبت نام", href: "#registration" },
    { label: "تماس با ما", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-hero shadow-md backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-primary-foreground">
            <GraduationCap className="w-8 h-8" />
            <span className="text-xl md:text-2xl font-bold">مجتمع فنی آموزشی خوارزمی</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-glow/20 transition-all"
                onClick={() => scrollToSection(item.href)}
              >
                {item.label}
              </Button>
            ))}
            
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="mr-2">
                      پنل مدیریت
                    </Button>
                  </Link>
                )}
                <Link to="/profile">
                  <Button variant="default" size="sm">
                    <User className="w-4 h-4 ml-2" />
                    پروفایل
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm">
                  ورود / ثبت نام
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 animate-fade-in">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full text-primary-foreground hover:bg-primary-glow/20 justify-end"
                onClick={() => scrollToSection(item.href)}
              >
                {item.label}
              </Button>
            ))}
            
            <div className="pt-4 border-t border-primary-glow/20 space-y-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm" className="w-full">
                        پنل مدیریت
                      </Button>
                    </Link>
                  )}
                  <Link to="/profile">
                    <Button variant="default" size="sm" className="w-full">
                      <User className="w-4 h-4 ml-2" />
                      پروفایل
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/auth">
                  <Button variant="default" size="sm" className="w-full">
                    ورود / ثبت نام
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
