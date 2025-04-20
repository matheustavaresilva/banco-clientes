const Footer = () => {
  return (
    <footer className="bg-[#003366] text-white p-4 mt-8 shadow-inner">
      <div className="max-w-7xl mx-auto text-center">
        &copy; {new Date().getFullYear()} Banco Banestes. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
