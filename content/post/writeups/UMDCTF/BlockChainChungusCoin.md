---
title: "UMDCTF: Block ChainV2 - Chungus Coin"
date: 2022-03-06T19:12:41-05:00
image: /UMDCTF/UMDCTF.png
tags:
    - UMDCTF
---

![](/UMDCTF/ChungusCoin/Pasted%20image%2020220306151519.png)
For this challenge we were provided with the server.py with stuffs redacted.

They made their own coin called ChungusCoin, this challenge was combination of reverse engineering and bitcoin.

As usual, starting the challenge out by analyzing the code that was provided.
![](/UMDCTF/ChungusCoin/Pasted%20image%2020220306151923.png)
There is a lot going in the code. The description of the challenge says it's for people who know how to mine. So, time to figure out how to mine this code.

There are few routes in the flask servers
![](/UMDCTF/ChungusCoin/Pasted%20image%2020220306152435.png)

![](/UMDCTF/ChungusCoin/Pasted%20image%2020220306152509.png)
![](/UMDCTF/ChungusCoin/Pasted%20image%2020220306152553.png)

I think for this challenge we have to compute hash of previous block, do some proof of work, then add the pending transaction to the chain. This will then return the flag.


```python
import requests
from hashlib import sha256
import json
import random

URL = "http://0.cloud.chals.io:24797/"
pending_transactions = requests.get(URL+"pending_transactions").json()
chain = requests.get(URL+"chain").json()
last_block = chain['chain'][-1]

def proof_of_work(prev_proof):
    new_proof = random.randrange(100000,9999999)
    proof_hash = sha256(f'{prev_proof}{new_proof}'.encode()).hexdigest()
    while proof_hash[:5] != "00000":
        new_proof = random.randrange(100000,9999999)
        proof_hash = sha256(f'{prev_proof}{new_proof}'.encode()).hexdigest()
        print(new_proof, proof_hash)
    print(new_proof, proof_hash)
    return new_proof

def new_block(last_block):
    new_index = last_block["index"] + 1
    prev_hash = sha256(json.dumps(last_block, sort_keys=True).encode()).hexdigest()
    new_proof = proof_of_work(last_block['proof'])
    time_stamp = 1.7976931348623157e+308
    dict = {"index" : new_index,
        "previous_hash": prev_hash,
        "proof": new_proof,
        "timestamp" : time_stamp,
        "transactions" : pending_transactions
            }
    return dict

def update_chain(new_block):
    chain['chain'].append(new_block)
    chain['length'] += 1
    data={'length':chain['length'],'chain':chain['chain'], 'name':'drMoscovium'}
    resp = requests.post(url=URL+"nodes/update",json=data )
    print(resp.json())

block = new_block(last_block)
update_chain(block)
```

Script for mining
Explaining everything will take forever, here is a quick overview:

***proof_of_work:*** it takes in previous proof and computes new hash with first 5 hash being 0, by appending new randomly generated 6-7 numbers
***new_block***: it creates a new block by hashing previous block, adding one to the index, and getting the proof of work from the proof_of_work function.
***update_chain***: it takes in new_block and appends it to the chain, and send a post request to update the chain in the block chain server.

Running the script will compute proof_of_work and append the transaction to server and return the flag.

![](/UMDCTF/ChungusCoin/Solver.gif)
```bash
UMDCTF{Chungus_Th4nk5_y0u_f0r_y0ur_bl0ckch41n_s3rv!c3}
```


