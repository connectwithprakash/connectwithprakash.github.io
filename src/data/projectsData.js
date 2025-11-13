export const projectsData = [
  {
    id: 'memory-optimized-agent',
    title: 'Memory-Optimized Agent',
    shortDescription: 'Production-ready AI context management using semantic similarity - 42% cost reduction with <12ms filtering. Features LangGraph workflows, FastAPI, PostgreSQL with pgvector.',
    category: 'work',
    importance: 1,
    featured: true,
    tags: ['Python', 'LangGraph', 'FastAPI', 'PostgreSQL', 'AI'],
    gradient: 'var(--gradient-primary)',
    thumbnail: null,
    github: 'https://github.com/connectwithprakash/memory-optimized-agent',
    demo: 'https://github.com/connectwithprakash/memory-optimized-agent#readme',
    overview: `A production-ready AI agent system implementing intelligent context management through semantic similarity-based memory optimization. The system reduces AI operational costs by 42% while maintaining response quality through sub-12ms context filtering.

Built with LangGraph for agent orchestration, the system uses PostgreSQL with pgvector extension for efficient semantic search of conversation history. The FastAPI backend provides robust API endpoints for agent interactions, while the sophisticated memory management ensures relevant context is always available without excessive token usage.`,
    features: [
      'Semantic similarity-based context filtering',
      '42% reduction in operational costs',
      'Sub-12ms filtering performance',
      'LangGraph workflow orchestration',
      'PostgreSQL with pgvector for semantic search',
      'Production-ready FastAPI backend',
      'Scalable architecture for multi-agent systems'
    ],
    technologies: {
      languages: ['Python'],
      frameworks: ['LangGraph', 'FastAPI'],
      databases: ['PostgreSQL', 'pgvector'],
      tools: ['Docker', 'OpenAI API']
    },
    challenges: 'Balancing context relevance with cost optimization while maintaining sub-second response times in a production environment.',
    images: []
  },
  {
    id: 'norch',
    title: 'Norch',
    shortDescription: 'A simple PyTorch-like deep learning library built entirely with NumPy. Implements neural network layers, activation functions, loss functions, and optimizers for educational purposes.',
    category: 'fun',
    importance: 2,
    featured: true,
    tags: ['Python', 'NumPy', 'Deep Learning', 'Jupyter'],
    gradient: 'var(--gradient-secondary)',
    thumbnail: null,
    github: 'https://github.com/connectwithprakash/norch',
    demo: 'https://github.com/connectwithprakash/norch',
    overview: `Norch is a PyTorch-like deep learning framework built using just NumPy. It provides a simple and intuitive interface for building and training deep neural networks. This document provides an overview of Norch's features and instructions for how to use Norch in your Python projects.

The goal of Norch is to demonstrate how modern deep learning frameworks work under the hood, making it an excellent educational tool for understanding backpropagation, gradient descent, and neural network architectures.`,
    features: [
      'Linear and sequential layers',
      'Activation functions (ReLU, Sigmoid, Tanh)',
      'Loss functions (MSE, Cross-Entropy)',
      'Optimizers (SGD, Adam)',
      'Automatic differentiation',
      'PyTorch-like API design'
    ],
    technologies: {
      languages: ['Python'],
      frameworks: ['NumPy'],
      tools: ['Jupyter Notebook']
    },
    challenges: 'Implementing efficient backpropagation and automatic differentiation using only NumPy, while maintaining an intuitive PyTorch-like API.',
    images: []
  },
  {
    id: 'sound-source-localization',
    title: 'Sound Source Localization',
    shortDescription: 'A 3D sound source localization system using an 8-microphone cubical mesh for locating disaster victims. Achieved 95% accuracy within 1.5m range using GCC-PHAT algorithm and CNN-based denoising.',
    category: 'academic',
    importance: 1,
    featured: true,
    tags: ['Python', 'C', 'Keras', 'Robotics', 'Signal Processing'],
    gradient: 'var(--gradient-tertiary)',
    thumbnail: '/assets/img/projects/sound_source_localization/SSL.jpg',
    github: 'https://github.com/subash-timilsina/Sound-Source-Localization',
    relatedLinks: [
      {
        title: 'Denoise Algorithm',
        url: 'https://github.com/connectwithprakash/Speech-Denoising-using-CED'
      }
    ],
    demo: 'https://www.youtube.com/embed/Y1u37uJwSeI',
    overview: `We developed a 3D sound source localization system using an 8-microphone cubical mesh. The primary goal of this system was to accurately determine the azimuth (horizontal angle) and elevation (vertical angle) of an incoming sound source. The system uses a cubical microphone array to detect sound waves and a grid search method to determine the location of the sound source in 3D space. The system is mounted on an omnidirectional drive vehicle, which allows it to navigate to the location of the sound source.

The system was evaluated in a simulated disaster environment and was able to successfully locate the sound source. The system is a promising new technology that could be used to help rescue victims of disasters.

The system is also capable of using the deep learning based denoise algorithm to remove background noise and improve the accuracy of the sound source localization.`,
    methodology: `**1. Hardware Setup**: We created a cubical mesh configuration with eight microphones, ensuring that the microphones were evenly distributed for optimal coverage.

**2. Sound Localization Algorithm**: We implemented the GCC-PHAT (Generalized Cross-Correlation with Phase Transform) algorithm. This algorithm is widely used for sound source localization and is known for its accuracy in determining the time delay of arrival (TDOA) between microphone pairs.

**3. Data Acquisition**: The system recorded sound data from the eight microphones. By analyzing the TDOAs between microphone pairs, we calculated the azimuth and elevation angles of the sound source.

**4. Signal Denoising**: To improve the accuracy of the localization system, we integrated a Convolutional Neural Network (CNN) for speech denoising. This CNN was trained to remove noise from the recorded audio signals.

**5. Result**: After extensive testing and training, the system reached an impressive 95% accuracy in 3D localization within a range of 1.5 meters. This level of accuracy was achieved through the combination of the precise GCC-PHAT algorithm and the denoising capabilities of the CNN.

**6. Conclusion**: This project is a significant achievement as it demonstrates the successful integration of signal processing techniques, machine learning, and hardware design to create a 3D sound source localization system with high accuracy. It has various potential applications in fields such as robotics, audio surveillance, and augmented reality.`,
    features: [
      'Sound source localization in 3D space',
      'Deep learning based denoise algorithm',
      'Omnidirectional drive vehicle integration',
      '95% accuracy within 1.5m range',
      'GCC-PHAT algorithm implementation',
      'Real-time audio processing'
    ],
    technologies: {
      hardware: ['Raspberry Pi', 'AVR', 'Microphone Array', 'Omnidirectional Drive Vehicle'],
      languages: ['Python', 'C'],
      frameworks: ['Keras'],
      algorithms: ['GCC-PHAT', 'CNN for Denoising']
    },
    challenges: 'The denoising algorithm was computationally expensive for the Raspberry Pi. So, we needed to optimize the algorithm to run on the Raspberry Pi in real-time. Optimization process would involve using a smaller neural network, and using lower precision floating point numbers.',
    images: [
      {
        path: '/assets/img/projects/sound_source_localization/system.png',
        caption: 'System diagram of the sound source localization system'
      },
      {
        path: '/assets/img/projects/sound_source_localization/algorithm.png',
        caption: 'Process flow diagram of the algorithm'
      },
      {
        path: '/assets/img/projects/sound_source_localization/microphone_cube.png',
        caption: 'Cubical microphone array'
      },
      {
        path: '/assets/img/projects/sound_source_localization/grid_search.png',
        caption: 'Grid search method for sound source localization'
      }
    ]
  },
  {
    id: 'abu-robocon-2018',
    title: 'ABU Robocon 2018',
    shortDescription: 'Autonomous robots designed and built for the ABU Robocon 2018 international competition. Features advanced control systems and embedded programming.',
    category: 'academic',
    importance: 1,
    featured: false,
    tags: ['C++', 'Robotics', 'Embedded', 'Competition'],
    gradient: 'var(--gradient-quaternary)',
    thumbnail: '/assets/img/projects/abu_robocon_2018.png',
    github: 'https://github.com/connectwithprakash/ABU-Robocon-2018',
    demo: 'https://www.youtube.com/embed/2p6DM4dJpXI',
    relatedVideos: [
      {
        url: 'https://www.youtube.com/embed/2p6DM4dJpXI',
        caption: 'Practice round of ABU Robocon 2018 at Home'
      },
      {
        url: 'https://www.youtube.com/embed/HTp0pIc4Hv8',
        caption: 'Competition rounds of ABU Robocon 2018 in Vietnam'
      }
    ],
    overview: `The theme of ABU Robocon 2018 was "Ném còn" (Throwing shuttlecock), a traditional game in ethnic region of Vietnam. The goal of the game was to throw the shuttlecocks through the ring at height. In Vietnamese culture, the game is about celebration and making friendship. In the game, each team are given a few shuttlecocks and needs to design two robots, one manual and one automatic robot. The manual robot needs to hand the shuttlecocks to the automatic robot, which attempts to throw the shuttlecocks through the rings (unlike the traditional game, there are three rings at various heights in this game). The winner can be achieved by points, or by immediate KO if the robots successfully throw the shuttlecocks through three rings, and for the highest ring, the shuttlecock lands on a golden disk on the opposite side.`,
    features: [
      'Manual robot for shuttlecock handling',
      'Automatic robot with precision throwing mechanism',
      'Omnidirectional drive vehicle',
      'Real-time sensor feedback systems',
      'Advanced trajectory calculation',
      'Coordinated multi-robot system'
    ],
    technologies: {
      hardware: ['AVR', 'Servo Motors', 'DC Motors', 'IR Sensors', 'Accelerometer', 'Gyrometer', 'Compass', 'Omnidirectional Drive Vehicle'],
      languages: ['C'],
      tools: ['AVR Studio']
    },
    challenges: 'Achieving precise throwing accuracy for shuttlecocks at different heights while coordinating between manual and automatic robots in a competitive environment.',
    images: []
  },
  {
    id: 'spectral-unmixing',
    title: 'Spectral Unmixing',
    shortDescription: 'Deciphering Earth\'s and Lunar materials with advanced machine learning. Uses deep learning and feature engineering for analyzing spectral signatures.',
    category: 'academic',
    importance: 1,
    featured: false,
    tags: ['Python', 'PyTorch', 'Machine Learning', 'NASA'],
    gradient: 'var(--gradient-cosmic)',
    thumbnail: '/assets/img/projects/spectral_unmixing/logo.png',
    github: 'https://github.com/NASA-IMPACT/ml_spectroscopy',
    demo: null,
    overview: `This project delves into the fascinating world of spectral unmixing using machine learning. The goal is to decipher the composition of various Earth-based and Lunar materials by leveraging advanced deep learning models and feature engineering techniques. By analyzing the spectral signatures of these materials, the project seeks to provide valuable insights into Earth's geological diversity, resource exploration, scientific discovery, and enhance our understanding of Lunar materials as well.

The project uses synthetic and real data from various Earth-based materials as proxies to lunar materials. These materials range from everyday products to synthetic spectral data, demonstrating the model's adaptability and robustness.

### Unveiling Earth's and Lunar Geological Secrets

The researchers have harnessed the capabilities of machine learning to transform raw spectral data into informative features. These features capture the nuances of the materials, including periodic patterns, variations, and distinctive spectral characteristics. By doing so, they enhance the model's ability to discern subtle differences in spectral signatures and make accurate predictions regarding the composition of mixed Earth-based and Lunar materials.

### The Role of Feature Engineering

Feature engineering plays a pivotal role in the project's methodology. Techniques such as Fourier coefficients, principal component analysis (PCA) components, and derivatives are employed to create valuable representations of the spectral data. This transformation of raw data into meaningful features is essential for the accurate analysis of Earth's and Lunar geological materials.`,
    features: [
      'Spectral unmixing for Earth-based and Lunar materials',
      'Advanced feature engineering techniques',
      'Deep learning model for composition prediction',
      'Adaptability to diverse datasets',
      'Fourier coefficients and PCA components',
      'Derivative-based feature extraction'
    ],
    technologies: {
      languages: ['Python'],
      frameworks: ['PyTorch', 'Sklearn', 'Scipy'],
      tools: ['Jupyter Notebook', 'NumPy', 'Pandas']
    },
    challenges: 'The project addresses various challenges associated with the analysis of Earth-based and Lunar materials, including the need for extensive and diverse datasets to mimic complex material mixtures. The model\'s performance has been promising, but further improvements can be achieved with increased data samples, particularly in scenarios where base materials are similar.',
    futureDirections: 'In the future, the focus should be on acquiring more spectral data for Earth-based and Lunar materials, and developing more advanced machine learning models and feature engineering techniques to enhance the accuracy of composition predictions in challenging scenarios. This project represents a significant step toward unlocking Earth\'s and Lunar geological secrets and advancing our understanding of the materials that make up our planet and the Moon.',
    images: []
  },
  {
    id: 'data-science-cookiecutter',
    title: 'Data Science Cookiecutter',
    shortDescription: 'Boilerplate project setup for data science projects. Provides structured template for reproducible research and standardized workflows.',
    category: 'fun',
    importance: 3,
    featured: false,
    tags: ['Python', 'Data Science', 'Template', 'Best Practices'],
    gradient: 'var(--gradient-primary)',
    thumbnail: null,
    github: 'https://github.com/connectwithprakash/datascience_cookiecutter',
    demo: 'https://github.com/connectwithprakash/datascience_cookiecutter',
    overview: 'A cookiecutter template for data science projects that provides a standardized structure for organizing code, data, models, and documentation. Promotes reproducible research and best practices in data science workflows.',
    features: [
      'Standardized project structure',
      'Pre-configured environment setup',
      'Data versioning support',
      'Experiment tracking integration',
      'Documentation templates',
      'Testing framework setup'
    ],
    technologies: {
      languages: ['Python'],
      tools: ['Cookiecutter', 'Git', 'Make']
    },
    challenges: null,
    images: []
  },
  {
    id: 'pibrary',
    title: 'Pibrary',
    shortDescription: 'Collection of reusable Python scripts and modules. Contains utilities and helper functions useful across multiple projects.',
    category: 'fun',
    importance: 3,
    featured: false,
    tags: ['Python', 'Library', 'Utilities', 'Tools'],
    gradient: 'var(--gradient-secondary)',
    thumbnail: null,
    github: 'https://github.com/connectwithprakash/pibrary',
    demo: 'https://pibrary.readthedocs.io/en/latest/',
    overview: `Pibrary is a package of reusable code for ML projects. It is a collection of utility functions and classes that I have found useful in my projects. It is not a framework, but rather a collection of tools that can be used in any ML project.

Available on PyPI and fully documented on Read The Docs.`,
    features: [
      'File manipulation utilities',
      'Logging utilities',
      'String manipulation functions',
      'Reusable ML project components',
      'Comprehensive documentation',
      'Available on PyPI'
    ],
    technologies: {
      languages: ['Python'],
      tools: ['PyPI', 'Read The Docs', 'GitHub Actions']
    },
    installation: 'pip install pibrary',
    challenges: null,
    images: []
  },
  {
    id: 'foxhound-security-solution',
    title: 'Foxhound Security Solution',
    shortDescription: 'A security solution for anomalous activity detection in a network.',
    category: 'work',
    importance: 2,
    featured: false,
    tags: ['Security', 'Network', 'Anomaly Detection'],
    gradient: 'var(--gradient-tertiary)',
    thumbnail: '/assets/img/projects/foxhound_security_solution.png',
    github: 'https://github.com/kaushu42/foxhound-security-solution',
    demo: null,
    overview: 'A network security solution focused on detecting anomalous activities and potential threats in network traffic patterns.',
    features: [
      'Anomaly detection in network traffic',
      'Real-time monitoring',
      'Security threat identification'
    ],
    technologies: {
      languages: ['Python'],
      frameworks: ['Machine Learning']
    },
    challenges: null,
    images: []
  }
];

export const getProjectById = (id) => {
  return projectsData.find(project => project.id === id);
};

export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured);
};

export const getProjectsByCategory = (category) => {
  return projectsData.filter(project => project.category === category);
};
