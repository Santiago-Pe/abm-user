import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "./globals.css";
import { PrimeReactProvider } from "primereact/api";
import React from "react";
import { Menubar } from "primereact/menubar";
import Sidebar from "./server/components/sidebar/sidebar";
import Navbar from "./server/components/navbar/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
    },
  ];
  const customIcons = (
    <React.Fragment>
      <button className="p-sidebar-icon p-link mr-2">
        <span className="pi pi-search" />
      </button>
    </React.Fragment>
  );
  return (
    <html lang="en">
      <PrimeReactProvider>
        <body>
          <header>
            <Navbar />
          </header>
          <section className="layoutContainer">
            <Sidebar />
            <div className="layoutContent">{children}</div>
          </section>
        </body>
      </PrimeReactProvider>
    </html>
  );
}
