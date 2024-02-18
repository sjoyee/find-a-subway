Link: https://sjoyee.github.io/find-a-subway/

<img width="1510" alt="frontend-screenshot" src="https://github.com/sjoyee/find-a-subway/assets/62273041/c4d39af2-968e-4f5b-bdd6-94eea1748681">

Note: Please wait for a while for the red markers to load on your screen.

## Functionality
### Front-End - React (JavaScript)
1. Visualise the subway outlets using Google Maps JavaScript API.
2. Interactive with the marker to display the store information scraped from the Subway website.
3. Display a 5KM radius catchment around each outlet on the map.

### Back-End - Django (Python)
1. Store scraped data into the database.
2. Implement the REST API to serve the subway outlets scraped and stored in the database.
3. API: https://find-a-subway.vercel.app/api/v1/subway-outlets

### Data Scraping and Storing (PostgreSQL, Selenium, BeautifulSoup4)
1. Code resides in subway_scrape.py which both scrape and store the names, addresses, operating hours, waze link of outlets into a PostgreSQL database.
2. Use Selenium to simulate user interaction which inputs "kuala lumpur" in the search field.

## How to setup for development
### Front-End
1. ```cd subway_frontend```
2. ```npm install```
3. ```npm run start```

### Back-End
1. ```pip install -r requirements.txt```
2. ```python manage.py runserver```

### Root .env variables
1. DB_NAME={database name}
2. DB_USER={database user}
3. DB_HOST={database host}
4. DB_PASSWORD={database password}
5. DB_PORT=5432
6. DJANGO_SECRET_KEY={django secret key}

### Front-End .env variables
1. REACT_APP_API_URL=https://find-a-subway.vercel.app
2. REACT_APP_GOOGLE_MAP_API_KEY={google map api key}

## Reference
https://subway.com.my/find-a-subway


