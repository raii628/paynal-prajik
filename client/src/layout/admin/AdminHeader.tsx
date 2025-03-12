
const AdminHeader = () => {
  return (
    <header className="sticky top-0 left-0 h-18 w-full bg-white flex items-center justify-between px-5 shadow-sm  z-10">
      <div className="flex items-center bg-gradient-to-r from-[#7300FF] to-[#08D3FC] bg-clip-text text-transparent cursor-pointer">
        <i className="fa-solid fa-moon text-5xl mr-2"></i>
        <h1 className="text-3xl">Azurea Hotel Management System</h1>
      </div>
    </header>
  );
};

export default AdminHeader;
