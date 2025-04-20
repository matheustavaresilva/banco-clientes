const Header = () => {
  return (
    <header className="bg-[#003366] text-white p-4 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Banco Banestes</h1>
        <nav>
          <a href="/" className="ml-4 hover:underline">Início</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
