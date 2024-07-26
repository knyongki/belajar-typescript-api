# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username" : "yongki",
  "password" : "123456",
  "name" : "Yongki De"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "yongki",
    "name" : "Yongki De"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Username must not blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username" : "yongki",
  "password" : "123456"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "yongki",
    "name" : "Yongki De",
    "token" : "uuid"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Username or password wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data" : {
    "username" : "yongki",
    "name" : "Yongki De"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Update User

Endpoint : PATCH /api/users/login

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "username" : "yongki", // tidak wajib
  "password" : "123456" // tidak wajib
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "yongki",
    "name" : "Yongki De"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Logout User

Endpoint : DELETE /api/users/login

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data" : "OK"
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```