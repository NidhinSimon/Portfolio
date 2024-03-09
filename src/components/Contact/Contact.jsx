import React, { useEffect, useRef, useState } from 'react';

import { Button, Input, Textarea } from '@nextui-org/react';
import { easeIn, motion } from 'framer-motion';
import { Power3 } from 'gsap';
import { Toast, transition } from '@chakra-ui/react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';


const Contact = () => {


    useEffect(() => {
        console.log(import.meta.env.VITE_SERVICE_URL, "pspsiss")
    }, [])


  

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                import.meta.env.VITE_SERVICE_URL,
                import.meta.env.VITE_TEMPLATE_KEY,
                form.current,
                import.meta.env.VITE_PUBLIC_KEY
            )
            .then(
                () => {
                    console.log('Email sent successfully');
                    toast.success("Email sent successfully")
                    form.current.reset()
                },
                (error) => {

                    toast.error('Something Went Wrong , Please Try again later')

                }
            );
    };


    return (
        <>
            <div  id='Contact' className='h-screen w-full bg-zinc-900 '>

                <Toaster />
                <motion.div className=' h-full w-full flex p-10  justify-center items-center '>
                    <motion.div className='h-4/6 w-1/2 bg-slate-700 flex flex-col justify-center p-10 text-white rounded-l-2xl'>
                        <motion.div initial={{ opacity: 0, y: 200 }} whileInView={{
                            opacity: 1, y: 0, transition: {
                                duration: 0.5, staggerChildren: 0.1
                            }
                        }} className='text-center'>
                            <motion.h2 className='uppercase text-white text-2xl'>Let's get in touch</motion.h2>

                            <h4 className='uppercase pt-8'>Contact</h4>
                            <p>8105927431</p>

                            <h4 className='uppercase pt-8'>Email</h4>
                            <p>n758899@gmail.com</p>
                        </motion.div>
                    </motion.div>
                    <motion.div className='h-4/6 w-3/6 bg-slate-700 flex justify-center items-center rounded-r-2xl'>
                        <motion.form initial={{ opacity: 0, y: 200 }} whileInView={{
                            opacity: 1, y: 0, transition: {
                                duration: 0.5, staggerChildren: 0.1, ease: easeIn
                            }
                        }} ref={form} onSubmit={sendEmail} action="">

                            <Input
                                type="text"
                                label="Name"
                                name="name"


                                className="max-w-xs "
                            />
                            <Input
                                type="email"
                                label="Email"
                                name="email"


                                className="max-w-xs mt-4"
                            />
                            <Textarea
                                label="Message"
                                placeholder="Enter your Message"
                                className="max-w-xs mt-4"
                                name="message"
                            />



                            <Button color="primary" type="submit" variant="solid" className='mt-10 flex justify-center items-center max-sm:ml-9'>
                                SUBMIT
                            </Button>


                        </motion.form>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
};

export default Contact;
