# Capybara As A Service (CAPAAS)


## Overview
**CAPAAS** is a **Node.js-based RESTful API** that serves up delightful capybara images. Whether you need a random dose of cuteness or a specific capybara moment, CAPAAS delivers high-quality images for all capybara enthusiasts.


## Features
- **Random Capybara Images**: Get a surprise capybara image with a simple GET request.
- **Flexible Responses**: Choose between a direct image, JSON, or HTML response to fit your needs.
- **Specific Image Retrieval**: Retrieve images by ID for consistent results.


## How to Use
### - Getting a Random Image
Make a GET request to the `/capybara` endpoint to receive a random capybara image.

#### Supported Queries:
- `json=true`: Returns a JSON response with image details.
  - Example: `/capybara?json=true`
- `html=true`: Returns an HTML snippet ready for website integration.
  - Example: `/capybara?html=true`


### - Retrieving a Specific Image by ID
Request a specific capybara image by appending the image ID to the endpoint.

#### Supported Queries:
- `json=true`: Returns a JSON response with image details for the specified ID.
  - Example: `/capybara/:id?json=true`
- `html=true`: Returns an HTML snippet for the specified ID.
  - Example: `/capybara/:id?html=true`


## Installation
Follow these steps to set up CAPAAS on your local machine:

1. **Clone the Repository**:
```shell
git clone https://github.com/Pedro-Jaber/CAPAAS.git
```

2. **Navigate to the Project Directory:**
```shell
cd CAPAAS
```

3. **Install Dependencies:**
```shell
npm install
```

4. **Set Up Environment Variables:**
Add a `MONGODB_URI` variable in your `.env` file with your database URI.

6. **Start the server:**
```shell
npm start
```

7. The server will be live at `http://localhost:5505`
