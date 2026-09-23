const Footer = () => {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <p className="font-mono text-[11px] tracking-wide text-ink-3">
          &copy; {new Date().getFullYear()} 南保 俊輔
        </p>
      </div>
    </footer>
  );
};

export default Footer;
