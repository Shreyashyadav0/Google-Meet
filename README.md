# Google-Meet

Server side explaination

Day 14 | Backend | Google Meet
we are making Google meet today and we are using WebRTC it is something like web sockets but for medias
it transfers the like directly peers to peers not to server something like end to end encrypted for this purpose we have 
PEERJS library just like everything. go to peer.js documentation

navigotor is window.navigator which have all the info about the device.
also we are going to use ejs it is basically html where we can have some variables.(templeting engine)
uuid - basically generates random text

EJS is a template system. You define HTML pages in the EJS syntax and you specify where various data will go in the page. Then, your app combines data with the template and "renders" a complete HTML page where EJS takes your data and inserts it into the web page according to how you've defined the template. For example, you could have a table of dynamic data from a database and you want EJS to generate the table of data according to your display rules. It saves you from the drudgery of writing code to dynamically generate HTML based on data.

EJS is compatible with Express for back-end use as it hooks into the View engine architecture that Express provides and lets you render web pages to the client with res.render() in Express.

we will have different server for peer js as well 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "start-peer": "peerjs --port 8001"
  },
revice (50 min)
1-First me make the express and listen to it on Port
2- then we make the server http one
3-Then we have  to require uuid to make the random string 
4- Then we require Io so that people can understand if new box need to shown or not ( it can emit if anyone has joined and then tell us about it ) 
5- then we require peer js for this we simply require it
6 then we put the peer js inside the middleware
7-IF we want to use some variable we have to put it in ejs we have to put it in app.set("view engine", "ejs"); there are multiple engines
8- then we have app.use /public through which we are specifing the path of out index.js and style.css and main.js so that what ever comes with /public would go to this required things.
9- then we have app.get ('/' whatever comes with / give it a html
10- then whenever we come with /join we redirect it to new url with new uuid 
app.get("/join",(req,res) =>{
    res.redirect(
        url.format({
            pathname: '/join/${uuidv4()}',
            query: req.query
        })
    )
});
11- app.get("/join/:rooms", (req, res) => {
    res.render("room", { roomid: req.params.rooms, Myname: req.query.name });
});

this random id need to show some ejs.file so we have this route(we have room.ejs) with variable of roomid and myname
12-In this ejs file we have all the fuctionality mute, stop video and leave the meating
13-Whenever we joins the rooms we have new socket connection it just tell this have joined and when left it tells this boy has left
