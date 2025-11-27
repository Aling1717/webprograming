import React from 'react'; // <--- 确保这行存在

function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Welcome to My Portfolio
      </h1>
      <h2 className="text-2xl font-semibold text-indigo-600 mb-8">
        Full Stack Developer
      </h2>

      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <p>
          This site is the result of a Capstone project, demonstrating expertise in building scalable, component-based applications with React and integrating them with a Node.js/Express API.
        </p>
        <p>
          The application includes full JWT authentication, protected routing, and client-side CRUD management for all content.
        </p>
      </section>
    </div>
  );
}
export default Home;