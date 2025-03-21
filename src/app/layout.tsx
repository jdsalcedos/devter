import type { Metadata } from "next";
import "./globals.css";
import {Providers} from "./providers";


export const metadata: Metadata = {
  title: "Clon de Twitter",
  description: "Generado calidosamente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='dark'>
      <body>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  );
}