# Create Room

This route create a new room with given id if given.

URL : `/api/v1/room`

Method : `POST`

## Data Example
```javascript
{
    roomId:? "Some Room Id"
}
```

## Success Response
---
Code : `200`

Content Example
```javascript
{
    status : "success",
    sroom : "Room Id Sent"
    
}
```
## Error Response
---
Code : `500`

Content Example
```javascript
{
    status : "fail",
    err : "Some Error Here"

}
```
