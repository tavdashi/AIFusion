# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import re
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = FastAPI()
ai_analyzer = SentimentIntensityAnalyzer()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---
class EmailInput(BaseModel):
    subject: str
    body: str

class EmailSummary(BaseModel):
    original_subject: str
    action_item: str
    category: str
    priority_score: int
    is_urgent: bool

class FeedbackInput(BaseModel):
    text: str

class FeedbackResult(BaseModel):
    sentiment: str
    score: float
    emoji: str
    is_toxic: bool

class ExtractionResult(BaseModel):
    deadlines: List[str]
    events: List[str]

class MessMeal(BaseModel):
    meal_type: str
    menu: str
    rating: float

# --- 1. MAIL SUMMARIZER LOGIC ---
def ai_process_email(subject: str, body: str) -> dict:
    sentences = [s.strip() for s in body.split('.') if len(s.strip()) > 5]
    if not sentences:
        return {"action": "Check email for details", "category": "General", "priority_score": 1, "is_urgent": False}

    best_sentence = sentences[0]
    detected_category = "General"; is_urgent = False; priority = 1
    
    academic_words = ["exam", "deadline", "assignment", "submission"]
    urgent_words = ["immediate", "urgent", "strict", "today", "5 pm"]
    
    for sentence in sentences:
        lower = sentence.lower()
        if any(w in lower for w in academic_words): detected_category = "Academic"; priority = 8
        if any(w in lower for w in urgent_words): is_urgent = True; priority = 10; best_sentence = sentence

    final = best_sentence
    if len(final) > 75: final = " ".join(final.split()[:10]) + "..."
    return {"action": final, "category": detected_category, "priority_score": priority, "is_urgent": is_urgent}

# --- 2. NEW: DEADLINE & EVENT EXTRACTOR LOGIC ---
def extract_dates_and_events(text: str) -> dict:
    # Split text into rough sentences
    sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', text) if s]
    
    deadlines = []
    events = []

    # Regex Patterns (Ported from your JS)
    date_patterns = [
        r"\b\d{1,2}(?:st|nd|rd|th)?\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\b",
        r"\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}\b",
        r"\b\d{1,2}/\d{1,2}(?:/\d{2,4})?\b",
        r"\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b"
    ]
    time_pattern = r"\b\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)\b"
    
    deadline_keywords = ["deadline", "submit by", "submission", "due date", "due on"]
    event_keywords = ["exam", "quiz", "hackathon", "meeting", "workshop", "seminar", "fest"]

    for sentence in sentences:
        lower = sentence.lower()
        has_date = any(re.search(p, sentence, re.IGNORECASE) for p in date_patterns)
        has_time = re.search(time_pattern, sentence, re.IGNORECASE)
        
        is_deadline = any(k in lower for k in deadline_keywords)
        is_event = any(k in lower for k in event_keywords)

        if is_deadline or (has_date and "submit" in lower):
            deadlines.append(sentence)
        elif is_event or (has_date and has_time):
            events.append(sentence)

    # Remove duplicates
    return {"deadlines": list(set(deadlines)), "events": list(set(events))}

# --- Routes ---
@app.get("/api/mess-menu", response_model=List[MessMeal])
def get_mess_menu():
    return [
        {"meal_type": "Breakfast", "menu": "Aloo Paratha + Curd", "rating": 4.8},
        {"meal_type": "Lunch", "menu": "Rajma Chawal + Jeera Aloo", "rating": 4.9},
        {"meal_type": "Dinner", "menu": "Egg Curry / Paneer", "rating": 4.2},
    ]

@app.post("/api/summarize", response_model=EmailSummary)
def summarize_mail(email: EmailInput):
    res = ai_process_email(email.subject, email.body)
    return EmailSummary(original_subject=email.subject, action_item=res["action"],
                        category=res["category"], priority_score=res["priority_score"], is_urgent=res["is_urgent"])

@app.post("/api/analyze-sentiment", response_model=FeedbackResult)
def analyze_feedback(feedback: FeedbackInput):
    scores = ai_analyzer.polarity_scores(feedback.text)
    compound = scores['compound']
    sentiment = "Positive" if compound >= 0.05 else "Negative" if compound <= -0.05 else "Neutral"
    emoji = "😊" if sentiment == "Positive" else "😡" if sentiment == "Negative" else "😐"
    return {"sentiment": sentiment, "score": round(compound, 2), "emoji": emoji, "is_toxic": compound < -0.5}

@app.post("/api/extract-deadlines", response_model=ExtractionResult)
def extract_deadlines_route(email: EmailInput):
    return extract_dates_and_events(email.body)