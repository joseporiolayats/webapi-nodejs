# WebAPI code assessment
#### Backend API service using Node.js and Express
This is a webapp backend service created for the sole purpose of exploring some
API use-cases and being as broad and modern as
possible so to be compliant with the requirements and also able to further
extend its capabilities.

##  Capabilities
This app is able to provide the following:

1. [x] Get user data filtered by user ID. Accessed by roles "users" and "admin"
2. [x] Get user data filtered by user name. Accessed by roles "users" and "admin"
3. [x] Get the list of policies linked to a user name. Accessed by role "admin"
4. [x] Get the user linked to a policy number. Accessed by role "admin"

## License
- All the software is opensource and free for personal and commercial use.
- Authentication and authorization. Take the user role from the web service that returns the list of company clients.

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

To install and run the app locally, please follow the steps below:



1. Clone the repository \
   Use git to clone the MyInsuranceAPI repository:
```bash
git clone https://github.com/joseporiolayats/webapi-nodejs
````
2. Install Dependencies \
   Navigate into the cloned repository and install the necessary dependencies using npm:
```bash
cd webapi-nodejs 
npm install
```
3. Set Environment Variables \
   Create a `.env` file in the root directory of the project, and add the following:
```dotenv
# .env
JWT_SECRET=SuperSecretPassword
URLCLIENTS=https://www.mocky.io/v2/5808862710000087232b75ac
URLPOLICIES=https://www.mocky.io/v2/580891a4100000e8242b75c5
```
13. Run the Application \
    Start the server by running the following command:
```bash
npm start
```
Your server should now be running at `http://localhost:3000`.


## **Usage**

Once the server is running, you can use the following endpoints:



* `POST /login`: Takes `email` and `password` in the request body and returns an authentication token.
* `GET /clients/name/:name`: Returns client data for the client with the given name.
* `GET /clients/id/:id`: Returns client data for the client with the given id.
* `GET /clients/email/:email`: Returns client data for the client with the given email.
* `GET /clients/role/:role`: Returns all clients with the given role.
* `GET /policies/by_policy/:id`: Returns client data associated with the given policy id.
* `GET /policies/by_client_name/:name`: Returns all policies associated with the client of the given name.

All these endpoints require authentication. To authenticate, add the following to the headers of your request:


```bash
Authorization: Bearer {token}
```
Replace `{token}` with the token you received from the `/login` endpoint.

or use the export variables
```bash
export TOKEN=$(curl -s -X POST -H 'Content-Type: application/json' -d '{"email": "britneyblankenship@quotezart.com", "password": "a0ece5db-cd14-4f21-812f-966633e7be86"}' http://localhost:3000/login | jq -r '.token')
```


### Login use case
```commandline
http POST localhost:3000/login email="britneyblankenship@quotezart.com" password="a0ece5db-cd14-4f21-812f-966633e7be86"
```
Which returns
```http request
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 276
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Content-Type: application/json; charset=utf-8
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Date: Wed, 17 May 2023 09:58:52 GMT
ETag: W/"114-VSCNwsVhKM+pRsufZ7hiwZW8bgk"
Keep-Alive: timeout=5
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 96
X-RateLimit-Reset: 1684317619
X-XSS-Protection: 0

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwZWNlNWRiLWNkMTQtNGYyMS04MTJmLTk2NjYzM2U3YmU4NiIsImVtYWlsIjoiYnJpdG5leWJsYW5rZW5zaGlwQHF1b3RlemFydC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODQzMTc1MzIsImV4cCI6MTY4NDQwMzkzMn0.be3NDy-my1PUL3jRnjIuPP-CXLuE74M5UJx-lEwnSgI"
}
```

### Policies by client name
Let's try and make the API call to obtain the policies associated to a client name
```commandline
http GET http://localhost:3000/policies/by_client_name/Britney "Authorization: Bearer $TOKEN"
```
And the answer is positive! we get  all the results! (Not copying here because there are a lot)

### Client name by policy
Now we try the search on reverse: looking up who's the owner of a specified policy.
```commandline
http GET http://localhost:3000/policies/by_policy/0df3bcef-7a14-4dd7-a42d-fa209d0d5804 "Authorization: Bearer $TOKEN"
```

### Client data from name
Let's retrieve the personal data of a client.
```commandline
http GET http://localhost:3000/clients/name/:name "Authorization: Bearer $TOKEN"
```

### Client data from any of the stored items
Retrieve the personal data of a client by using the name, the phone, the email...
```commandline
http GET http://localhost:3000/clients/email/:email "Authorization: Bearer $TOKEN"
```

## Future work
This project could be drastically improved by adding a frontend, like React or Next.js.
