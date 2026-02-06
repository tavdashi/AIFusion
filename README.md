# AIFusion
# 🚀 Project Nexus 
> **AI-Powered Campus Intelligence System**

![Project Nexus Banner](https://via.placeholder.com/1000x300?text=Project+Nexus+Banner)
*(Replace this link with a screenshot of your dashboard later)*

## 📖 Overview
**Project Nexus** is a Full-Stack "Super App" designed to streamline campus life. It consolidates scattered information—like mess menus, long emails, and student feedback—into a single, intelligent dashboard powered by Python-based AI.

Built for the **[AI Fusion]**, this project demonstrates the integration of **Real-time Data**, **Natural Language Processing (NLP)**, and **Machine Learning** to solve daily student problems.

---

## 🌟 Key Features (4 Intelligent Modules)

### 1. 🍽️ Live Mess Menu
* **What it does:** Fetches and displays the daily breakfast, lunch, and dinner menu with ratings.
* **Tech:** REST API (FastAPI) serving real-time JSON data.

### 2. 🤖 AI Mail Summarizer (Priority Engine)
* **What it does:** Compresses long, boring emails into one-line action items.
* **Intelligence:** Auto-detects **Urgency** (e.g., "5 PM Deadline") and flags it with a **Red Alert card**. Uses a keyword-density heuristic engine.

### 3. 📢 Campus Voice AI (Sentiment Analysis)
* **What it does:** Analyzes student complaints/feedback to detect emotional tone.
* **Intelligence:** Uses **VADER (Valence Aware Dictionary and sEntiment Reasoner)** Machine Learning to score feedback as **Positive 😊**, **Negative 😡**, or **Toxic ⚠️**.

### 4. 📅 Event & Deadline Extractor
* **What it does:** Scans unstructured text to isolate specific dates and events.
* **Intelligence:** Uses **Regex-based Named Entity Recognition (NER)** to separate "Submission Deadlines" from "General Events."

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 15** | React Framework with App Router |
| **Language** | **TypeScript** | For type-safe, scalable code |
| **Styling** | **Tailwind CSS** | Utility-first responsive design |
| **Backend** | **Python (FastAPI)** | High-performance API framework |
| **AI Logic** | **VADER / NLTK** | Sentiment Analysis Library |
| **Networking** | **Axios** | HTTP Client for API communication |

---

## 🚀 Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v18+)
* Python (v3.9+)

### 1. Clone the Repository
```bash
git clone [https://github.com/tavdashi/AIFusion.git](https://github.com/tavdashi/AIFusion.git)
cd AIFusion
