import { SiteConfig } from "../types";

export const siteConfig: SiteConfig = {
    // ── Personal Info ─────────────────────────────────────
    name: "Manthan Mittal",
    tagline: "AI Engineer . Software Engineering",
    location: "Ahmedabad, India",
    phone: "+91 8200681650",
    email: "manthanmittal93@gmail.com",
    resumeUrl: "/Manthan_resume.pdf",

    // ── Social Links ─────────────────────────────────────
    socials: [
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/manthanmittal",
            icon: "linkedin",
        },
        {
            name: "GitHub",
            url: "https://github.com/manthanmittal",
            icon: "github",
        },
        {
            name: "Twitter",
            url: "https://twitter.com/manthanmittal",
            icon: "twitter",
        },
    ],

    // ── About ────────────────────────────────────────────
    about: [
        "I exist at the intersection of scalable engineering and bleeding-edge AI. As a Full-Stack AI Engineer, I don't just train models—I build autonomous systems that solve hard problems. My technical philosophy is grounded in the belief that true innovation happens only when robust software engineering practices are fused with advanced artificial intelligence.",
        "My background is rigorous and diverse, spanning from optimizing mobile architectures for speed to researching complex Deep Learning systems during my M.Sc. in the UK. This academic focus culminated in my thesis on 'Random MAC Optimization,' where I investigated novel strategies to push the boundaries of algorithmic efficiency and model convergence in resource-constrained environments.",
        "Beyond theory, my work is backed by data and community impact. I have developed open-source tools used by thousands of developers and architected production-grade RAG pipelines. Whether it involves deploying large-scale web agents or optimizing neural networks for robotics, I am dedicated to building software that thinks."
    ],

    // ── Education ───────────────────────────────────────
    education: [
        {
            degree: "M.Sc. in Artificial Intelligence",
            institution: "University of Essex | Colchester, United Kingdom",
            year: "2022 – 2024",
            details: [
                "Specializations: Deep Learning, Robotics, Computer Vision, Natural Language Processing (NLP), and Machine Learning.",
                "Master's Thesis: 'Random MAC Optimization' – Investigated optimization algorithms to enhance model convergence and efficiency.",
            ],
        },
        {
            degree: "B.E. in Information Technology",
            institution: "Ahmedabad Institute of Technology",
            year: "2018 – 2022",
            details: [
                "Graduated with First Class Honors.",
                "President of the Coding Club – organized hackathons and workshops.",
            ],
        },
    ],

    // ── Experience (Timeline) ───────────────────────────
    experience: [
        {
            role: "AI & Data Analytics Intern",
            company: "KM Steel",
            period: "Dec 2024 – Present",
            location: "Remote (UK–India)",
            points: [
                "Conducted data analysis and applied machine learning techniques to support business decision-making and process optimisation for an India-based client while working remotely from the UK.",
                "Built and evaluated predictive models using Python, scikit-learn, Pandas, and NumPy for forecasting and performance insights.",
                "Cleaned and transformed large datasets, improving data quality and model accuracy.",
                "Created dashboards and visual reports for management using business intelligence tools.",
                "Collaborated with engineering and operations teams to deploy AI-driven, data-informed solutions across business functions.",
            ],
        },
        {
            role: "AI Research Intern",
            company: "DeepVision Labs",
            period: "Jun 2024 – Nov 2024",
            location: "United Kingdom (Remote)",
            points: [
                "Engineered a Text-to-Video generation prototype leveraging Stable Diffusion and PyTorch, enabling high-fidelity video synthesis from natural language prompts.",
                "Designed and implemented a custom CLIP-based similarity scoring pipeline to quantitatively evaluate semantic alignment between input prompts and generated video frames.",
                "Authored a technical retrospective on generative AI challenges; the article was featured on the company blog and garnered 5,000+ reads.",
            ],
        },
        {
            role: "Android Development Intern",
            company: "Silver Touch Technologies Ltd.",
            period: "Jan 2022 – Apr 2022",
            location: "Ahmedabad, GJ",
            points: [
                "Developed Chat-APP, a real-time Android messaging app.",
                "Built backend using Firebase + Express.js.",
                "Implemented real-time sync and user authentication in Java + Android SDK.",
            ],
        },
        {
            role: "Python Programming Intern",
            company: "CAD DESK",
            period: "June 2021 – July 2021",
            location: "Jaipur, RJ",
            points: [
                "Completed a 30-day intensive internship focused on Python development.",
                "Worked in structured environment with project deadlines.",
            ],
        },
        {
            role: "Software Engineer (Freelance)",
            company: "Self-Employed",
            period: "2022 – Present",
            location: "Remote",
            points: [
                "Web Task Autopilot: Architected end-to-end web automation agents using Selenium and Python to streamline repetitive browser-based workflows.",
                "DocInsight (RAG System): Built a Retrieval-Augmented Generation Q&A system using LangChain and OpenAI to allow users to query complex documentation naturally.",
                "Open Source Leadership: Maintained multiple open-source libraries, achieving a cumulative 2.5k+ stars on GitHub and fostering a community of active contributors.",
            ],
        },
    ],

    // ── Skills ───────────────────────────────────────────
    skills: {
        languages: ["Python", "JavaScript/TypeScript", "C++", "Java", "SQL"],
        frameworks: [
            "React", "Next.js", "Node.js/Express", "Tailwind CSS",
            "Framer Motion", "TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "ROS2"
        ],
        tools: [
            "Git", "Docker", "Vercel", "Netlify", "AWS (S3, Lambda)",
            "Jest", "Cypress", "Gazebo", "Jupyter", "MATLAB"
        ],
        domains: [
            "Robotics", "Generative AI", "Computer Vision", "NLP", "Deep Learning"
        ]
    },

    // ── Projects ────────────────────────────────────────
    projects: [
        {
            title: "AI Video Generator",
            description: "Converts text prompts into short AI-generated videos using diffusion and transformer pipelines.",
            techStack: ["Python", "PyTorch", "Diffusion Models", "HuggingFace", "FFmpeg"],
            highlights: [
                "Implemented latent diffusion models for high-fidelity generation.",
                "Optimized inference pipeline for faster video synthesis."
            ],
            github: "https://github.com/manthanmittal/ai-video-gen",
            demo: "#"
        },
        {
            title: "Intelligent Document Q&A System",
            description: "Upload documents and get accurate answers using embeddings and a retrieval-augmented generation pipeline.",
            techStack: ["Node.js", "Python", "Vector DB", "OpenAI", "React"],
            highlights: [
                "Built a scalable RAG pipeline for handling large PDF documents.",
                "Integrated vector search for semantic query understanding."
            ],
            github: "https://github.com/manthanmittal/doc-qa",
            demo: "#"
        },
        {
            title: "Autonomous Web Navigator",
            description: "An AI agent that performs tasks in a browser using LLM reasoning + Playwright.",
            techStack: ["Node.js", "Playwright", "LangChain", "Puppeteer"],
            highlights: [
                "Designed an agentic loop for multi-step web interactions.",
                "Achieved high success rate on complex form-filling tasks."
            ],
            github: "https://github.com/manthanmittal/web-navigator",
            demo: "#"
        },
        {
            title: "Sleep Pattern Analyzer",
            description: "Analyzes sleep data to detect irregularities using ML classification models.",
            techStack: ["Python", "pandas", "scikit-learn", "PyTorch", "Streamlit"],
            highlights: [
                "Trained classification models to detect sleep anomalies.",
                "Visualized sleep metrics with interactive Streamlit dashboards."
            ],
            github: "https://github.com/manthanmittal/sleep-analyzer",
            demo: "#"
        },
        {
            title: "Random MAC Optimization",
            description: "Uses neural networks & graph neural networks to optimize MAC layer scheduling.",
            techStack: ["PyTorch", "PyG", "Jupyter"],
            highlights: [
                "Applied GNNs to model wireless network topology.",
                "Improved scheduling efficiency compared to traditional algorithms."
            ],
            github: "https://github.com/manthanmittal/mac-optimization",
            demo: "#"
        },
        {
            title: "Roxigym – Full-Stack Fitness Web App",
            description: "Fitness app with login, workout routines, progress tracking, exercise library, and nutrition logging.",
            techStack: ["React", "Node.js", "MongoDB", "JWT", "Vercel"],
            highlights: [
                "Developed full-stack features including auth and database management.",
                "Deployed a responsive PWA for mobile users."
            ],
            github: "https://github.com/manthanmittal/roxigym",
            demo: "https://roxigym.vercel.app"
        },
        {
            title: "Autonomous Hybrid Navigation System using ROS2",
            description: "A hybrid autonomous navigation framework for mobile robots that intelligently switches between PID-based wall following and Fuzzy Logic obstacle avoidance based on real-time LIDAR sensor data.",
            techStack: ["ROS2", "Python", "LIDAR", "PID Control", "Fuzzy Logic", "Gazebo", "Robotics"],
            highlights: [
                "Implemented PID Controller for precise wall following and edge tracking.",
                "Developed Fuzzy Logic Controller for smooth obstacle avoidance.",
                "Designed Hybrid Selector to dynamically switch strategies based on LIDAR data."
            ],
            github: "#",
            demo: "#"
        },
        {
            title: "Rossmann Store Sales Forecasting",
            description: "Forecasted daily sales for 1,115 stores using a hybrid approach of Deep Learning (LSTM, RNN) and Ensemble Methods (XGBoost, Random Forest).",
            techStack: ["Python", "LSTM", "RNN", "XGBoost", "Random Forest", "Time-Series"],
            highlights: [
                "Engineered complex temporal features and handled seasonality to reduce RMSPE.",
                "Conducted comparative analysis of Entity Embeddings in Neural Networks.",
                "Combined Deep Learning and Ensemble Methods for robust forecasting."
            ],
            github: "#",
            demo: "#"
        },
        {
            title: "Feedforward Neural Network Implementation for Robotic Kinematics Prediction",
            description: "Implemented a Feedforward Neural Network to predict robotic arm kinematics, mapping joint angles to end-effector positions.",
            techStack: ["Python", "PyTorch", "Neural Networks", "Robotics", "Kinematics"],
            highlights: [
                "Trained FNN to solve forward kinematics problems with high accuracy.",
                "Optimized model architecture for real-time inference in robotic control loops.",
                "Analyzed prediction errors across the robot's workspace."
            ],
            github: "#",
            demo: "#"
        }
    ],

    // ── Certifications (optional) ───────────────────────
    certifications: [
        {
            name: "Deep Learning Specialization",
            issuer: "Coursera – Andrew Ng",
            year: "2023",
        },
        {
            name: "AWS Certified Solutions Architect – Associate",
            issuer: "Amazon Web Services",
            year: "2022",
        },
    ],
};
