import "./globals.css";

export const metadata = {
  title: "Scroll Hero Animation",
  description: "GSAP Scroll Animation Assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}