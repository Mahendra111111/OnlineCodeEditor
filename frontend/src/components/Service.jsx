import React from "react";

const Service = () => {
  const obj = [
    {
      title: " 5-Language Support",
      desc: "Modern code editors like VS Code, Sublime Text, and JetBrains IDEs support multiple programming languages, including JavaScript, Python, Java, C++, and more, with syntax highlighting and debugging features.",
    },

    {
      title: "Integrated Development Features",
      desc: "Popular editors provide built-in features like intelligent code completion, debugging tools, Git integration, and terminal access, enhancing the development workflow.",
    },

    {
      title: "Extensions and Customization",
      desc: "Editors support various extensions and plugins for additional functionality, such as themes, language support, and automation tools, allowing developers to customize their workspace.",
    },
  ];

  return (
    <section className='p-20 bg-gray-900 text-white text-center' id="services">
      <h3 className='text-4xl font-bold'>Our Services</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 max-w-6xl mx-auto'>
        {obj.map((item, index) => {
          return (
            <div key={index} className='p-8 bg-gray-800 rounded-xl shadow-lg'>
              <h4 className='text-2xl font-semibold'>{item.title}</h4>
              <p className='mt-4 opacity-80'>{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Service;
