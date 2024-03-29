---
title: "Hacking Electron App - Web Inspection - MetaCTF"
date: 2021-12-06T14:45:23-05:00
tags:
  - Meta CTF
---

**Challenge Descrption:**

We've deployed a fairly simple program that can take input and display its hash in a number of different formats. It's available on both Windows and Linux.

Get down in the weeds and see if you can understand how it works. You may want go beyond static analysis on this one. Try connecting it to a debugger (using default debugger settings!) and watch what requests it makes - I bet there'll be a flag waiting.

**Web Exploitation** 375

----

Web Inspection was a challenge where we had to basically reverse engineer the code. The challenge description wanted us to hook it up to a debugger and that should give us the flag.


# Analyzing

Below is the tree of the source provided. 

```
├── blink_image_resources_200_percent.pak
├── content_resources_200_percent.pak
├── content_shell.pak
├── icudtl.dat
├── libffmpeg.so
├── libnode.so
├── LICENSE
├── LICENSES.chromium.html
├── meta-quick-hash
├── natives_blob.bin
├── resources
│   ├── app.asar
│   └── electron.asar
├── ui_resources_200_percent.pak
├── v8_context_snapshot.bin
├── version
└── views_resources_200_percent.pak
```

I started out by running the `meta-quick-hash`

![](/webinspection/first.png)

It looks like it just returns hashes of the input provided. They said that it was an electron app, so I tried to open `Chromium Dev` tools. It didn't work. 

![](https://c.tenor.com/09Lfmqt2FGAAAAAC/where-is-it-frantic.gif)

I tried bunch of stuffs, nothing happened. 

I tried to open it up with electron inspector by using the command
```
electron --inspect=5858 meta-quick-hash
```

I got bunch of errors and nothing more

![](/webinspection/second.png)

There's nothing we can get out of the app, let's look at what else we have.


### Resources

There are two files inside `resources` 
```
resources
├── app.asar
└── electron.asar
```

After opening up `app.asar`, I found out that it has all the source file contained in it. 
```
{"files":{"app.js":{"size":1961,"offset":"0"},"index.html":{"size":1774,"offset":"1961"},"LICENSE":{"size":1065,"offset":"3735"},"node_modules":{"files":{"@bitdisaster":{"files":{}},"@electron":{"files":{}},"@malept":{"files":{}},"@sindresorhus":{"files":{}},"@szmarczak":{"files":{}},"@types":{"files":{}},"electron-log":{"files":{"LICENSE":{"size":1082,"offset":"4800"},"package.json":{"size":2260,"offset":"5882"},"README.md":{"size":5464,"offset":"8142"},"src":{"files":{"__specs__":{"files":{"catchErrors.spec.js":{"size":1047,"offset":"13606"},"index.d.test.ts":{"size":285,"offset":"14653"},"index.spec.js":{"size":1068,"offset":"14938"},"log.spec.js":{"size":3272,"offset":"16006"},"scope.spec.js":{"size":1462,"offset":"19278"},"utils":{"files":{"fsHelpers.js":{"size":552,"offset":"20740"},"TestLogReader.js":{"size":2589,"offset":"21292"}}}}},"catchErrors.js":{"size":2405,"offset":"23881"},"electronApi.js":{"size":4807,"offset":"26286"},"index.d.ts":{"size":10549,"offset":"31093"},"index.js":{"size":2212,"offset":"41642"},"log.js":{"size":1576,"offset":"43854"},"scope.js":{"size":1302,"offset":"45430"},"transform":{"files":{"__specs__":{"files":{"index.spec.js":{"size":951,"offset":"46732"},"object.spec.js":{"size":1645,"offset":"47683"},"style.spec.js":{"size":1111,"offset":"49328"},"template.spec.js":{"size":2992,"offset":"50439"}}},"index.js":{"size":1544,"offset":"53431"},"object.js":{"size":2781,"offset":"54975"},"style.js":{"size":1600,"offset":"57756"},"template.js":{"size":3998,"offset":"59356"}}},"transports":{"files":{"__specs__":{"files":{"console.spec.js":{"size":5347,"offset":"63354"}}},"console.js":{"size":3034,"offset":"68701"},"file":{"files":{"__specs__":{"files":{"file.spec.js":{"size":5129,"offset":"71735"},"index.spec.js":{"size":4660,"offset":"76864"},"makeTmpDir.js":{"size":546,"offset":"81524"},"packageJson.spec.js":{"size":871,"offset":"82070"},"variables.spec.js":{"size":4530,"offset":"82941"}}},"file.js":{"size":6994,"offset":"87471"},"index.js":{"size":5079,"offset":"94465"},"packageJson.js":{"size":1713,"offset":"99544"},"variables.js":{"size":2687,"offset":"101257"}}},"ipc.js":{"size":1098,"offset":"103944"},"remote.js":{"size":2172,"offset":"105042"}}}}}}}}},"package.json":{"size":431,"offset":"107214"},"README.md":{"size":773,"offset":"107645"},"styles.css":{"size":261,"offset":"108418"},"window.js":{"size":650,"offset":"108679"}}} const https = require('https')
```

The information about where the file starts and where it ends is stored on the first line of the file. 

Next thing I tried was
```
electron --inspect=5858 app.asar
```

With this I was able to open up the `Chromium dev-tools`

![](/webinspection/fourth.png)

There were errors in the code.
Well I tried to edit the app.asar to fix the error, but it didn't work. If I wanted to change anything in the app.asar source, I would have to go to the top of the file and change the offset and the size.

After doing some research on asar I found out that: 

Asar is a simple extensive archive format, according to this Github read me https://github.com/electron/asar 


# Extracting the source code

```
asar extract app.asar source
```

```
source
├── app.js
├── index.html
├── LICENSE
├── package.json
├── README.md
├── styles.css
└── window.js
```

It extracted the original source code.
![](https://c.tenor.com/1KA_cOIDsf0AAAAC/what-am-i-supposed-to-do-token-black.gif)

My instinct was to run `npm start`

It worked but it gave me the same error as when I ran it with electron. 

```
  <script>
    delete module.exports
  </scrip>
 ```
There was this code inside the index.html. I went ahead and removed it.

It got rid of one of the error.

There were jquery errors, so I changed the CDN to import the latest version of jQuery. 
```
<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
```

These got rid of the errors. 

Now I tried to open the app.js with electron inspect 


![](/webinspection/third.png)

Got some errors.

![](https://c.tenor.com/fvqEfiBtv3oAAAAd/this-isnt-how-its-supposed-to-happen-randy-marsh.gif)

Looking inside the app.js I found this GET request. 

```
  window.once('ready-to-show', () => {
    window.show();
        
    var inspect_bool = inspector.url();
    if(inspect_bool) {
	    const options = {
		hostname: 'metaproblems.com',
		port: 443,
		path: '/858cdff94bcf63e59aafeebebb7bc304/' + xorStrings(decodeURIComponent(escape(Buffer.from('EksCGkoJVlMZBEwIFlMJX1YGWB5VDkcMGB1UXA==', 'base64').toString())),inspect_bool.substring(0,20) + window.webContents.history[0].split("").reverse().join("").substring(0,8)) + '.html',
		method: 'GET'
	    };
	    const req = https.request(options, res => { res.on('data', d => {})}); 
	    req.end(); 
    }
```


It sends get request only when the `inspector_bool is not undefined`

As a regular programmer, I did what I was supposed to do. 

```console.log("I am here")```

So the if statement isn't working. Time to print the inspector.url();

`Inspector.url` only works when we run the app in debug mode. 

I think all we have to do now is print the data from the get request.

It's not so simple. 


Playing around with the code a little bit, I found out that `window.webContents.history[0]` returns `undefined.`

```
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
```

This is the code that is supposed to add something to the history. 

I found two ways to solve this problem.

* Do the debugging stuffs from VS code that will execute the loadURL
* Out smart them by replacing the history thing


I went with option 2, just cause it seemed like something that the creator don't want us to do.

So the loadURL is loading the directory path, for this challenge to work they can't expect everyone to have same local directory structure. They will have to use a constant. Which is the index.html

Looking at the ` window.webContents.history[0].split("").reverse().join("").substring(0,8)) `. We can see that it only takes the last 8 characters of the file path. Which is dex.html

So I reversed the dex.html which is `lmth.xed`

Then I replaced the it in the code. 

```
  window.once('ready-to-show', () => {
    window.show();
    var inspect_bool = inspector.url();
    if(inspect_bool) {
        console.log("I am here");
	    const options = {
		hostname: 'metaproblems.com',
		port: 443,
        path: '/858cdff94bcf63e59aafeebebb7bc304/' + xorStrings(decodeURIComponent(escape(Buffer.from('EksCGkoJVlMZBEwIFlMJX1YGWB5VDkcMGB1UXA==', 'base64').toString())),inspect_bool.substring(0,20) + 'lmth.xed') + '.html',
		// path: '/858cdff94bcf63e59aafeebebb7bc304/' + xorStrings(decodeURIComponent(escape(Buffer.from('EksCGkoJVlMZBEwIFlMJX1YGWB5VDkcMGB1UXA==', 'base64').toString())),inspect_bool.substring(0,20) + window.webContents.history[0].split("").reverse().join("").substring(0,8)) + '.html',
		method: 'GET'
	    };
        var str = ""
	    const req = https.request(options, res => { res.on('data', d => { console.log(str+=d)})}); 
	    req.end(); 
        console.log(str);
    }
  })


```

Here my new code

Finally running
```
electron --inspect app.js
```
Gives the following output

![](/webinspection/tty.gif)

```
MetaCTF{aint_no_javascript_ever_gonna_stop_a_hacker}
```
