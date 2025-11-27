import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 min-h-[calc(100vh-64px-40px)] flex items-center justify-center"> {/* min-h-screen minus header/footer height */}
      <img
        src="https://images.unsplash.com/photo-1518770660439-4636190af170?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Developer workspace with code and abstract tech background"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl text-center lg:text-left">
            Crafting Digital Experiences
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300 text-center lg:text-left">
            Welcome to my Full Stack Portfolio, a showcase of robust web applications built with React, Node.js, and modern deployment practices. Explore my projects and delve into insightful blog posts.
          </p>
          <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
            <Link
              to="/projects"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
            >
              View Projects
            </Link>
            <Link to="/blog" className="text-sm font-semibold leading-6 text-white hover:text-indigo-400 transition-all duration-200">
              Read My Blog <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          {/* 这里可以放置一些小卡片或亮点，例如技术栈图标等，为了简洁，暂时省略 */}
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 hidden"> {/* 隐藏一些占位元素 */}
            <div className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-gray-300">Years of Experience</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-white">3+</dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-gray-300">Projects Completed</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-white">20+</dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-gray-300">Client Satisfaction</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-white">100%</dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-gray-300">Coffee Consumed (Liter)</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-white">500+</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Home;