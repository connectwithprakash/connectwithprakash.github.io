# Prakash Chaudhary

**Location:** Fort Worth, TX
**Email:** connectwithprakash@gmail.com
**Website:** [connectwithprakash.com](https://connectwithprakash.com)
**LinkedIn:** [linkedin.com/in/connectwithprakash](https://www.linkedin.com/in/connectwithprakash/)
**GitHub:** [github.com/connectwithprakash](https://github.com/connectwithprakash/)

---

## Summary

Machine Learning Engineer with over 5 years of experience designing and deploying scalable end-to-end ML models, with expertise in building AI agents leveraging human-in-the-loop automation to drive measurable business impact.

---

## Industry Experience

### Fetch | Remote (AI Labs)
**Senior Machine Learning Engineer** | Jul 2026 - Present
**Machine Learning Engineer II** | Jan 2026 - Jun 2026
**Machine Learning Engineer** | May 2024 - Dec 2025

- Built and shipped **AI Shopping Assistant** serving a **200K-user experiment** -- a Python/LangGraph agent with product card integration with shoppable product cards (catalog search, web search, 4.2M normalized images at 18x cost efficiency), episode-based conversation history (DynamoDB + S3), and production observability (Opik, OpenTelemetry, Grafana), deployed on AWS ECS Fargate
- Built **end-to-end LLM evaluation system** -- a continuous improvement loop connecting offline evaluation (golden dataset), online monitoring (production traces), and human annotation (judge calibration), with **CI/CD deploy gating** that blocks releases on quality regression
- **Led Multi-Agent Matching Framework**: cross-functional team of 4 engineers; improved match rates by **3.1-3.3 percentage points** (73.8%→76.9%) unlocking **$165M in GMV**; achieved **15% full automation** with **LLM-as-a-Judge guardrails** at **97% accuracy**, automating **50+ hours of manual operations to 2 minutes**
- Developed **3-agent annotation workflow** using **LangGraph** with **LLM annotation** at **80%+ accuracy** to reduce double-annotation to single annotator, cutting total annotation workload by **40%** while maintaining dataset quality through human tie-breaking on disagreements
- **Fully automated RAG pipeline** to flag incorrect product matches at **95% recall**, protecting **~$800K in GMV annually**; replaced manual workflow, reducing daily effort from **8 hours to 15 minutes** and **saving 40 hours weekly**

### Fusemachines Inc. | New York City, NY
**Machine Learning Engineer** | Feb 2020 - May 2022

- Developed **multimodal contrastive learning pipeline** combining image and time-series data for sales forecasting of new products without historical data
- Led efforts to build an ensemble model to classify fashion products into Kate Spade's four customer segments using computer vision and scipy optimize, achieving **62% accuracy**
- Developed an in-house recommendation system using **Factorization Machine** model, AWS EC2 and Lambda, achieving ranking metrics comparable to AWS's recommendation engine
- Implemented **Multi-Quantile RNN-based** sales forecasting model for Coach fashion, reducing stock outs by **30%**

---

## Academic Experience

### NASA-IMPACT | Huntsville, AL
**Graduate Research Assistant** | Aug 2022 - May 2024

- Developed a hierarchical document classification baseline model for Earth Science, achieving **46% exact match accuracy** across three hierarchical levels, enhancing document organization and retrieval

### Fusemachines Inc. | New York City, NY
**Lecturer & Teaching Assistant** | Mar 2022 - Mar 2024

- Taught **50+ students** in Data Science, covering Python, Git, REST API, SQL, LLM, and MLOps as part of the AI Fellowship Latin America 2023
- Taught Computer Vision as a lecturer and assisted with Machine Learning and Deep Learning courses as a Teaching Assistant for the AI Fellowship Nepal in 2022

### Robotics Club, Pulchowk Campus | Tribhuvan University, Nepal
**Robotics Team Member** | 2016 - 2019

- Competed in **ABU Robocon**, Asia-Pacific's premier international robotics competition (12-14 countries), for 3 consecutive years
- Won **ROHM Award (2019, Mongolia)** for innovative four-legged robot design and **Best Shuttlecock Award (2018, Vietnam)** for autonomous shuttlecock-throwing robot
- Developed **control algorithms**, **kinematics**, and **navigation** using **ARM microcontrollers** with **multi-modal sensors** (IR, accelerometer, gyrometer, compass)

---

## Education

### University of Alabama in Huntsville | Huntsville, AL
**Master of Science in Computer Science (Thesis)** | Aug 2022 - May 2024
**GPA:** 4.0

- **Relevant Courses:** Deep Learning, Survey AI, Algorithm, Big Data Computing, Software Engineering
- **Awards:** Phi Kappa Phi Honor Society

### MITx on edX | Online
**MicroMasters in Statistics and Data Science** | May 2020 - Aug 2021
**Grade:** B

- **Relevant Courses:** Probability, Statistics, Machine Learning, Data Analysis

---

## Projects

### [Lazyflow - Calendar-First Todo App](https://lazyflow.netlify.app) | Dec 2025 - Present
*A free, open-source iOS app that bridges task management with calendar scheduling, featuring on-device AI.*

- Built and published a native **SwiftUI** iOS app on **App Store** with full Apple ecosystem support (Watch, Widgets, Dynamic Island, Siri Shortcuts) and on-device **Apple Intelligence** for smart task suggestions while maintaining privacy with local-first data storage

### [diskard - Developer-Aware Disk Cleanup](https://github.com/connectwithprakash/diskard) | Feb 2026 - Present
*An open-source Rust CLI/TUI tool that scans for reclaimable disk space from build caches, AI models, and dev tools.*

- Built a parallel scanner with **18 recognizers** and interactive **ratatui TUI** with drill-down inspection, disk visualization, and safe trash-based cleanup; published on **crates.io** and **Homebrew**

### [Spectral Unmixing using Machine Learning](https://github.com/NASA-IMPACT/ml_spectroscopy) | Mar 2023 - Oct 2023
*A ML system for material characterization using spectral signal from Infrared (IR) spectroscopy.*

- Developed an ML pipeline, including signal processing, feature engineering, and a multi-label neural network model, achieving over **95% F1 score** for predicting material composition from spectral signatures across diverse datasets

### [Foxhound Security Solution](https://github.com/kaushu42/foxhound-security-solution) | Nov 2019 - Feb 2020
*SaaS-based user's behavior anomaly detection and network event log analyzer built using distributed ML.*

- Designed and developed an end-to-end continual machine learning system for anomaly detection and reasoning using Apache Spark for ETL and data analysis, an AutoEncoder architecture, and statistical analysis

### [Sound Source Localization](https://github.com/subash-timilsina/Sound-Source-Localization) | Dec 2018 - Aug 2019
*An 8-microphone cubical mesh that records the azimuth and elevation of an incoming sound source.*

- Constructed a localization system using C++ with the GCC-PHAT algorithm and microphone mesh, and created denoising AutoEncoder model using Keras to denoise speech and achieved **MAE of 1.5 degree** in 3D localization

---

## Technical Skills

**LLM & Agentic AI:** LangGraph, LangChain, RAG, Multi-Agent Systems, Fine-Tuning (LoRA), RLHF, Prompt Engineering (Chain-of-Thought, ReAct), LLM-as-a-Judge Evaluation, Embeddings & Vector Search

**ML/AI:** Computer Vision, NLP, Time Series Forecasting, Recommendation Systems, Statistical Modeling

**Frameworks & Tools:** PyTorch, TensorFlow, Hugging Face Transformers, Distributed Training (DDP), Docker, Kubernetes

**LLM Ops:** Opik, Langfuse, DeepEval, OpenTelemetry, Model Serving (TorchServe, Ollama), Quantization

**Infrastructure:** AWS (SageMaker, EC2, Lambda, S3, DynamoDB), Apache Spark, Kafka, Snowflake, Vector DBs (FAISS, Pinecone, Chroma), FastAPI, MCP

**Programming:** Python, Rust, Go, C++, SQL
