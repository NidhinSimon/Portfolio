import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'


const Marquee = () => {

    const [angle, setangle] = useState(0)
    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            let mousex = e.clientX
            let mousey = e.clientY
            let deltaX = mousex - window.innerWidth / 2
            let deltaY = mousey - window.innerHeight / 2
            var angles = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
            console.log(angle, "dh")
            setangle(angles - 180)
        })
    }, [])
    return (
        <div className='h-screen w-full bg-black overflow-hidden  max-sm:hidden '>
            {/* <div className='relative h-full flex items-center justify-center'>
                <img className='h-full w-full absolute bg-cover bg-center' src="./stars.png" alt="" />

                <div className='w-96  h-96 bg-transparent rounded-xl relative'>
                    <div  className='bg-red-900  rounded-full h-40  w-40  relative  border border-red-800'>
                      <div className='h-10 w-full bg-blue-500 relative'>
                      <div  className='h-10 w-10 bg-yellow-300  rounded-full  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '></div>
                      </div>
                    </div>
                    <div className='bg-red-900 rounded-full h-40 w-40  relative  border border-red-800'>
                        <div className='h-10 w-10 bg-yellow-300 rounded-full  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '></div>
                    </div>
                </div>
            </div> */}


            <div data-scroll data-scroll-speed='-.9' className='w-full relative h-full bg-cover bg-center bg-zinc-9000. bg-orange-300'>
                <div className='absolute lg:text-9xl  sm:text-2xl md:text-6xl max-sm:text-4xl   text-white flex  mt-40 justify-center h-full w-full'>
                    <h1>READY TO  <br />  <p className='mt-40'> HIRE ME ?</p> </h1>
                </div>
                <div className='absolute flex    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className=' flex items-center justify-center w-[15vw]  bg-white  h-[15vw] rounded-full'>
                        <motion.div whileInView={{ x: 10, y: 10 }} className='bg-black h-2/3 w-2/3 rounded-full relative  '>

                            <div style={{ transform: `translate(-50%,-50%) rotate(${angle}deg)` }} className='line h-10  w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                <div className='h-5 w-5 bg-white rounded-full'>

                                </div>
                            </div>

                        </motion.div>
                    </div>
                    <div className='flex items-center justify-center w-[15vw]  h-[15vw] rounded-full bg-white'>
                        <motion.div whileInView={{ x: -15, y: 10 }} className='bg-black h-2/3 w-2/3 rounded-full relative  '>

                            <div style={{ transform: `translate(-50%,-50%) rotate(${angle}deg)` }} className='line h-10  w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                <div className='h-5 w-5 bg-white rounded-full'>

                                </div>
                            </div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Marquee
