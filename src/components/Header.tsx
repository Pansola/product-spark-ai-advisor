
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-transparent backdrop-blur-none sticky top-0 z-10" style={{ backgroundColor: 'transparent !important' }}>
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-primary rounded-lg p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="m7.9 20 6.2-16h2l-6.2 16Z"></path>
              <path d="M4 14h8"></path>
              <path d="M15 4h5l-5 16h5"></path>
            </svg>
          </span>
          <span className="text-xl font-bold text-white">Product Validator AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white/80 hover:text-white font-medium">Home</Link>
          <Link to="/plans" className="text-white/80 hover:text-white font-medium">Planos</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:flex text-white/80 hover:text-white hover:bg-white/10">
            Login
          </Button>
          <Button className="bg-transparent text-white border border-white/30 hover:bg-white/10">
            Registrar
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
