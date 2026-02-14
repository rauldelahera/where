# Where Did I Leave It?

A web app for tracking your stuff on a map. Built in 2 weeks as our final project at Makers Academy.

## The Problem

Ever spent 20 minutes looking for your keys? Or forgotten which car park you left your car in? We built this to help with that universal "where did I put that thing?" moment.

## What It Does

Drop pins on a map to remember where you left things. Add photos, search by name, and for vehicles - just enter the license plate and it pulls MOT date, tax status, and emissions data from the UK DVLA API.

**Features:**
- Google Maps integration with location pins
- Image uploads (stored on AWS S3)
- UK vehicle data lookup via DVLA API (MOT expiry, road tax, CO2 emissions, make/color)
- User authentication with JWT
- Search and filter your items

## Tech Stack

**Frontend:** React, React Router, Google Maps API, Google Places Autocomplete, Bootstrap  
**Backend:** Java Spring Boot, Spring Security (JWT), JPA/Hibernate, PostgreSQL  
**Cloud:** AWS S3 for image storage  
**APIs:** Google Maps JavaScript API, UK DVLA Vehicle Enquiry Service

## Running Locally

**Backend:**
```bash
cd backend
# Configure application.properties with your database and AWS credentials
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

The app runs on `localhost:8081` (frontend) and `localhost:8080` (backend).

## Team RuntimeTerror

Built by Max, Rumen, Jack, and Raúl during our Makers Academy bootcamp (December 2021).

This was our first time working with Spring Boot, AWS, and external APIs. The hardest part was syncing the Google Maps markers with the database state - we went through a few iterations before getting it right.
