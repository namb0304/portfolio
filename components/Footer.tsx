const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 text-center">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Your Name. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;