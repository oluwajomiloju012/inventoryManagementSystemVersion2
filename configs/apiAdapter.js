const axios = require('axios');
let data = JSON.stringify({
  "request_id": "2026030816459384759tt20167",
  "serviceID": "mtn-data",
  "billersCode": "08011111111",
  "variation_code": "mtn-50mb-200",
  "phone": "08011111111",
  "amount": "1000"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://sandbox.vtpass.com/api/pay',
  headers: { 
    'api-key': 'd5c1bb10cd5bbac723e1b7520584ed9b', 
    'secret-key': 'SK_642f49855df8532aafb9de2a31d792cd7ac2ab69612', 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYWJhbml5aWFraW5qaW9sYSsxNkBnbWFpbC5jb20iLCJqdGkiOiIyMDYyZTgzYS0wNTdkLTQ0NDAtOTQxYy02Y2NlYTc4YmQwMTYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYmFiYW5peWlha2luamlvbGErMTZAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJiYWJhbml5aWFraW5qaW9sYSsxNkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJPd25lciIsImV4cCI6MTc3NTU4ODI0NywiaXNzIjoiaHR0cHM6Ly9hcGl0ZXN0Lm5vdmFjLmNvbSIsImF1ZCI6Imh0dHBzOi8vYXBpdGVzdC5ub3ZhYy5jb20ifQ.n1SAGljwJvkDcxn4tWCmVoiciqrehbq3oIxCS7pTBIs'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});