/*
What is Backend?
=> Another computer that manages the data of a website

How does our computer send information to the backend?
=> using HTTP(HyperText Transfer Protocol)

We can attatch info/message to the HTTP and send it to backend
-----------------------------------------------------
We will use a built-iin class 
XMLHttpRequest

Types of requests:
GET
POST
PUT
DELETE

We use a URL(Uniform Resource Locator) to locate a computer
URL:- Its like address, bt for the internet
      Helps us locate another computer on the internet
      Ex:- https://amazon.com  https:- Here 'http' represent that we are using http
                                       's' represent that we are using a secure version of https

                               amazon.com :- Is a Domain name      

Some Terminologies:-     

The message sent by us:- Request
The message sent by backend= Response

#Each request gets one response, this is known as request response cycle

xhr.response :- #  to get the response (this will be undefined at first)
                #  This a asynchronous code:- it will take some time

# Why did we set up eventlistener before even sending the request
=> We have to first setup the eventlistener than trigger the request

# A backend only supports a certain set of URL paths
# if we give a unsupported URL to the backend, it will raise a error and provide a status code
    # STATUS CODE:-
    # starts with 4 or 5 (400,404,500)=failed   , 4= our problem , 5= backends problem
    # starts with 2(200,201,204) = succeeded
      
# The List off all the URL's Supported by backend are known as :-
    API (Application programming interface)

Backend responds with different types of data
 1) Text    
 2) Json String:- We can use JSON.parse() to convert it into Javascript Object
 3) HTML :- displays the code
 4) Image :- Displays raw data of the image


 Using a browser is similar to making a GET request
 but the browser doesnt displays the raw data, it converts internally

*/                    

const xhr=new XMLHttpRequest();  //creates a new HTTP message to send to the backend(message = request)

xhr.addEventListener('load',()=>{  // We create this so that the function should run only when the response is completely loaded
    console.log(xhr.response);     //Not undefined
});

xhr.open('GET', 'https://supersimplebackend.dev' );  // Setting up, .open(type of HTTP request, where to send this HTTP message)
xhr.send();   //This sends the message to the URl

 
