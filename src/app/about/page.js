'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiWordpress } from 'react-icons/si';

const AboutPage = () => {
    const skills = [
        { name: 'Next.js', icon: SiNextdotjs, level: 'Advanced' },
        { name: 'TypeScript', icon: SiTypescript, level: 'Advanced' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 'Expert' },
        { name: 'WordPress', icon: SiWordpress, level: 'Expert' },
    ];

    const experiences = [
        {
            title: 'Web Developer',
            company: 'Freelance',
            period: '2020 - Present',
            description: 'Building modern web applications and websites for clients worldwide.'
        },
        {
            title: 'WordPress Developer',
            company: 'Various Clients',
            period: '2018 - Present',
            description: 'Creating custom WordPress themes and plugins for diverse projects.'
        }
    ];

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        About Me
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        I'm a passionate web developer specializing in Next.js and WordPress development,
                        creating modern and efficient web solutions.
                    </p>
                </motion.div>

                {/* Profile Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-96 md:h-[500px]"
                    >
                        <Image
                            src="/profile.jpg"
                            alt="Profile"
                            fill
                            className="object-cover rounded-lg shadow-xl"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col justify-center"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            My Journey
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            With over 5 years of experience in web development, I've worked on numerous
                            projects ranging from small business websites to complex web applications.
                            My expertise lies in creating responsive, user-friendly interfaces that
                            deliver exceptional user experiences.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            I'm passionate about staying up-to-date with the latest technologies and
                            best practices in web development. My goal is to create efficient,
                            scalable, and maintainable solutions that help businesses grow.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <FaGithub size={24} />
                            </a>
                            <a
                                href="https://linkedin.com/in/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <FaLinkedin size={24} />
                            </a>
                            <a
                                href="mailto:your.email@example.com"
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <FaEnvelope size={24} />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Skills Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        My Skills
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {skills.map((skill, index) => {
                            const Icon = skill.icon;
                            return (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex items-center mb-4">
                                        <Icon className="text-3xl text-gray-900 dark:text-white mr-3" />
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {skill.name}
                                        </h3>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                        <div
                                            className="bg-blue-600 h-2.5 rounded-full"
                                            style={{ width: `${skill.level === 'Expert' ? '100%' : '80%'}` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        {skill.level}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Experience Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Experience
                    </h2>
                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {exp.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {exp.company} • {exp.period}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    {exp.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Let's Work Together
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Have a project in mind? Let's discuss how we can bring your ideas to life.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-6 py-3 bg-black text-white hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
                    >
                        Get in Touch
                    </a>
                </motion.div>
            </div>
        </main>
    );
};

export default AboutPage;
