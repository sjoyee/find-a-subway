import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'subway_backend.settings'

import django
django.setup()

from outlets.models import Outlets
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def scrape_subway_outlets():
    # use selenium webdriver to simulate a user searching for subway outlets in kuala lumpur
    driver = webdriver.Chrome()
    driver.get('https://subway.com.my/find-a-subway')

    # find the input field and type in kuala lumpur
    input_field = driver.find_element(By.ID, 'fp_searchAddress')
    input_field.send_keys('kuala lumpur')

    # click the search button
    search_button = driver.find_element(By.ID, 'fp_searchAddressBtn')
    search_button.click()

    # wait for the page to load
    time.sleep(5)

    html_content = driver.page_source

    main_soup = BeautifulSoup(html_content, 'html.parser')

    # find all the displayed subway store items on the page 
    displayed_location_list = main_soup.find_all('div', class_='fp_listitem', style=lambda value: value and 'display: none;' not in value)

    # get the name, address, operating hour and waze link for each store
    for i in range(len(displayed_location_list)):
        location_left_div = displayed_location_list[i].find('div', class_='location_left')
        infobox_content = location_left_div.find('div', class_='infoboxcontent')
        location_right_div = displayed_location_list[i].find('div', class_='location_right')
        
        name = location_left_div.find('h4').text.strip()
        address = infobox_content.find_all('p')[0].text.strip()
        
        # Extract all the days
        operating_hours = []
        for p_tag in infobox_content.find_all('p'):
            if 'Monday' in p_tag.text or 'Tuesday' in p_tag.text or 'Wednesday' in p_tag.text or 'Thursday' in p_tag.text or 'Friday' in p_tag.text or 'Saturday' in p_tag.text or 'Sunday' in p_tag.text:
                operating_hours.append(p_tag.text.strip())
        
        operating_hour = '\n'.join(operating_hours)
        waze_link = location_right_div.find('div', class_='directionButton').find_all('a')[1]['href'].strip()
        
        # get the longitude and latitude of the store
        longitude = displayed_location_list[i]['data-longitude']
        latitude = displayed_location_list[i]['data-latitude']
        
        outlet = Outlets(name=name, address=address, operating_hour=operating_hour, waze_link=waze_link, longitude=longitude, latitude=latitude)
        outlet.save()
    
    driver.quit()
    
if __name__ == '__main__':
    scrape_subway_outlets()
    
    




    
    


    
    
    
    
