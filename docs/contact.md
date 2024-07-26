# Contact API Spec
## Create Contact

Endpoint : POST /api/contacts

Request Header :
- X-API-Token : token

Request Body :

```json
{
  "first_name" : "Natalius Yongki"
  "last_name" : "Setiawan"
  "email" : "yongki@example.com"
  "phone" : "0899999999"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "id" : 1,
    "first_name" : "Natalius Yongki",
    "last_name" : "Setiawan",
    "email" : "yongki@example",
    "phone" : "089999999999"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "first_name must not blank, ..."
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header :
- X-API-Token : token

Response Body (Success) :

```json
{
  "data" : {
    "id" : 1,
    "first_name" : "Natalius Yongki",
    "last_name" : "Setiawan",
    "email" : "yongki@example",
    "phone" : "089999999999"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "contact is not found"
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header :
- X-API-Token : token

Request Body :

```json
{
  "first_name" : "Natalius Yongki"
  "last_name" : "Setiawan"
  "email" : "yongki@example.com"
  "phone" : "0899999999"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "id" : 1,
    "first_name" : "Natalius Yongki",
    "last_name" : "Setiawan",
    "email" : "yongki@example",
    "phone" : "089999999999"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "first_name must not blank, ..."
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header :
- X-API-Token : token

Response Body (Success) :

```json
{
  "data" : "OK"
}
```

Response Body (Failed) :

```json
{
  "errors" : "Contact is not found"
}
```

## Search Contact

Endpoint : GET /api/contacts

Request Header :
- X-API-Token : token

Query Parameter :
- name : string, contact first name or contact last name, optional
- phone : string, contact phone, optinal
- email : string, contact email, optinal
- page : number, default 1
- size : number, default 10

Response Body (Success) :

```json
{
  "data" : [
    {
      "id" : 1,
      "first_name" : "Natalius Yongki",
      "last_name" : "Setiawan",
      "email" : "yongki@example",
      "phone" : "089999999999"
    }
    {
      "id" : 2,
      "first_name" : "Natalius Yongki",
      "last_name" : "Setiawan",
      "email" : "yongki@example",
      "phone" : "089999999999"
    }
  ],
  "paging" : {
    "current_page" : 1,
    "total_page" : 10,
    "size" : 10
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized"
}
```
