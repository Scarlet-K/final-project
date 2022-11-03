# Memento

A web application for nostalgics who want to save and revisit meaningful moments.

[Click to try Memento!](https://memento.sangahkim.com/)

## Inspiration
In my closet, there is a shelf dedicated to diaries I've collected over the years.  
Writing in my diary taught me how to organize my thoughts, self-reflect, and celebrate small victories.  
I created this app in hopes that more people will enjoy its benefits.

## Preview  
<img src=https://github.com/Scarlet-K/final-project/blob/main/create.gif width="80%" height="60%"/>  

<img src=https://github.com/Scarlet-K/final-project/blob/main/editanddelete.gif width="80%" height="60%"/>  

## Technologies
- HTML5   
- CSS3   
- JavaScript  
- React  
- Fetch  
- Node.js  
- Express  
- PostgreSQL  
- DbDesigner  
- Webpack  
- Babel  
- Bootstrap 5  
- Google Maps API

## Current Features
- Users can upload a file
- Users can search for the venue using autocomplete and geolocation  
- Users can create an entry 
- Users can see a list of their entries
- Users can see the full details of a selected entry 
- Users can edit their entry 
- Users can delete their entry

## Upcoming Features  
- Users can mark an entry as a "milestone"  
- Users can see a list of just their "milestones"  
- Users can choose to order their entries from oldest/newest

## System Requirements
- Node.js 10 or higher  
- PostgreSQL

## Get Started
1. Clone the repository.

    ```shell
    git clone https://github.com/Scarlet-K/final-project.git  
    ```

2. Install all dependencies with NPM.

    ```shell
    npm install
    ```

3. Create your own `.env` with appropriate API keys following the `.env.example`.

    ```shell
    cp .env.example .env
    ```

4. Create a new database.

    ```shell
    createdb memento
    ```

5. Import the provided schema.sql and data.sql from the command line.

    ```shell
    npm run db:import
    ```
    
6. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
    
