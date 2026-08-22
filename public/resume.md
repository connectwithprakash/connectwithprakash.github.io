# Prakash Chaudhary

<div class="document-contact">
  <span>Fort Worth, TX · <a href="mailto:connectwithprakash@gmail.com">connectwithprakash@gmail.com</a> · <a href="https://connectwithprakash.com">connectwithprakash.com</a></span><br />
  <span><a href="https://www.linkedin.com/in/connectwithprakash/">linkedin.com/in/connectwithprakash</a> · <a href="https://github.com/connectwithprakash/">github.com/connectwithprakash</a></span>
</div>


---

## Summary

Machine Learning Engineer with over 5 years of experience designing and deploying scalable end-to-end ML models, with expertise in building AI agents leveraging human-in-the-loop automation to drive measurable business impact.


---

## Industry Experience

### Fetch | Remote (AI Labs)
<div class="document-entry-row">
  <span class="document-entry-title"><strong>Senior Machine Learning Engineer</strong></span>
  <span class="document-entry-date">May 2024 - Present</span>
</div>

- Built and shipped **AI Shopping Assistant** serving a **200K-user experiment** -- a Python/LangGraph agent with product card integration with shoppable product cards (catalog search, web search, 4.2M normalized images at 18x cost efficiency), episode-based conversation history (DynamoDB + S3), and production observability (Opik, OpenTelemetry, Grafana), deployed on AWS ECS Fargate
- Built **end-to-end LLM evaluation system** -- a continuous improvement loop connecting offline evaluation (golden dataset), online monitoring (production traces), and human annotation (judge calibration), with **CI/CD deploy gating** that blocks releases on quality regression
- **Led Multi-Agent Matching Framework**: cross-functional team of 4 engineers; improved match rates by **3.1-3.3 percentage points** (73.8%→76.9%) unlocking **$165M in GMV**; achieved **15% full automation** with **LLM-as-a-Judge guardrails** at **97% accuracy**, automating **50+ hours of manual operations to 2 minutes**
- Developed **3-agent annotation workflow** using **LangGraph** with **LLM annotation** at **80%+ accuracy** to reduce double-annotation to single annotator, cutting total annotation workload by **40%** while maintaining dataset quality through human tie-breaking on disagreements
- **Fully automated RAG pipeline** to flag incorrect product matches at **95% recall**, protecting **~$800K in GMV annually**; replaced manual workflow, reducing daily effort from **8 hours to 15 minutes** and **saving 40 hours weekly**

### Fusemachines Nepal | Kathmandu, Nepal
<div class="document-entry-row">
  <span class="document-entry-title"><strong>Machine Learning Engineer</strong></span>
  <span class="document-entry-date">Feb 2020 - May 2022</span>
</div>

- Developed **multimodal contrastive learning pipeline** combining image and time-series data for sales forecasting of new products without historical data
- Led efforts to build an ensemble model to classify fashion products into Kate Spade's four customer segments using computer vision and scipy optimize, achieving **62% accuracy**
- Developed an in-house recommendation system using **Factorization Machine** model, AWS EC2 and Lambda, achieving ranking metrics comparable to AWS's recommendation engine
- Implemented **Multi-Quantile RNN-based** sales forecasting model for Coach fashion, reducing stock outs by **30%**


---

## Academic Experience

### NASA-IMPACT | Huntsville, AL
<div class="document-entry-row">
  <span class="document-entry-title"><strong>Graduate Research Assistant</strong></span>
  <span class="document-entry-date">Aug 2022 - May 2024</span>
</div>

- Developed a hierarchical document classification baseline model for Earth Science, achieving **46% exact match accuracy** across three hierarchical levels, enhancing document organization and retrieval

### Fusemachines Nepal | Kathmandu, Nepal
<div class="document-entry-row">
  <span class="document-entry-title"><strong>Lecturer &amp; Teaching Assistant</strong></span>
  <span class="document-entry-date">Mar 2022 - Mar 2024</span>
</div>

- Taught **50+ students** in Data Science, covering Python, Git, REST API, SQL, LLM, and MLOps as part of the AI Fellowship Latin America 2023
- Taught Computer Vision as a lecturer and assisted with Machine Learning and Deep Learning courses as a Teaching Assistant for the AI Fellowship Nepal in 2022


---

## Education

### University of Alabama in Huntsville | Huntsville, AL
<div class="document-entry-row">
  <span class="document-entry-title"><strong>Master of Science in Computer Science (Thesis)</strong></span>
  <span class="document-entry-date">Aug 2022 - May 2024</span>
</div>
**GPA:** 4.0

- **Relevant Courses:** Deep Learning, Survey AI, Algorithm, Big Data Computing, Software Engineering
- **Awards:** Phi Kappa Phi Honor Society

### MITx on edX | Online
<div class="document-entry-row">
  <span class="document-entry-title"><strong>MicroMasters in Statistics and Data Science</strong></span>
  <span class="document-entry-date">May 2020 - Aug 2021</span>
</div>
**Grade:** B

- **Relevant Courses:** Probability, Statistics, Machine Learning, Data Analysis


---

## Projects

<h3 class="document-entry-row">
  <span class="document-entry-title"><a href="https://lazyflow.netlify.app">Lazyflow - Calendar-First Todo App</a></span>
  <span class="document-entry-date">Dec 2025 - Present</span>
</h3>
*A free, open-source iOS app that bridges task management with calendar scheduling, featuring on-device AI.*

- Built and published a native **SwiftUI** iOS app on **App Store** with full Apple ecosystem support (Watch, Widgets, Dynamic Island, Siri Shortcuts) and on-device **Apple Intelligence** for smart task suggestions while maintaining privacy with local-first data storage

<h3 class="document-entry-row">
  <span class="document-entry-title"><a href="https://github.com/connectwithprakash/diskard">diskard - Developer-Aware Disk Cleanup</a></span>
  <span class="document-entry-date">Feb 2026 - Present</span>
</h3>
*An open-source Rust CLI/TUI tool that scans for reclaimable disk space from build caches, AI models, and dev tools.*

- Built a parallel scanner with **18 recognizers** and interactive **ratatui TUI** with drill-down inspection, disk visualization, and safe trash-based cleanup; published on **crates.io** and **Homebrew**

<h3 class="document-entry-row">
  <span class="document-entry-title"><a href="https://github.com/NASA-IMPACT/ml_spectroscopy">Spectral Unmixing using Machine Learning</a></span>
  <span class="document-entry-date">Mar 2023 - Oct 2023</span>
</h3>
*A ML system for material characterization using spectral signal from Infrared (IR) spectroscopy.*

- Developed an ML pipeline, including signal processing, feature engineering, and a multi-label neural network model, achieving over **95% F1 score** for predicting material composition from spectral signatures across diverse datasets


---

## Technical Skills

**LLM & Agentic AI:** LangGraph, LangChain, RAG, Multi-Agent Systems, Fine-Tuning (LoRA), RLHF, Prompt Engineering (Chain-of-Thought, ReAct), LLM-as-a-Judge Evaluation, Embeddings & Vector Search

**ML/AI:** Computer Vision, NLP, Time Series Forecasting, Recommendation Systems, Statistical Modeling

**Frameworks & Tools:** PyTorch, TensorFlow, Hugging Face Transformers, Distributed Training (DDP), Docker, Kubernetes

**LLM Ops:** Opik, Langfuse, DeepEval, OpenTelemetry, Model Serving (TorchServe, Ollama), Quantization

**Infrastructure:** AWS (SageMaker, EC2, Lambda, S3, DynamoDB), Apache Spark, Kafka, Snowflake, Vector DBs (FAISS, Pinecone, Chroma), FastAPI, MCP

**Programming:** Python, Rust, Go, C++, SQL
