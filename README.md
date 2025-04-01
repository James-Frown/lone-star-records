# One Star Records CRM Project

## Project Title
One Star Records Customer Relationship Management System

## Purpose
This project builds a lightweight web application to manage artists, songs, and appearances for a fictional record label, "One Star Records." It serves as a hands-on learning exercise to develop Python and Django skills, specifically targeting transferable expertise for a tenant management system role at Good People Data Company.

## Technologies
- **Backend**: Python, Django
- **Frontend**: React
- **Database**: SQLite

## Duration
- **Timeline**: 2 weeks (14 days, approximately 40-50 hours, 3-4 hours/day)
- **Date Started**: March 31, 2025

## Key Data Fields
- **Artist**: 
  - `name` (string)
  - `bio` (text)
  - `artist_fee` (decimal)
  - `is_active` (boolean)
  - `start_date` (date)
  - `end_date` (date, nullable)
- **Song**: 
  - `title` (string)
  - `artist` (foreign key to Artist)
  - `release_date` (date)
  - `plays` (integer)
- **Appearance**: 
  - `date` (datetime)
  - `location` (string)
  - `artist` (foreign key to Artist)

---

## Project Overview

### Goal
Create a functional CRM to add, view, update, and delete artists, songs, and appearances, featuring admin login and RESTful APIs.

### Features
- Manage artist details, including fees and active status.
- Track song plays and release dates.
- Schedule and view upcoming appearances.

### Learning Objectives
- Master database modeling and relationships (applicable to tenant-property links).
- Build REST APIs for data management (relevant to tenant data retrieval).
- Implement authentication (essential for secure tenant access).

---

## Two-Week Timeline

### Week 1: Backend Setup (Days 1-7)
- **Day 1: Project Setup (3-4 hours)**  
  - Install Python, Node.js, npm.
  - Create folder `one-star-records`, set up virtual environment (`python -m venv venv`), activate it.
  - Install Django (`pip install django`) and Django REST Framework (`pip install djangorestframework`).
  - Run `django-admin startproject onestarrecords`, then `python manage.py startapp crm`.
  - Add `'crm'` and `'rest_framework'` to `INSTALLED_APPS` in `settings.py`.

- **Day 2: Database Models (3-4 hours)**  
  - Define models in `crm/models.py`:
    - `Artist`: `name`, `bio`, `artist_fee` (DecimalField, max_digits=10, decimal_places=2), `is_active` (BooleanField, default=True), `start_date`, `end_date` (null=True).
    - `Song`: `title`, `artist` (ForeignKey), `release_date`, `plays` (IntegerField, default=0).
    - `Appearance`: `date`, `location`, `artist` (ForeignKey).
  - **Challenge**: Nullable `end_date` logic.  
    - **Solution**: Add `def is_currently_active(self): return self.is_active and (self.end_date is None or self.end_date > date.today())`.
  - Run `python manage.py makemigrations` and `python manage.py migrate`.

- **Day 3: Admin Interface (2-3 hours)**  
  - Register models in `crm/admin.py`.
  - Customize `Artist` admin with `list_display = ['name', 'artist_fee', 'is_active', 'start_date', 'end_date']`.
  - Create superuser (`python manage.py createsuperuser`) and test at `http://localhost:8000/admin`.

- **Day 4: REST APIs - Part 1 (3-4 hours)**  
  - Create serializers in `crm/serializers.py` (e.g., `fields = ['name', 'bio', 'artist_fee', 'is_active', 'start_date', 'end_date']` for `Artist`).
  - Start API views in `crm/views.py` using `generics.ListCreateAPIView`.
  - Test with Postman.

- **Day 5: REST APIs - Part 2 (3-4 hours)**  
  - Finish views with `generics.RetrieveUpdateDestroyAPIView`.
  - **Challenge**: Filter active artists.  
    - **Solution**: Use `queryset = Artist.objects.filter(is_active=True)` in a view.
  - Set up URLs in `crm/urls.py` (e.g., `/api/artists/`, `/api/artists/active/`).

- **Day 6: Authentication (3-4 hours)**  
  - Add `permission_classes = [IsAuthenticated]` to API views.
  - Test login requirement with Postman.

- **Day 7: Backend Polish (2-3 hours)**  
  - Test CRUD operations and new fields (e.g., `plays`, `artist_fee`).

### Week 2: Frontend and Finalization (Days 8-14)
- **Day 8: React Setup (3-4 hours)**  
  - Run `npx create-react-app frontend` in project root.
  - Install Axios (`npm install axios`).
  - Start app (`npm start`) at `http://localhost:3000`.

- **Day 9: Core Components (3-4 hours)**  
  - Create `ArtistList`, `SongList`, `AppearanceList` in `frontend/src/components/`.
  - Use `useState` and `useEffect` for data management.

- **Day 10: API Integration (3-4 hours)**  
  - Create `api.js` in `frontend/src` for Axios calls.
  - **Challenge**: CORS issues.  
    - **Solution**: Install `pip install django-cors-headers`, add to `INSTALLED_APPS`, set `CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]` in `settings.py`.

- **Day 11: CRUD Functionality (3-4 hours)**  
  - Add forms for CRUD (include `artist_fee`, `plays`).
  - **Challenge**: Show artist status.  
    - **Solution**: Use `{artist.is_active && !artist.end_date ? "Active" : "Inactive"}` in React.

- **Day 12: Styling (2-3 hours)**  
  - Use Tailwind CSS via CDN for tables (display `artist_fee`, `plays`).

- **Day 13: Testing (3-4 hours)**  
  - Test full app: CRUD, active/inactive artists, song plays.
  - Document one challenge (e.g., CORS fix) for interview prep.

- **Day 14: Final Prep (2-3 hours)**  
  - Build React app (`npm run build`) and serve with Django (`DEBUG = False`).
  - Format this guide and print as PDF.

---

## Key Challenges and Solutions
- **Nullable `end_date` Logic**  
  - *Problem*: Determine if an artist is currently active.  
  - *Solution*: Add a custom method to `Artist` model to check `is_active` and `end_date`.

- **Filtering Active Artists in API**  
  - *Problem*: Return only active artists in an endpoint.  
  - *Solution*: Use Django’s `filter()` in the view’s queryset.

- **CORS Issues with React-Django**  
  - *Problem*: Frontend can’t access backend APIs.  
  - *Solution*: Configure `django-cors-headers` with allowed origins.

- **Dynamic Status in Frontend**  
  - *Problem*: Display artist status clearly.  
  - *Solution*: Use conditional rendering in React based on API data.

---

## Transferable Skills for Good People Data Company
- **Database Modeling**: Managing `artist_fee`, `is_active`, and dates mirrors tenant financials and lease status.
- **REST APIs**: CRUD and filtering skills apply to tenant data management.
- **Authentication**: Securing endpoints aligns with tenant system security.
- **Project Planning**: Completing in 2 weeks demonstrates time management.

---

## Tools and Resources
- **Python**: Latest stable version (check with `python --version`).
- **Django**: Installed via pip, leverages ORM and admin interface.
- **React**: Uses hooks and Axios for frontend development.
- **Postman**: For testing APIs during development.
- **SQLite**: Default lightweight database (no setup required).

---

## Next Steps
- Test the app with sample data (e.g., 3 artists, 5 songs, 2 appearances).
- Prepare to discuss one challenge (e.g., CORS) and its solution in your interview.
- Optionally deploy locally with `npm run build` and Django static file serving.