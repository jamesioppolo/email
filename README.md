# Email
email application 

## Deployment
This application uses serverless to deploy. First setup serverless as follows

`serverless config --provider aws -- key <aws-key> --secrett <aws-secret>`

The enter the follow command to deploy

`serverless deploy`

## Endpoint
Once the application has been deployed, perform a curl request as follows

`curl --request GET --url https://<id>.execute-api.us-east-1.amazonaws.com/dev/email`