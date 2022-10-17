## A simple REST API for scraping data from a static website
<br>

### Getting started
<hr>

1. Download this repository  
    `git clone https://github.com/marvint24/web-scraping-rest-api.git`
2. Build the docker image  
    `docker build -t web-scraping-rest-api ./web-scraping-rest-api`
3. Run your image as a container  
    `docker run -p <your-port>:5200 web-scraping-rest-api`

<br>

### Using the API
<hr>

Send a GET request to `http://<your-ip>:<your-port>/` with the following parameters:

<br>


`url`: The URL of the website to retrieve the data from.

`qS`: The querySelector of an element. You can copy this in Chromium based browsers in the DevTools.

`mode`: (optional) (default: 0) Select one of the modes:   
0 - text mode: gets the textContent value  
1 - html mode: gets the innerHTML value  
`regex`: (optional) You can specify a regular expression to further process the


<br>

**Info:** If your argument includes spaces or other special characters, you must URL encode them.

<br>

**Example:**
`http://localhost:5200/?url=https://en.wikipedia.org/wiki/Microsoft&qS=tbody%20%3E%20tr%3Anth-child%2821%29%20%3E%20td&regex=.*\s`
