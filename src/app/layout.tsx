import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./globals.css";
import { PrimeReactProvider } from "primereact/api";
import Loading from "./loading";
import React, { Suspense } from "react";
import { Menubar } from "primereact/menubar";

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
          <Menubar model={items} />
          <section>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </section>
        </body>
      </PrimeReactProvider>
    </html>
  );
}
