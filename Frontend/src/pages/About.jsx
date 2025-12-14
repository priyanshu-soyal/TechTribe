function About() {


    return (
        <div className="pt-20 min-h-screen bg-white dark:bg-black">
            <div className="max-w-6xl mx-auto px-4 py-10">
                {/* Page Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-black dark:text-white">
                    About TechTribe
                </h1>

                {/* Intro Section */}
                <div className="mt-8 space-y-6 text-lg text-gray-700 dark:text-gray-300">
                    <p>
                        Welcome to <span className="font-semibold">TechTribe</span>, your
                        premier destination for cutting-edge technology insights, tutorials,
                        and industry news.
                    </p>

                    <p>
                        Our platform brings together passionate developers, tech
                        enthusiasts, and industry experts to share knowledge and experiences
                        in the ever-evolving world of technology.
                    </p>
                    <p>
                        Whether you're interested in{" "}
                        <span className="font-semibold">Web Development</span>,{" "}
                        <span className="font-semibold">AI/ML</span>,{" "}
                        <span className="font-semibold">Cloud Computing</span>, or any other
                        tech domain, TechTribe is here to help you stay informed and
                        inspired.
                    </p>
                </div>

                {/* Optional: Mission Section */}
                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                        Our Mission
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                        At TechTribe, we believe in building a community where technology
                        empowers creativity, collaboration, and innovation. Our mission is
                        to make complex topics accessible, inspire curiosity, and help
                        individuals grow in their tech journey.
                    </p>
                </div>
            </div>








        </div>
    );
}
export default About