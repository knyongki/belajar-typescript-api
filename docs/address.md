# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:idContact/adderesses

Request Header :
- X-API-TOKEN : token

Request Body

```json
{
  "street" : "Jalan Apa",
  "city" : "Kota Apa",
  "provice" : "Provinsi Apa",
  "country" : "Negara Apa",
  "postal_code" : "23123"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "id" : 1,
    "street" : "Jalan Apa",
    "city" : "Kota Apa",
    "provice" : "Provinsi Apa",
    "country" : "Negara Apa",
    "postal_code" : "23123"
  }
}
```

Response  Body (Failed) :

```json
{
  "errors" : "post_code is required"
}
```

## Get Address

Endpoint : GET /api/contacts/:idContact/adderesses/:IdAddress

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data" : {
    "id" : 1,
    "street" : "Jalan Apa",
    "city" : "Kota Apa",
    "provice" : "Provinsi Apa",
    "country" : "Negara Apa",
    "postal_code" : "23123"
  }
}
```

Response Body (Failed) :
```json
{
  "errors" : "Address is not found"
}
```

## Update Address

Endpoint : PUT /api/contacts/:idContact/adderesses/:idAddresss

Request Header :
- X-API-TOKEN : token

Request Body

```json
{
  "street" : "Jalan Apa",
  "city" : "Kota Apa",
  "provice" : "Provinsi Apa",
  "country" : "Negara Apa",
  "postal_code" : "23123"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "id" : 1,
    "street" : "Jalan Apa",
    "city" : "Kota Apa",
    "provice" : "Provinsi Apa",
    "country" : "Negara Apa",
    "postal_code" : "23123"
  }
}
```

Response Body (Failed) :
```json
{
  "errors" : "Address is not found"
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/adderesses/:idAddress

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
  "errors" : "Address is not found"
}
```

## List Address

Endpoint : GET /api/contacts/:idContact/adderesses

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data" : [
    {
      "id" : 1,
      "street" : "Jalan Apa",
      "city" : "Kota Apa",
      "provice" : "Provinsi Apa",
      "country" : "Negara Apa",
      "postal_code" : "23123"
    },
    {
      "id" : 2,
      "street" : "Jalan Apa",
      "city" : "Kota Apa",
      "provice" : "Provinsi Apa",
      "country" : "Negara Apa",
      "postal_code" : "23123"
    }
  ]
}
```

Response Body (Failed) :
```json
{
  "errors" : "Contact is not found"
}
```