
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Product Validator AI</h3>
            <p className="text-gray-300 mb-4">
              Descubra o potencial real do seu produto antes de investir.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-highlight">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/plans" className="text-gray-300 hover:text-highlight">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-highlight">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <span className="font-medium">Email:</span> contato@productvalidator.ai
              </li>
              <li className="text-gray-300">
                <span className="font-medium">Suporte:</span> suporte@productvalidator.ai
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Product Validator AI. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
