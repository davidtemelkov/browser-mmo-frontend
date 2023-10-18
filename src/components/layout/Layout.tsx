import { FC } from "react";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { Outlet } from "react-router-dom";
import "./layout.css";
import { Sidebar } from "../sidebar";

export const Layout: FC = () => {
  return (
    <div className="holy-grail-grid bg-pixel bg-cover">
      <header className="header">
        <Navbar />
      </header>
      <main className="main-content h-[calc(100vh-110px)] overflow-hidden rounded-md">
        <Outlet />
      </main>
      <section className="left-sidebar">
        <Sidebar />
      </section>
      <aside className="right-sidebar"></aside>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};
