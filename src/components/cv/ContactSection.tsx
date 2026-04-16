import React, { FormEvent, useEffect, useState } from "react"
import { FaEnvelope } from "react-icons/fa"
import { FaGithub, FaLinkedin } from "react-icons/fa6"
import { ContactFormRequest } from "../../../types/contactForm"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsX } from "react-icons/bs";


export const ContactSection: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [isOk, setIsOk] = useState<boolean>(false);

    const [stateForm, setStateForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const onChangeStateForm = (key: string, value: any) => {
        setStateForm((prev) => ({ ...prev, [key]: value }))
    }

    const createContactForm = async (data: ContactFormRequest) => {
        const result = await fetch('/api/contact-form', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!result.ok) throw new Error('create contact form failed.');
        return await result.json();
    }

    const onSubmited = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(ev.target as HTMLFormElement);
            const data = Object.fromEntries(formData.entries());
            await createContactForm(data as any);

        } catch (err: any) {
            setLoading(false);
            console.log(err);
            setError(err.message);

        } finally {
            setLoading(false);
            setIsOk(true)
        }
    }

    useEffect(() => {

        if (isOk || error != null) {
            setTimeout(() => {
                setIsOk(false);
                setError(null);
                setStateForm({
                    name: "",
                    email: "",
                    message: ""
                })
            }, 5000);
        }
    }, [isOk, error]);

    const AlertSuccess: React.FC = () => {
        return (
            <div className="max-w-4xl mx-auto px-3 mb-7 w-full rounded-lg min-h-24 bg-green-500/20 shadow-md border-l-4 border-green-500">
                {/* head alaert */}
                <div className="flex justify-between items-center w-full border-b border-b-green-500/20 px-4 py-2">
                    <h1 className="text-xl text-green-500">Success</h1>
                    <button className="cursor-pointer">
                        <BsX className="text-2xl text-gray-400" />
                    </button>
                </div>

                {/* body alert */}
                <div className="px-4 pb-4 pt-2 text-green-500">
                    🚀 Your message was sent successfully! Thank you!
                </div>
            </div>
        );
    }

    const AlertDanger: React.FC = () => (
        <div className="max-w-4xl mx-auto px-3 mb-7 w-full rounded-lg min-h-24 bg-red-500/20 shadow-md border-l-4 border-red-500">
            {/* head alaert */}
            <div className="flex justify-between items-center w-full border-b border-b-red-500/20 px-4 py-2">
                <h1 className="text-xl text-red-500">Success</h1>
                <button className="cursor-pointer">
                    <BsX className="text-2xl text-gray-400" />
                </button>
            </div>

            {/* body alert */}
            <div className="px-4 pb-4 pt-2 text-red-500">
                {error}
            </div>
        </div>
    )

    return (
        <section id="contact" className="py-20 px-6 bg-gray-50 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Get In <span className="text-blue-500">Touch</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        {"Let's discuss your next project or just say hello"}
                    </p>
                </div>
                {
                    isOk && <AlertSuccess />
                }
                {
                    error && <AlertDanger />
                }

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                                <FaEnvelope className="text-blue-500 dark:text-gray-50 text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email</h3>
                                <p className="text-gray-600 dark:text-gray-300">aldo.ratmawan@email.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                                <FaLinkedin className="text-blue-500 text-2xl dark:text-gray-50" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">LinkedIn</h3>
                                <a href="#" className="text-blue-500 hover:underline">linkedin.com/in/aldo-ratmawan</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                                <FaGithub className="text-blue-500 text-2xl dark:text-gray-50" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">GitHub</h3>
                                <a href="https://github.com/AldoDeveloper" className="text-blue-500 hover:underline">github.com/AldoDeveloper</a>
                            </div>
                        </div>
                    </div>
                    <form className="space-y-6" onSubmit={onSubmited}>
                        <div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                name="name"
                                required
                                min={4}
                                max={16}
                                value={stateForm.name}
                                onChange={(e) => onChangeStateForm('name', e.target.value)}
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                required
                                placeholder="Your Email"
                                name="email"
                                value={stateForm.email}
                                onChange={(e) => onChangeStateForm('email', e.target.value)}
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Your Message"
                                rows={5}
                                required
                                name="message"
                                value={stateForm.message}
                                onChange={(e) => onChangeStateForm('message', e.target.value)}
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition-all hover:scale-105">
                            {
                                loading && (
                                    <>
                                        <AiOutlineLoading3Quarters className="animate-spin dark:fill-gray-400 font-bold text-2xl" />
                                        Loading
                                    </>
                                )
                            }
                            {
                                !loading && <>Send Message</>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}