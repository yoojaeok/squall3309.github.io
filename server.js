const express = require("express");
const AppleAuth = require("apple_auth");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const kakao_auth = require("./kakao_auth.js");
const naver_auth = require("./naver_auth.js");

const app = express();

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static("public"));

app.get("/",(request, response) => {
    response.sendFile(_direname + "/index.html")
});

app.post("/callbascks/sign_in_with_apple",(request, response) =>{
    const redirect = `intent://callback?${new URLSearchParams(
    request.body).toString()}#Intent;package=${
    process.env.ANDROID_PACHAGE_IDENTIFIER};scheme=signiwithapple;end`;
    console.log(`Redirecting to ${redirect}`)
    response.redirect(307, redirect);
});

app.post("/callbacks/apple/sign_in_with_apple", (request, response) => {
    const redirect = `applink://samplesnslogin/?${new URLSearchParams(
    request.body).toString()}`;
})


app.get('/callbacks/naver/sign_in', async (request, response) => {
  const redirect = `webauthcallback://success?${new URLSearchParams(request.query).toString()}`;
  console.log(`Redirecting to ${redirect}`);
  alert(`Redirecting to ${redirect}`);
  response.redirect(307, redirect);
})
app.post('/callbacks/naver/token', async (request, response) => {
  naver_auth.createFirebaseToken(request.body["accessToken"],(resulst)=>{
    response.send(resulst);
  });
})

app.get('/callbacks/kakao/sign_in', async (request, response) => {
  const redirect = `webauthcallback://success?${new URLSearchParams(request.query).toString()}`;
  console.log(`Redirecting to ${redirect}`);
  response.redirect(307, redirect);
})
app.post('/callbacks/kakao/token', async (request, response) => {
  kakao_auth.createFirebaseToken(request.body["accessToken"],(resulst)=>{
    response.send(resulst);
  });
})
