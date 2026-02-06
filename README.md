# Project NEXUS
### An AI-Powered powerful Web Platform 

>*Where AI meets everyday campus life*

Project Nexus is a **web-based AI-powered campus super app** developed for **AI Fusion Hackathon 2026**.  
The project focuses on intelligently processing daily campus information—emails, events, deadlines, and student feedback—to reduce cognitive load and improve decision-making for students.

Instead of building multiple incomplete modules, this implementation prioritizes a **single, well-functioning AI-centric solution** aligned with the **Daily Pulse** pillar of the Project Nexus problem statement.

---

> **Table of Contents**
- [Problem Statement](#-problem-statement)
- [Project Scope](#-project-scope)
- [Implemented Frontend Features](#-implemented-frontend-features)
- [System Architecture](#-system-architecture-planned)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Working Features Overview](#-working-features-overview)
- [Feature-Wise Explanation](#-feature-wise-explanation)
- [Code Structure](#-code-structure)
- [Future Enhancements](#-future-enhancements)
- [Team](#-team)
- [Conclusion](#-conclusion)
- [Acknowledgements](#-acknowledgements)

---

## Problem Statement 💡

To build a unified, full-stack “Campus Super-App” that integrates the chaotic fragments of college life into a single, seamless cockpit. The challenge is to create an intelligent, interconnected platform that leverages modern development practices and AI/ML capabilities to transform how students experience campus life

Campus life information is scattered across emails, portals, notice boards, and informal channels. Students frequently miss important updates related to academics, daily utilities, and campus activities due to the lack of a unified, intuitive system.
Existing solutions digitize individual services but fail to integrate them into a cohesive experience.

---

##  Project Scope

This submission implements the **Daily Pulse** core pillar of Project Nexus as a fully functional web platform with backend and AI integration.

The system converts **unstructured campus information** into **clear, actionable insights** using Machine Learning and Natural Language Processing.

### Implemented Capabilities:
- AI-powered email summarization
- Automatic extraction of deadlines and events
- Sentiment analysis of student feedback
- Centralized dashboard displaying all AI outputs

---

## Implemented Modules (Daily Pulse)

### 📨 AI Mail Summarizer
- Processes long institutional emails
- Generates concise academic summaries
- Flags urgency based on content

### 📅 Event & Deadline Extractor
- Extracts dates, times, and events from text
- Categorizes items as **Deadlines** or **Events**
- Uses NER principles via pattern recognition

### 🎙 Voice AI – Sentiment Analysis
- Analyzes student feedback text
- Classifies sentiment as positive, negative, or toxic
- Returns confidence scores to frontend

### 🍽 Live Mess Menu
- Displays daily mess menu
- Structured UI module integrated into dashboard

---

## System Architecture

```text
User (Web Browser)
        ↓
Frontend (Next.js + TypeScript)
        ↓   Axios (HTTP Requests)
Backend (FastAPI - Python)
        ↓
AI / ML Modules
(Summarization, NER, Sentiment Analysis)
```

---

## AI / ML Components

### 1. Mail Summarizer (AI-powered)
- Custom heuristic-based summarization engine
- Sentence scoring using keyword density
- Urgency detection based on contextual keywords

### 2. Event & Deadline Extractor
- Regex-based Named Entity Recognition (NER)
- Detects:
  - Dates
  - Days
  - Times
- Context-aware classification into events or deadlines

### 3. Sentiment Analysis (Voice AI Module)
- Implemented using **VADER Sentiment Analyzer (NLTK)**
- Generates compound sentiment scores
- Identifies negative or toxic feedback patterns

All AI modules are exposed via backend APIs and consumed by the frontend in real time.

---

##  Tech Stack

| Layer | Technology | Purpose |
|-----|-----------|--------|
| Frontend Framework | **Next.js 15** | React-based framework using the App Router for fast, scalable, and modern web development |
| Language (Frontend) | **TypeScript** | Provides type safety, better maintainability, and fewer runtime errors |
| Styling | **Tailwind CSS** | Utility-first CSS framework for rapid, responsive, and clean UI design |
| State Management | **React Hooks** (`useState`, `useEffect`) | Manages component state, API responses, loading indicators, and dynamic UI updates |
| HTTP Client | **Axios** | Handles communication between frontend and backend using REST APIs |
| Backend Framework | **FastAPI (Python)** | High-performance backend framework optimized for AI/ML workloads |
| API Architecture | **REST API** | Enables structured communication between frontend dashboard and backend services |
| AI / NLP | **NLTK (VADER Sentiment Analyzer)** | Performs sentiment analysis to classify text as positive, negative, or toxic |
| Text Processing | **Heuristic Engine (Python)** | Custom logic for email summarization using keyword scoring |
| Information Extraction | **Regex-based NER** | Extracts deadlines, dates, and event-related information from text |
| Data Format | **JSON** | Standardized format for frontend–backend data exchange |
| Development Tools | **Git & GitHub** | Version control and collaborative development |

---

## Getting Started 
**Prerequisites**
Web browser

**Clone Repository**
git clone https://github.com/tavdashi/AIFusion.git
cd project-nexus

***Run Frontend**
npm install
npm start

---

## Working Features Overview

| Feature | Status | Backend | AI Used |
|------|------|--------|--------|
| Mail Summarizer | ✅ Working | FastAPI | Heuristic NLP |
| Deadline Extractor | ✅ Working | FastAPI | Regex-based NER |
| Sentiment Analysis | ✅ Working | FastAPI | VADER (NLTK) |
| Live Mess Menu | ✅ Working | FastAPI | — |
| Unified Dashboard | ✅ Working | Next.js | — |

---

## Feature-Wise Explanation
**Mail Summarizer (Frontend Demo)**

**Purpose:**
To present a clean interface where institutional emails can be summarized into short action items.

**Current Implementation:**
Email input UI
Summary output placeholder
Category tags (Academic / Event / Urgent)
Planned Enhancement:
NLP-based summarization
Priority and deadline extraction using AI

---

## Live Mess Menu (Frontend Demo)
**Purpose:**
Display daily mess menu information in a centralized, accessible format.

**Current Implementation:**
Menu layout
Meal categories
Static/demo data rendering

---

## Code Structure

```text
project-nexus/
│
├── frontend/                  # Frontend web application
│   │
│   ├── public/                # Static public assets
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   │
│   │   ├── assets/            # Images, icons, screenshots
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── screenshots/
│   │   │
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   ├── pages/             # Feature-specific pages
│   │   │   ├── Dashboard.jsx          # Daily Pulse
│   │   │   ├── MessMenu.jsx            # Live Mess Menu
│   │   │   ├── MailSummarizer.jsx      # Mail Summarizer UI
│   │   │   ├── LostAndFound.jsx        # Lost & Found
│   │   │   ├── Marketplace.jsx         # Buy/Sell Marketplace
│   │   │   ├── TravelShare.jsx         # Cab Pool
│   │   │   ├── Explorer.jsx            # Nearby Hub
│   │   │   ├── Timetable.jsx           # Academic Timetable
│   │   │   └── LMS.jsx                 # LMS Lite
│   │   │
│   │   ├── data/              # Static / demo data
│   │   │   ├── messMenu.json
│   │   │   ├── emails.json
│   │   │   ├── marketplace.json
│   │   │   └── places.json
│   │   │
│   │   ├── routes/            # Frontend routing
│   │   │   └── AppRoutes.jsx
│   │   │
│   │   ├── styles/            # Global and component styles
│   │   │   ├── global.css
│   │   │   └── variables.css
│   │   │
│   │   ├── utils/             # Helper functions
│   │   │   ├── formatDate.js
│   │   │   └── constants.js
│   │   │
│   │   ├── App.jsx             # Root React component
│   │   └── main.jsx            # Application entry point
│   │
│   └── package.json
│
├── demo/                      # Demo artifacts
│   └── frontend-demo.mp4      # Screen recording of working frontend
│
├── docs/                      
│   └── screenshots/
│
├── README.md
└── .gitignore
```

## Future Enhancements
>Backend API integration

>AI-powered mail summarization

>Recommendation systems

>Authentication & role management

>Real-time updates and notifications

---

## Team
>Name – Frontend Development

>Name – UI/UX Design

>Name – System Architecture

---

## Conclusion

Project Nexus demonstrates a focused, AI-first implementation of the **Daily Pulse** pillar of the Campus Super App vision.

By prioritizing a **fully functional backend and meaningful ML integration**, the project aligns with the Project Nexus philosophy of building **intelligent systems rather than feature-heavy prototypes**.

The platform successfully converts raw campus data into structured, actionable insights through real-time AI processing.

---

## Acknowledgements
>AI Fusion Hackathon 2026 – IIT Ropar

>Advitiya Fest Team

>Open-source UI inspirations and tools
