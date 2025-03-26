import { Header, Footer } from "@/components";

function dasboardLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default dasboardLayout;
