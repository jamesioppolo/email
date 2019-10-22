# Email handler
This email handler application sends an email using the SendGrid system using the MailGun system as a failover. The RESTful API endpoint requires a body to be sent with x-www-form-urlencoding containing the following key value pairs.

| Key | Value |
|---|---|
| from | email address  |
| recipients   | comma separated list of emails   |
| cc  | comma separated list of emails  |
| bcc  | comma separated list of emails  |
| subject  | text string  |
| message | text string |

## Install and Setup
Perform a git clone in a remote server and enter the following command to execute the node.js listener so that it can respond to API requests

`node index.js`

## Endpoint
A cURL request can be performed to test the /email endpoint as follows 

`curl -X POST \
  http://138.68.247.201:8080/email \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 115' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Host: 138.68.247.201:8080' \
  -H 'Postman-Token: 63dbe408-9917-4e0c-8d75-62bd5c1e373a,9f6a7649-13b7-44fd-b407-f86f4330578e' \
  -H 'User-Agent: PostmanRuntime/7.18.0' \
  -H 'cache-control: no-cache' \
  -d 'recipients=james.ioppolo%40gmail.com&cc=&bcc=&subject=subject&message=test%20message&from=james.ioppolo%40gmail.com'`

## Tests

Execute the following command to run the unit tests in the project

`npm run test`
