import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const MiniPRojects = () => {
    const isLargeScreen = useMediaQuery({ minWidth: 768 });
  const items = [
    {
      id: 1,
      title: 'UI CLONE WITH ANIMATIONS',
      img: './SidGolf.png',
      desc:
        'This is an innovative web application that seamlessly combines the power of GSAP, Locomotive Scroll, React.js, and Tailwind CSS to deliver an immersive user experience. Leveraging GSAP, the project boasts captivating animations that enhance visual appeal, while Locomotive Scroll ensures a smooth and engaging scrolling experience with features like transitions effects. The modular and scalable user interface, developed using React.js, promotes efficient code organization. Tailwind CSS simplifies styling, enabling responsive and visually appealing designs',
    },
    {
      id: 2,
      title: 'TASK MANAGER',
      img: './Task.png',
      desc:
        'Effortlessly manage tasks with our MERN stack-powered app featuring Redux Toolkit for seamless state management. Users can securely log in, create, edit, and categorize tasks, benefit from real-time updates, and stay organized on-the-go with the mobile-friendly design. The app ensures a secure and efficient task management experience.',
    },

    {
      id: 3,
      title: 'EXPENSE TRACKER  ',
      img: './Expense.png',
      desc:
        'Effortlessly track your expenses with our sleek Expense Tracker app, powered by React and adorned with Material-UI for a polished and intuitive user interface. Tailwind CSS ensures a responsive and stylish design, allowing users to seamlessly add, edit, and categorize expenses without the need for user authentication. Experience modern and efficient expense tracking with the perfect blend of Material-UI and Tailwind CSS.',
    },
  ];

  const Single = ({ item }) => {
    const sectionref = useRef(null);

    const { scrollYProgress } = useScroll({
      target: sectionref,
      offset: ['start start', 'end end'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [-300, 150]);
    return (
        <section className='h-[90vh] w-full bg-zinc-900 border-t-2 border-transparent'>
        <div className='container mx-auto sm:px-4 md:px-8 lg:px-12 xl:px-16 flex justify-center items-center overflow-hidden mt-10 sm:mt-20 p-4 sm:p-6 md:p-8 lg:p-10'>
          <div
            ref={sectionref}
            className='wrapper h-full m-auto flex flex-col sm:flex-row items-center justify-center'>
            <div className='sm:w-1/3 lg:w-2/5 border bg-fuchsia-200 rounded-2xl flex items-center justify-center'>
              <img
                className='p-2 w-full h-full object-cover'
                src={item.img}
                alt='dggdud'
              />
            </div>

            {isLargeScreen ? (
              <motion.div
                style={{ y }}
                animate={{ delay: 0.5 }}
                className='text flex-1 gap-8 flex-col pl-4 sm:pl-10 mt-4 sm:mt-0'>
                <h2 className='text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl'>
                  {item.title}
                </h2>
                <p className='text-white mt-4 sm:mt-10 leading-none text-sm sm:text-base lg:text-lg xl:text-xl'>
                  {item.desc}
                </p>
              </motion.div>
            ) : (
              <div className='text flex-1 gap-8 flex-col pl-4 mt-4 sm:mt-0'>
                <h2 className='text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl'>
                  {item.title}
                </h2>
                <p className='text-white mt-4 leading-none text-sm sm:text-base lg:text-lg xl:text-xl'>
                  {item.desc}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
  });

  const scale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div ref={ref} className='relative'>
      <div className='progress sticky top-10 left-0 pt-4 sm:pt-6 lg:pt-8 text-center bg-zinc-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
        <h1 className='text-white'>MINI PROJECTS</h1>
        <motion.div
          style={{ scaleX: scale }}
          className='progress-bar h-2 sm:h-3 lg:h-4 bg-white rounded-full'></motion.div>
      </div>
      {items.map((i) => (
        <Single item={i} key={i.id} />
      ))}
    </div>
  );
};

export default MiniPRojects;
