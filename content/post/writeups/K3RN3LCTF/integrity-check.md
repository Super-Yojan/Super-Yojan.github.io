---
title: "Integrity Check"
date: 2021-11-15T15:38:22-05:00
tags:
    - Kernel CTF
---



![](/integrity/challengeDescription.png)

Attachment: [File](https://github.com/Kasimir123/K3RN3LCTF-2021/blob/main/downloadable/integrity-check/IntegrityCheck.jar)


# Solution

I started out by running the file. 

```
java -jar IntegrityCheck.jar
```

![Test](/integrity/initial_run.png)

We can see that something is wrong in the function name.

Looking at the hint, we all can say that we have to use some sort of Java Bytecode modifying tool. So I searched up online and found quite a few. 

The one that I found useful was the [recaf](https://www.coley.software/Recaf/) 

Opening the IntegrityCheck.jar file 
![Opening the file](/integrity/Opening.png)

The class name looks really wrong. But what is the real name?

I tried looking around for the real name, I didn't find it until I used another tool. rej

![](/integrity/ClassName.png)

With this tool we can see the source file name. I don't know why this is the case, but now I have my real class name.

Now to change the class name I first tried using rej to change it, it still gave me illegal method name error. So I changed the name of the function as well. After that it kept gave me `NullPointerException` because I wasn't changing it properly. I was able to fix that by using Recaf tool.

After changing the class and the method name I had the export to a new jar `changed.jar` . I was able to successfully run this jar using this command

`java -jar changed.jar`

![](/integrity/changedRun.png)

Alr, Now there are no errors. 

Time to find the password.
![](/integrity/password.png)
After just scanning the decompiled code, I was able to find place where they are validating the password. 

```
String throw8 = throw6[0].getClassName();
```
It is storing the name of the class in the variable throw8. (Let's ignore other code for a while)

Then it's creating a new char array 
```
char[] throw9 = throw8.toCharArray();
```
It basically converts the name of the class into an array of characters

After this command throw 9 would look something like 

```
['D', 'e', 'c', 'r', 'y', 'p', 't', 'o', 'r']
```

Right after that there's a if statement that does some funky stuffs. 
 
 It's takes the first 4 characters from the `throw9` char array, and xor's it with some number to validate the input. 
 User given password is stored in `throw10` char array.
 
 To find the correct password we can just xorg the the values that we already know
 
![](/integrity/pythonscript.png)

I wrote a small python script to calculate the password. `GiCw:`

After getting the password, I ran following command
```
java -jar changed.jar GiCw:
```

![](/integrity/werid_output.png)

I got the following output. It wasn't the flag. I must have done something wrong.

After I re-analyze the code, I figured out that the code uses function name to compute the flag.

![](/integrity/flag_code.png)

It uses the `throw7` variable, which takes the method name. 

So, if I keep the original method name, it will give me error, and if I change it it will give me wrong flag.

After thinking for a while. I came up with two solutions.

1. Write a script that replicates the behavior
2. Figure out a way to run using the original method name

After searching online for a while I found this out [-Xverify:none](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=JDK-8214719),using this tag I was able to run the jar even with the illegal method name.

I created `New-Integrity.jar` where I only changed the class name didn't touch the function name.

```
java -Xverify:none -jar New-Integrity.jar GiCw:
```

it gave me the flag: `flag{H3LL0_YOU_KN0W_SOURC3_FIL3}`



