# Get Room

This route will give id for a random room.

URL : `/api/v1/room`

Method : `GET`

## Success Response
---
Code : `200`

Content Example
```javascript
{
    status : "success",
    room : "This is room Id"
    
}
```
Code : `204`

Content Example
```javascript
{
    success : "",
}
```
## Error Response
Code : `500`

Content Example
```javascript
{
    status : "fail",
    err : "Some Error Here"
    
}
```
