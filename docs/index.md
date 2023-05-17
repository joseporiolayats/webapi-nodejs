
# **MyInsuranceAPI**

MyInsuranceAPI is a secure and robust API built with Node.js, Express.js, and uses Joi for data validation. It provides endpoints to fetch data about clients and policies from external sources, validate this data and use it to provide user-specific responses.


## **Technology Stack**



* Node.js
* Express.js
* Joi
* dotenv
* HTTP-errors
* Morgan
* Helmet
* Express-rate-limit
* CORS


## **Installation**

To install and run the MyInsuranceAPI locally, please follow the steps below:



1. Clone the repository \
   Use git to clone the MyInsuranceAPI repository:
2. bash
3. Copy code
4. `git clone https://github.com/your-repo/MyInsuranceAPI.git`
5. Install Dependencies \
   Navigate into the cloned repository and install the necessary dependencies using npm:
6. bash
7. Copy code
8. `cd MyInsuranceAPI npm install`
9. Set Environment Variables \
   Create a `.env` file in the root directory of the project, and add the following:
10. bash
11. Copy code
12. `URLCLIENTS=your_clients_data_url URLPOLICIES=your_policies_data_url SECRET_TOKEN=your_secret_key \
    `Replace `your_clients_data_url` and `your_policies_data_url` with the URLs of your data sources, and `your_secret_key` with your chosen secret key for token generation.
13. Run the Application \
    Start the server by running the following command:
14. bash
15. Copy code
16. `npm start \
    `Your server should now be running at `http://localhost:3000`.


## **Usage**

Once the server is running, you can use the following endpoints:



* `POST /login`: Takes `email` and `password` in the request body and returns an authentication token.
* `GET /clients/name/:name`: Returns client data for the client with the given name.
* `GET /clients/id/:id`: Returns client data for the client with the given id.
* `GET /clients/email/:email`: Returns client data for the client with the given email.
* `GET /clients/role/:role`: Returns all clients with the given role.
* `GET /policies/by_policy/:id`: Returns client data associated with the given policy id.
* `GET /policies/by_client_name/:name`: Returns all policies associated with the client of the given name.

Remember, all these endpoints require authentication. To authenticate, add the following to the headers of your request:

css

Copy code


```
Authorization: Bearer {token}
```


Replace `{token}` with the token you received from the `/login` endpoint.
