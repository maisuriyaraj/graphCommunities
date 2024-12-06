import Header from "../../components/header";
import { motion, useScroll } from "framer-motion";
import img2 from '../../assets/group.jpg';
import img3 from '../../assets/community.jpg'
import { useEffect } from "react";
import "aos/dist/aos.css";
import Footer from "../../components/footer";



export default function Home() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
  }, []);
  return (
    
    <main className="min-h-screen">
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <Header />
      <section className={"w-full relative"} id="hero_section">
        <div className="w-full hero-title-div px-16 absolute top-0">
          <div className="title-div  mt-40 text-start">
            <h1 className="hero-logo">Graph  </h1>
            <span className="logo-span"> Community </span>
            <h5 className="slogen">Make your Happy 😊 , Strong Connections  </h5>
          </div>
        </div>
      </section>

      <div className="w-full mt-10 px-16" id="about_section" >
        <div className="text-center">
          <h1 className="hero_heading text-5xl">About Us</h1>
        </div>
        <div className="flex mt-10 flex-wrap section-main mb-4">
          <div className="w-full  lg:w-1/2 px-2 mb-4">
            <div className="h-auto relative">
              <img src={img2} alt="group" className="w-100 section-img" />
              
            </div>
          </div>
          <div className="w-full  lg:w-1/2 px-2 mb-4">
            <div className="text-sm text-grey-dark flex items-center justify-center">
              <div className="bg-white rounded-lg p-5">
                <h1 className="text-3xl text-title mb-4">
                  Welcome to Graph Community!
                </h1>
                <p className="text-gray-700 mb-4">
                  At Graph Community, we believe in the power of community-driven
                  knowledge sharing. Just like Stack Overflow has revolutionized how
                  programmers seek help and share insights, we aim to create a vibrant
                  platform where individuals from all backgrounds and expertise levels can
                  come together to exchange knowledge, solve problems, and foster innovation.
                </p>
                <h2 className="text-2xl text-title mb-4">
                  Why choose Graph Community?
                </h2>
                <ul className="list-disc ml-6 mb-6">
                  <li className="text-gray-700">
                    <span className="font-bold">Community-Driven </span>: <p>Our platform is powered by a passionate community of
                      users who actively contribute their expertise and insights to help others.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold">Quality Content </span>: <p>Say goodbye to sifting through endless forums and
                      outdated documentation. At Graph Community, you&apos;ll find curated
                      content and solutions vetted by experts in the field.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold">Diverse Topics </span>:<p>From programming languages and frameworks to software
                      development methodologies and industry best practices, Graph Community
                      covers a wide range of topics to cater to all interests and skill levels.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold"> Engagement and Recognition </span>: <p> Earn reputation points, badges, and
                      recognition for your contributions to the community. Whether you&apos;re
                      answering questions, sharing tips, or contributing valuable resources,
                      your efforts won&apos;t go unnoticed.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold">Collaboration and Learning </span>: <p>Graph Community is more than just a
                      Q&amp;A platform. It&apos;s a place to collaborate on projects, participate in
                      discussions, and learn from the experiences of others.</p>
                  </li>
                </ul>
                <p className="text-gray-700">
                  Join us at Graph Community and be part of a thriving community of
                  knowledge seekers, problem solvers, and tech enthusiasts. Together, let&apos;s
                  empower each other to learn, grow, and succeed in the ever-evolving world of
                  technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-5 px-16" id="community" >
        <div className="text-center">
          <span className="hero_title_about text-5xl">Community</span>
        </div>
        <div className="flex mt-10 flex-wrap section-main mb-4">
          <div className="w-full  lg:w-1/2 px-2 mb-4">
          <div className="text-sm text-grey-dark flex items-center justify-center">
              <div className="bg-white rounded-lg p-5">
                <h1 className="text-3xl text-title mb-4">
                  Welcome to Graph Community!
                </h1>
                <p className="text-gray-700 mb-4">
                  At Graph Community, we believe in the power of community-driven
                  knowledge sharing. Just like Stack Overflow has revolutionized how
                  programmers seek help and share insights, we aim to create a vibrant
                  platform where individuals from all backgrounds and expertise levels can
                  come together to exchange knowledge, solve problems, and foster innovation.
                </p>
                <h2 className="text-2xl text-title mb-4">
                  Why choose Graph Community?
                </h2>
                <ul className="list-disc ml-6 mb-6">
                  <li className="text-gray-700">
                    <span className="font-bold">Community-Driven </span>: <p>Our platform is powered by a passionate community of
                      users who actively contribute their expertise and insights to help others.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold">Quality Content </span>: <p>Say goodbye to sifting through endless forums and
                      outdated documentation. At Graph Community, you&apos;ll find curated
                      content and solutions vetted by experts in the field.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold">Diverse Topics </span>:<p>From programming languages and frameworks to software
                      development methodologies and industry best practices, Graph Community
                      covers a wide range of topics to cater to all interests and skill levels.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold"> Engagement and Recognition </span>: <p> Earn reputation points, badges, and
                      recognition for your contributions to the community. Whether you&apos;re
                      answering questions, sharing tips, or contributing valuable resources,
                      your efforts won&apos;t go unnoticed.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold">Collaboration and Learning </span>: <p>Graph Community is more than just a
                      Q&amp;A platform. It&apos;s a place to collaborate on projects, participate in
                      discussions, and learn from the experiences of others.</p>
                  </li>
                </ul>
                <p className="text-gray-700">
                  Join us at Graph Community and be part of a thriving community of
                  knowledge seekers, problem solvers, and tech enthusiasts. Together, let&apos;s
                  empower each other to learn, grow, and succeed in the ever-evolving world of
                  technology.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full  lg:w-1/2 px-2 mb-4">
            <div className="h-100 flex justify-center items-center relative">
              <img src={img3} alt="community" className="w-100 section-img" />
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
