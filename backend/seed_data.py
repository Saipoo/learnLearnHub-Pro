from datetime import datetime
from bson import ObjectId

# 10 Dummy Courses with YouTube Videos and Quizzes
DUMMY_COURSES = [
    {
        "title": "Complete Python Programming Masterclass",
        "description": "Master Python programming from basics to advanced concepts. Learn data structures, OOP, file handling, and more.",
        "thumbnail": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
        "duration": "12 hours",
        "level": "Beginner to Advanced",
        "category": "Programming",
        "lessons": [
            {
                "title": "Introduction to Python",
                "youtube_url": "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
                "description": "Learn Python basics and setup",
                "duration": "45 min"
            },
            {
                "title": "Python Data Types and Variables",
                "youtube_url": "https://www.youtube.com/watch?v=khKv-8q7YmY",
                "description": "Understanding Python data types",
                "duration": "1 hour"
            },
            {
                "title": "Control Flow and Loops",
                "youtube_url": "https://www.youtube.com/watch?v=6iF8Xb7Z3wQ",
                "description": "Master if statements, loops, and control flow",
                "duration": "1.5 hours"
            }
        ],
        "created_at": datetime.utcnow()
    },
    {
        "title": "Web Development with React and Next.js",
        "description": "Build modern web applications using React and Next.js. Learn components, hooks, routing, and deployment.",
        "thumbnail": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
        "duration": "15 hours",
        "level": "Intermediate",
        "category": "Web Development",
        "lessons": [
            {
                "title": "React Fundamentals",
                "youtube_url": "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
                "description": "Learn React basics and components",
                "duration": "2 hours"
            },
            {
                "title": "Next.js Introduction",
                "youtube_url": "https://www.youtube.com/watch?v=mTz0GXj8NN0",
                "description": "Getting started with Next.js framework",
                "duration": "1.5 hours"
            },
            {
                "title": "Server-Side Rendering",
                "youtube_url": "https://www.youtube.com/watch?v=YZBCeJTV-GY",
                "description": "Understanding SSR in Next.js",
                "duration": "2 hours"
            }
        ],
        "created_at": datetime.utcnow()
    },
    {
        "title": "Machine Learning Fundamentals",
        "description": "Introduction to machine learning concepts, algorithms, and practical applications using Python and scikit-learn.",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
        "duration": "20 hours",
        "level": "Intermediate",
        "category": "Data Science",
        "lessons": [
            {
                "title": "Introduction to Machine Learning",
                "youtube_url": "https://www.youtube.com/watch?v=ukzFI9rgwfU",
                "description": "ML basics and concepts",
                "duration": "1 hour"
            },
            {
                "title": "Supervised Learning",
                "youtube_url": "https://www.youtube.com/watch?v=aircAruvnKk",
                "description": "Understanding supervised learning algorithms",
                "duration": "2.5 hours"
            },
            {
                "title": "Neural Networks Basics",
                "youtube_url": "https://www.youtube.com/watch?v=CqOfi41LfDw",
                "description": "Introduction to neural networks",
                "duration": "3 hours"
            }
        ],
        "created_at": datetime.utcnow()
    },
    {
        "title": "Digital Marketing Complete Course",
        "description": "Learn SEO, social media marketing, content marketing, email marketing, and analytics to grow your business online.",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        "duration": "10 hours",
        "level": "Beginner",
        "category": "Marketing",
        "lessons": [
            {
                "title": "Digital Marketing Overview",
                "youtube_url": "https://www.youtube.com/watch?v=nU-IIXBWlS4",
                "description": "Introduction to digital marketing",
                "duration": "45 min"
            },
            {
                "title": "SEO Fundamentals",
                "youtube_url": "https://www.youtube.com/watch?v=DvwS7cV9GmQ",
                "description": "Search Engine Optimization basics",
                "duration": "2 hours"
            },
            {
                "title": "Social Media Marketing",
                "youtube_url": "https://www.youtube.com/watch?v=Wn4x-qcEK5I",
                "description": "Marketing on social platforms",
                "duration": "1.5 hours"
            }
        ],
        "created_at": datetime.utcnow()
    },
    {
        "title": "Data Structures and Algorithms",
        "description": "Master essential data structures and algorithms for coding interviews and competitive programming.",
        "thumbnail": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
        "duration": "25 hours",
        "level": "Intermediate to Advanced",
        "category": "Programming",
        "lessons": [
            {
                "title": "Arrays and Strings",
                "youtube_url": "https://www.youtube.com/watch?v=RBSGKlAvoiM",
                "description": "Understanding arrays and string manipulation",
                "duration": "2 hours"
            },
            {
                "title": "Linked Lists",
                "youtube_url": "https://www.youtube.com/watch?v=njTh_OwMljA",
                "description": "Linked list implementation and operations",
                "duration": "2.5 hours"
            },
            {
                "title": "Trees and Graphs",
                "youtube_url": "https://www.youtube.com/watch?v=fAAZixBzIAI",
                "description": "Tree and graph data structures",
                "duration": "3 hours"
            }
        ],
        "created_at": datetime.utcnow()
    },
    {
        "title": "UI/UX Design Masterclass",
        "description": "Learn user interface and user experience design principles, tools, and best practices for creating stunning designs.",
        "thumbnail": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
        "duration": "14 hours",
        "level": "Beginner to Intermediate",
        "category": "Design",
        "lessons": [
            {
                "title": "Design Principles",
                "youtube_url": "https://www.youtube.com/watch?v=a5KYlHNKQB8",
                "description": "Fundamental design principles",
                "duration": "1 hour"
            },
            {
                "title": "Figma Tutorial",
                "youtube_url": "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
                "description": "Complete Figma design tool tutorial",
                "duration": "3 hours"
            },
            {
                "title": "User Research Methods",
                "youtube_url": "https://www.youtube.com/watch?v=Qq3OiHQ-HCU",
                "description": "Conducting user research",
                "duration": "2 hours"
            }
        ],
        "created_at": datetime.utcnow()
    },
    {
        "title": "Cloud Computing with AWS",
        "description": "Master Amazon Web Services (AWS) cloud platform. Learn EC2, S3, Lambda, RDS, and cloud architecture.",
        "thumbnail": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
        "duration": "18 hours",
        "level": "Intermediate",
        "category": "Cloud Computing",
        "lessons": [
            {
                "title": "AWS Introduction",
                "youtube_url": "https://www.youtube.com/watch?v=ulprqHHWlng",
                "description": "Getting started with AWS",
                "duration": "1.5 hours"
            },
            {
                "title": "EC2 and Networking",
                "youtube_url": "https://www.youtube.com/watch?v=iHX-jtKIVNA",
                "description": "AWS EC2 instances and VPC",
                "duration": "2.5 hours"
            },
            {
                "title": "AWS Lambda and Serverless",
                "youtube_url": "https://www.youtube.com/watch?v=eOBq__h4OJ4",
                "description": "Serverless computing with Lambda",
                "duration": "2 hours"
            }
        ],
        "created_at": datetime.utcnow()
    },
    {
        "title": "Cybersecurity Fundamentals",
        "description": "Learn cybersecurity basics, ethical hacking, network security, and how to protect systems from threats.",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
        "duration": "16 hours",
        "level": "Beginner to Intermediate",
        "category": "Security",
        "lessons": [
            {
                "title": "Cybersecurity Basics",
                "youtube_url": "https://www.youtube.com/watch?v=inWWhr5tnEA",
                "description": "Introduction to cybersecurity",
                "duration": "1 hour"
            },
            {
                "title": "Network Security",
                "youtube_url": "https://www.youtube.com/watch?v=qiQR5rTSshw",
                "description": "Securing networks and protocols",
                "duration": "2.5 hours"
            },
            {
                "title": "Ethical Hacking Intro",
                "youtube_url": "https://www.youtube.com/watch?v=3Kq1MIfTWCE",
                "description": "Basics of ethical hacking",
                "duration": "3 hours"
            }
        ],
        "created_at": datetime.utcnow()
    },
    {
        "title": "Mobile App Development with Flutter",
        "description": "Build beautiful native mobile applications for iOS and Android using Flutter and Dart programming language.",
        "thumbnail": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
        "duration": "22 hours",
        "level": "Intermediate",
        "category": "Mobile Development",
        "lessons": [
            {
                "title": "Flutter Introduction",
                "youtube_url": "https://www.youtube.com/watch?v=1ukSR1GRtMU",
                "description": "Getting started with Flutter",
                "duration": "2 hours"
            },
            {
                "title": "Dart Programming",
                "youtube_url": "https://www.youtube.com/watch?v=Ej_Pcr4uC2Q",
                "description": "Learn Dart language basics",
                "duration": "3 hours"
            },
            {
                "title": "Flutter Widgets",
                "youtube_url": "https://www.youtube.com/watch?v=wE7khGHVkYY",
                "description": "Understanding Flutter widgets",
                "duration": "2.5 hours"
            }
        ],
        "created_at": datetime.utcnow()
    },
    {
        "title": "Blockchain and Cryptocurrency",
        "description": "Understand blockchain technology, cryptocurrencies, smart contracts, and decentralized applications (DApps).",
        "thumbnail": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
        "duration": "13 hours",
        "level": "Intermediate",
        "category": "Blockchain",
        "lessons": [
            {
                "title": "Blockchain Basics",
                "youtube_url": "https://www.youtube.com/watch?v=qOVAbKKSH10",
                "description": "Introduction to blockchain technology",
                "duration": "1.5 hours"
            },
            {
                "title": "Smart Contracts",
                "youtube_url": "https://www.youtube.com/watch?v=ZE2HxTmxfrI",
                "description": "Understanding smart contracts",
                "duration": "2 hours"
            },
            {
                "title": "Ethereum Development",
                "youtube_url": "https://www.youtube.com/watch?v=coQ5dg8wM2o",
                "description": "Building on Ethereum blockchain",
                "duration": "3 hours"
            }
        ],
        "created_at": datetime.utcnow()
    }
]

# Quiz data for each course
DUMMY_QUIZZES = [
    {
        "course_index": 0,  # Python course
        "title": "Python Programming Quiz",
        "description": "Test your Python knowledge",
        "passing_score": 70,
        "time_limit": 20,
        "questions": [
            {
                "question": "What is the output of print(type([]))?",
                "options": [
                    {"option": "<class 'list'>", "is_correct": True},
                    {"option": "<class 'dict'>", "is_correct": False},
                    {"option": "<class 'tuple'>", "is_correct": False},
                    {"option": "<class 'set'>", "is_correct": False}
                ],
                "explanation": "[] creates an empty list, so type([]) returns <class 'list'>"
            },
            {
                "question": "Which keyword is used to define a function in Python?",
                "options": [
                    {"option": "function", "is_correct": False},
                    {"option": "def", "is_correct": True},
                    {"option": "func", "is_correct": False},
                    {"option": "define", "is_correct": False}
                ],
                "explanation": "'def' is the keyword used to define functions in Python"
            },
            {
                "question": "What does the 'len()' function do?",
                "options": [
                    {"option": "Returns the length of an object", "is_correct": True},
                    {"option": "Returns the type of an object", "is_correct": False},
                    {"option": "Returns the value of an object", "is_correct": False},
                    {"option": "Returns the id of an object", "is_correct": False}
                ],
                "explanation": "len() returns the number of items in an object"
            },
            {
                "question": "Which of the following is a mutable data type?",
                "options": [
                    {"option": "tuple", "is_correct": False},
                    {"option": "string", "is_correct": False},
                    {"option": "list", "is_correct": True},
                    {"option": "int", "is_correct": False}
                ],
                "explanation": "Lists are mutable, meaning they can be modified after creation"
            },
            {
                "question": "What is the correct way to comment in Python?",
                "options": [
                    {"option": "// comment", "is_correct": False},
                    {"option": "/* comment */", "is_correct": False},
                    {"option": "# comment", "is_correct": True},
                    {"option": "<!-- comment -->", "is_correct": False}
                ],
                "explanation": "Python uses # for single-line comments"
            }
        ]
    },
    {
        "course_index": 1,  # React/Next.js course
        "title": "React and Next.js Quiz",
        "description": "Test your React and Next.js knowledge",
        "passing_score": 70,
        "time_limit": 15,
        "questions": [
            {
                "question": "What is JSX?",
                "options": [
                    {"option": "A JavaScript library", "is_correct": False},
                    {"option": "A syntax extension for JavaScript", "is_correct": True},
                    {"option": "A CSS framework", "is_correct": False},
                    {"option": "A database query language", "is_correct": False}
                ],
                "explanation": "JSX is a syntax extension that allows writing HTML-like code in JavaScript"
            },
            {
                "question": "Which hook is used for side effects in React?",
                "options": [
                    {"option": "useState", "is_correct": False},
                    {"option": "useEffect", "is_correct": True},
                    {"option": "useContext", "is_correct": False},
                    {"option": "useReducer", "is_correct": False}
                ],
                "explanation": "useEffect is used for performing side effects in functional components"
            },
            {
                "question": "What does SSR stand for in Next.js?",
                "options": [
                    {"option": "Server-Side Routing", "is_correct": False},
                    {"option": "Static Site Rendering", "is_correct": False},
                    {"option": "Server-Side Rendering", "is_correct": True},
                    {"option": "Simple Site Response", "is_correct": False}
                ],
                "explanation": "SSR stands for Server-Side Rendering, a key feature of Next.js"
            },
            {
                "question": "Which folder contains pages in a Next.js project?",
                "options": [
                    {"option": "components", "is_correct": False},
                    {"option": "pages or app", "is_correct": True},
                    {"option": "views", "is_correct": False},
                    {"option": "routes", "is_correct": False}
                ],
                "explanation": "Next.js uses 'pages' or 'app' directory for routing"
            },
            {
                "question": "What is the Virtual DOM?",
                "options": [
                    {"option": "A programming language", "is_correct": False},
                    {"option": "A lightweight copy of the actual DOM", "is_correct": True},
                    {"option": "A CSS framework", "is_correct": False},
                    {"option": "A database", "is_correct": False}
                ],
                "explanation": "Virtual DOM is a lightweight JavaScript representation of the actual DOM"
            }
        ]
    },
    {
        "course_index": 2,  # Machine Learning course
        "title": "Machine Learning Fundamentals Quiz",
        "description": "Test your ML knowledge",
        "passing_score": 70,
        "time_limit": 25,
        "questions": [
            {
                "question": "What type of learning uses labeled data?",
                "options": [
                    {"option": "Unsupervised Learning", "is_correct": False},
                    {"option": "Supervised Learning", "is_correct": True},
                    {"option": "Reinforcement Learning", "is_correct": False},
                    {"option": "Transfer Learning", "is_correct": False}
                ],
                "explanation": "Supervised learning uses labeled training data"
            },
            {
                "question": "What is overfitting?",
                "options": [
                    {"option": "Model performs well on both training and test data", "is_correct": False},
                    {"option": "Model performs poorly on both training and test data", "is_correct": False},
                    {"option": "Model performs well on training but poorly on test data", "is_correct": True},
                    {"option": "Model performs poorly on training but well on test data", "is_correct": False}
                ],
                "explanation": "Overfitting occurs when a model learns training data too well, including noise"
            },
            {
                "question": "Which algorithm is used for classification?",
                "options": [
                    {"option": "Linear Regression", "is_correct": False},
                    {"option": "Logistic Regression", "is_correct": True},
                    {"option": "K-Means", "is_correct": False},
                    {"option": "PCA", "is_correct": False}
                ],
                "explanation": "Logistic Regression is a classification algorithm"
            },
            {
                "question": "What is a neural network layer that learns features called?",
                "options": [
                    {"option": "Output layer", "is_correct": False},
                    {"option": "Input layer", "is_correct": False},
                    {"option": "Hidden layer", "is_correct": True},
                    {"option": "Dropout layer", "is_correct": False}
                ],
                "explanation": "Hidden layers learn intermediate features from the data"
            },
            {
                "question": "What does 'epoch' mean in machine learning?",
                "options": [
                    {"option": "One pass through the entire training dataset", "is_correct": True},
                    {"option": "One training example", "is_correct": False},
                    {"option": "One batch of data", "is_correct": False},
                    {"option": "One layer in a neural network", "is_correct": False}
                ],
                "explanation": "An epoch is one complete pass through the entire training dataset"
            }
        ]
    },
    {
        "course_index": 3,  # Digital Marketing course
        "title": "Digital Marketing Quiz",
        "description": "Test your digital marketing knowledge",
        "passing_score": 70,
        "time_limit": 15,
        "questions": [
            {
                "question": "What does SEO stand for?",
                "options": [
                    {"option": "Social Engine Optimization", "is_correct": False},
                    {"option": "Search Engine Optimization", "is_correct": True},
                    {"option": "Site Engine Optimization", "is_correct": False},
                    {"option": "Search Email Optimization", "is_correct": False}
                ],
                "explanation": "SEO stands for Search Engine Optimization"
            },
            {
                "question": "Which metric measures the percentage of visitors who leave after viewing one page?",
                "options": [
                    {"option": "Conversion Rate", "is_correct": False},
                    {"option": "Click-Through Rate", "is_correct": False},
                    {"option": "Bounce Rate", "is_correct": True},
                    {"option": "Engagement Rate", "is_correct": False}
                ],
                "explanation": "Bounce rate measures single-page visits"
            },
            {
                "question": "What is A/B testing?",
                "options": [
                    {"option": "Testing two versions to see which performs better", "is_correct": True},
                    {"option": "Testing website security", "is_correct": False},
                    {"option": "Testing email deliverability", "is_correct": False},
                    {"option": "Testing server performance", "is_correct": False}
                ],
                "explanation": "A/B testing compares two versions to determine which performs better"
            },
            {
                "question": "What does CTR stand for?",
                "options": [
                    {"option": "Cost Through Rate", "is_correct": False},
                    {"option": "Click-Through Rate", "is_correct": True},
                    {"option": "Customer Transaction Rate", "is_correct": False},
                    {"option": "Content Transfer Rate", "is_correct": False}
                ],
                "explanation": "CTR stands for Click-Through Rate"
            },
            {
                "question": "Which platform is best for B2B marketing?",
                "options": [
                    {"option": "TikTok", "is_correct": False},
                    {"option": "Instagram", "is_correct": False},
                    {"option": "LinkedIn", "is_correct": True},
                    {"option": "Snapchat", "is_correct": False}
                ],
                "explanation": "LinkedIn is the leading platform for B2B marketing"
            }
        ]
    },
    {
        "course_index": 4,  # DSA course
        "title": "Data Structures and Algorithms Quiz",
        "description": "Test your DSA knowledge",
        "passing_score": 70,
        "time_limit": 30,
        "questions": [
            {
                "question": "What is the time complexity of binary search?",
                "options": [
                    {"option": "O(n)", "is_correct": False},
                    {"option": "O(log n)", "is_correct": True},
                    {"option": "O(n^2)", "is_correct": False},
                    {"option": "O(1)", "is_correct": False}
                ],
                "explanation": "Binary search has O(log n) time complexity"
            },
            {
                "question": "Which data structure uses LIFO principle?",
                "options": [
                    {"option": "Queue", "is_correct": False},
                    {"option": "Stack", "is_correct": True},
                    {"option": "Array", "is_correct": False},
                    {"option": "Tree", "is_correct": False}
                ],
                "explanation": "Stack uses Last In First Out (LIFO) principle"
            },
            {
                "question": "What is a hash collision?",
                "options": [
                    {"option": "When two keys map to the same hash value", "is_correct": True},
                    {"option": "When hash function fails", "is_correct": False},
                    {"option": "When hash table is full", "is_correct": False},
                    {"option": "When key is not found", "is_correct": False}
                ],
                "explanation": "Hash collision occurs when different keys produce the same hash value"
            },
            {
                "question": "Which sorting algorithm has the best average case time complexity?",
                "options": [
                    {"option": "Bubble Sort", "is_correct": False},
                    {"option": "Quick Sort", "is_correct": True},
                    {"option": "Selection Sort", "is_correct": False},
                    {"option": "Insertion Sort", "is_correct": False}
                ],
                "explanation": "Quick Sort has O(n log n) average case time complexity"
            },
            {
                "question": "What is the height of a balanced binary tree with n nodes?",
                "options": [
                    {"option": "O(n)", "is_correct": False},
                    {"option": "O(log n)", "is_correct": True},
                    {"option": "O(n^2)", "is_correct": False},
                    {"option": "O(1)", "is_correct": False}
                ],
                "explanation": "A balanced binary tree has height O(log n)"
            }
        ]
    },
    {
        "course_index": 5,  # UI/UX Design course
        "title": "UI/UX Design Quiz",
        "description": "Test your design knowledge",
        "passing_score": 70,
        "time_limit": 15,
        "questions": [
            {
                "question": "What does UI stand for?",
                "options": [
                    {"option": "User Interface", "is_correct": True},
                    {"option": "Universal Integration", "is_correct": False},
                    {"option": "Unified Interaction", "is_correct": False},
                    {"option": "User Information", "is_correct": False}
                ],
                "explanation": "UI stands for User Interface"
            },
            {
                "question": "What is the purpose of a wireframe?",
                "options": [
                    {"option": "Final design mockup", "is_correct": False},
                    {"option": "Low-fidelity layout structure", "is_correct": True},
                    {"option": "Color scheme selection", "is_correct": False},
                    {"option": "Animation planning", "is_correct": False}
                ],
                "explanation": "Wireframes show basic layout and structure without detailed design"
            },
            {
                "question": "What is the 60-30-10 rule in design?",
                "options": [
                    {"option": "Typography sizing", "is_correct": False},
                    {"option": "Color distribution: 60% dominant, 30% secondary, 10% accent", "is_correct": True},
                    {"option": "Spacing measurements", "is_correct": False},
                    {"option": "Image sizing", "is_correct": False}
                ],
                "explanation": "60-30-10 rule guides color distribution in design"
            },
            {
                "question": "What is whitespace in design?",
                "options": [
                    {"option": "Empty space between elements", "is_correct": True},
                    {"option": "Background color", "is_correct": False},
                    {"option": "Text color", "is_correct": False},
                    {"option": "Border spacing", "is_correct": False}
                ],
                "explanation": "Whitespace (negative space) is the empty area between design elements"
            },
            {
                "question": "What does 'responsive design' mean?",
                "options": [
                    {"option": "Fast loading websites", "is_correct": False},
                    {"option": "Design that adapts to different screen sizes", "is_correct": True},
                    {"option": "Interactive animations", "is_correct": False},
                    {"option": "Voice-activated interfaces", "is_correct": False}
                ],
                "explanation": "Responsive design adapts layouts to various screen sizes and devices"
            }
        ]
    },
    {
        "course_index": 6,  # AWS course
        "title": "AWS Cloud Computing Quiz",
        "description": "Test your AWS knowledge",
        "passing_score": 70,
        "time_limit": 20,
        "questions": [
            {
                "question": "What does EC2 stand for?",
                "options": [
                    {"option": "Elastic Compute Cloud", "is_correct": True},
                    {"option": "Enhanced Cloud Computing", "is_correct": False},
                    {"option": "Enterprise Cloud Container", "is_correct": False},
                    {"option": "Extended Computing Cluster", "is_correct": False}
                ],
                "explanation": "EC2 stands for Elastic Compute Cloud"
            },
            {
                "question": "Which AWS service is used for object storage?",
                "options": [
                    {"option": "EC2", "is_correct": False},
                    {"option": "S3", "is_correct": True},
                    {"option": "RDS", "is_correct": False},
                    {"option": "Lambda", "is_correct": False}
                ],
                "explanation": "S3 (Simple Storage Service) is AWS's object storage service"
            },
            {
                "question": "What is AWS Lambda?",
                "options": [
                    {"option": "A database service", "is_correct": False},
                    {"option": "A serverless compute service", "is_correct": True},
                    {"option": "A load balancer", "is_correct": False},
                    {"option": "A DNS service", "is_correct": False}
                ],
                "explanation": "Lambda is a serverless compute service that runs code without managing servers"
            },
            {
                "question": "Which service provides managed relational databases?",
                "options": [
                    {"option": "DynamoDB", "is_correct": False},
                    {"option": "RDS", "is_correct": True},
                    {"option": "S3", "is_correct": False},
                    {"option": "ElastiCache", "is_correct": False}
                ],
                "explanation": "RDS (Relational Database Service) provides managed relational databases"
            },
            {
                "question": "What is a VPC?",
                "options": [
                    {"option": "Virtual Private Cloud", "is_correct": True},
                    {"option": "Virtual Public Container", "is_correct": False},
                    {"option": "Virtual Processing Center", "is_correct": False},
                    {"option": "Virtual Private Computing", "is_correct": False}
                ],
                "explanation": "VPC stands for Virtual Private Cloud, an isolated network in AWS"
            }
        ]
    },
    {
        "course_index": 7,  # Cybersecurity course
        "title": "Cybersecurity Fundamentals Quiz",
        "description": "Test your cybersecurity knowledge",
        "passing_score": 70,
        "time_limit": 20,
        "questions": [
            {
                "question": "What is phishing?",
                "options": [
                    {"option": "A type of malware", "is_correct": False},
                    {"option": "A social engineering attack to steal information", "is_correct": True},
                    {"option": "A firewall bypass technique", "is_correct": False},
                    {"option": "A network scanning tool", "is_correct": False}
                ],
                "explanation": "Phishing is a social engineering attack that tricks users into revealing sensitive information"
            },
            {
                "question": "What does VPN stand for?",
                "options": [
                    {"option": "Virtual Public Network", "is_correct": False},
                    {"option": "Virtual Private Network", "is_correct": True},
                    {"option": "Verified Personal Network", "is_correct": False},
                    {"option": "Virtual Protected Node", "is_correct": False}
                ],
                "explanation": "VPN stands for Virtual Private Network"
            },
            {
                "question": "What is two-factor authentication?",
                "options": [
                    {"option": "Using two passwords", "is_correct": False},
                    {"option": "Requiring two forms of verification", "is_correct": True},
                    {"option": "Having two user accounts", "is_correct": False},
                    {"option": "Logging in twice", "is_correct": False}
                ],
                "explanation": "Two-factor authentication requires two different forms of verification"
            },
            {
                "question": "What is malware?",
                "options": [
                    {"option": "Malicious software", "is_correct": True},
                    {"option": "A type of firewall", "is_correct": False},
                    {"option": "An encryption method", "is_correct": False},
                    {"option": "A network protocol", "is_correct": False}
                ],
                "explanation": "Malware is malicious software designed to harm or exploit systems"
            },
            {
                "question": "What is the purpose of encryption?",
                "options": [
                    {"option": "Speed up data transfer", "is_correct": False},
                    {"option": "Protect data by converting it to unreadable format", "is_correct": True},
                    {"option": "Compress files", "is_correct": False},
                    {"option": "Backup data", "is_correct": False}
                ],
                "explanation": "Encryption converts data into an unreadable format to protect it"
            }
        ]
    },
    {
        "course_index": 8,  # Flutter course
        "title": "Flutter Mobile Development Quiz",
        "description": "Test your Flutter knowledge",
        "passing_score": 70,
        "time_limit": 20,
        "questions": [
            {
                "question": "What language is used to write Flutter apps?",
                "options": [
                    {"option": "JavaScript", "is_correct": False},
                    {"option": "Dart", "is_correct": True},
                    {"option": "Kotlin", "is_correct": False},
                    {"option": "Swift", "is_correct": False}
                ],
                "explanation": "Flutter uses Dart programming language"
            },
            {
                "question": "What is a Widget in Flutter?",
                "options": [
                    {"option": "A database table", "is_correct": False},
                    {"option": "A UI component", "is_correct": True},
                    {"option": "A network request", "is_correct": False},
                    {"option": "A file format", "is_correct": False}
                ],
                "explanation": "Widgets are the basic building blocks of Flutter UI"
            },
            {
                "question": "Which widget is used for user input?",
                "options": [
                    {"option": "Text", "is_correct": False},
                    {"option": "TextField", "is_correct": True},
                    {"option": "Container", "is_correct": False},
                    {"option": "Column", "is_correct": False}
                ],
                "explanation": "TextField widget is used for text input from users"
            },
            {
                "question": "What is hot reload in Flutter?",
                "options": [
                    {"option": "Restart the entire app", "is_correct": False},
                    {"option": "Quickly see code changes without losing app state", "is_correct": True},
                    {"option": "Update dependencies", "is_correct": False},
                    {"option": "Clear app cache", "is_correct": False}
                ],
                "explanation": "Hot reload allows seeing code changes instantly without losing app state"
            },
            {
                "question": "Which widget arranges children vertically?",
                "options": [
                    {"option": "Row", "is_correct": False},
                    {"option": "Column", "is_correct": True},
                    {"option": "Stack", "is_correct": False},
                    {"option": "Grid", "is_correct": False}
                ],
                "explanation": "Column widget arranges its children in a vertical array"
            }
        ]
    },
    {
        "course_index": 9,  # Blockchain course
        "title": "Blockchain and Cryptocurrency Quiz",
        "description": "Test your blockchain knowledge",
        "passing_score": 70,
        "time_limit": 20,
        "questions": [
            {
                "question": "What is a blockchain?",
                "options": [
                    {"option": "A type of cryptocurrency", "is_correct": False},
                    {"option": "A distributed ledger technology", "is_correct": True},
                    {"option": "A mining software", "is_correct": False},
                    {"option": "A wallet app", "is_correct": False}
                ],
                "explanation": "Blockchain is a distributed ledger that records transactions across multiple computers"
            },
            {
                "question": "What is a smart contract?",
                "options": [
                    {"option": "A legal document", "is_correct": False},
                    {"option": "Self-executing code on blockchain", "is_correct": True},
                    {"option": "A trading strategy", "is_correct": False},
                    {"option": "A wallet type", "is_correct": False}
                ],
                "explanation": "Smart contracts are self-executing programs stored on blockchain"
            },
            {
                "question": "Which consensus mechanism does Bitcoin use?",
                "options": [
                    {"option": "Proof of Stake", "is_correct": False},
                    {"option": "Proof of Work", "is_correct": True},
                    {"option": "Proof of Authority", "is_correct": False},
                    {"option": "Delegated Proof of Stake", "is_correct": False}
                ],
                "explanation": "Bitcoin uses Proof of Work consensus mechanism"
            },
            {
                "question": "What is cryptocurrency mining?",
                "options": [
                    {"option": "Creating new wallets", "is_correct": False},
                    {"option": "Validating transactions and creating new blocks", "is_correct": True},
                    {"option": "Buying and selling crypto", "is_correct": False},
                    {"option": "Storing crypto offline", "is_correct": False}
                ],
                "explanation": "Mining involves validating transactions and adding new blocks to the blockchain"
            },
            {
                "question": "What is a private key?",
                "options": [
                    {"option": "A secret code to access your crypto wallet", "is_correct": True},
                    {"option": "Your wallet address", "is_correct": False},
                    {"option": "Your transaction history", "is_correct": False},
                    {"option": "Your username", "is_correct": False}
                ],
                "explanation": "Private key is a secret code that allows you to access and control your cryptocurrency"
            }
        ]
    }
]
