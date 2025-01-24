import React from 'react';
import Header from './header';
import Content from './content';
import Footer from './footer';

const Home = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="pt-8 px-4 mx-auto max-w-screen-xl lg:pt-16 lg:px-6 mb-0">
        <Header />
        <Content />
        <Footer />
      </div>
    </section>
  );
};

export default Home;
