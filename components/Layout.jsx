import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
          <title>CRM - Administración</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
        />
      </Head>
      <h1>Layout...</h1>
      {children}
    </>
  );
};

export default Layout;
