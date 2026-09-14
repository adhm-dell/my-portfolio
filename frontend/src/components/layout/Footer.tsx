export function Footer() {
  return (
    <footer className="border-t border-slate-300 dark:border-dark-border mt-32 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-sky-500 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-slate-100 dark:bg-dark-bg rounded-[6px] flex items-center justify-center">
              <span className="font-mono font-bold text-sm text-brand-600 dark:text-brand-400">AS</span>
            </div>
          </div>
          <span className="font-semibold text-slate-800 dark:text-white">Adham Salah</span>
        </div>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
          © {new Date().getFullYear()} All rights reserved. Built with NestJS, React, and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
