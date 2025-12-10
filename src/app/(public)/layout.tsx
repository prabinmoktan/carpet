
import LayoutWrapper from "./layoutWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
