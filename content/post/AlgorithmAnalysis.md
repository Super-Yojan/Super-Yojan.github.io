---
title: "Algorithm Analysis"
date: 2022-10-04T19:45:01-04:00
draft: false
---

# Analyzing Algorithm

An algorithm is a finite sequence of rigorous instructions, typically used to solve a specific problem. Some of the important question that might arise is, Why do we need algorithm? And What is algorithm analysis?

Algorithm allows one to define how certain function works. For example, we want to add a value to a [[Data structure]]. We would need to find the most efficient way to add it to the data structure. Algorithm analysis allows us to figure out how efficient an algorithm is.

## Complexities 
For a given algorithm, there are three types of complexities:
* Time-Complexity: How much time it would take for an algorithm to perform a certain task.
* Space-Complexity: How much storage/memory would an algorithm use to perform the given task.
* Implementation-Complexity: How hard is it for us to code the given algorithm. 

## Modeling Time Complexity
We represent complexity as a function of the input. While referring to time complexity, we use T(n) where n in the input size. Let's look at some sample examples.
```c
void decimalToBinary(int decValue, char binString[]) {
	int i;
	int count = 0; 
	char tempArry[32]; 
	for (i = decValue; i > 0; i /= 2) { 
		tempArry[count] = '0' + i % 2;
		count += 1; 
	}
}
```

For the above function, the time complexity will be O(log n). If we say that decValue is n, then in every increment the decValue will be halved.


```c
char* reverse(char string[]){
	char *reversed = malloc(sizeof(string));
	int i;
	int j=0;
	for (i = sizeof(string); i>0;i-- ){
		reversed[j] = string[i];
		j++;
	}
	return reversed;
}
```

Well, let's see how we can look at individual line, and model a more accurate model. To do that we generally use T(n) where n in the input of the function and T is the time total run time. 
```c
char * reversed = malloc(sizeof(string));
int i;
int j =0;
```
For these, we can say that the T(n) = 1 for each. Then the total will be T(n) = 3.

```c
	for (i = sizeof(string); i>0;i-- ){
		reversed[j] = string[i];
		j++;
	}
```
Here we will need to split up the code a bit more
```c
for ( i  = sizeof(string) ; i> 0; i--)
```
`i = sizeof(string)` will be T(n) = 1
`i>0` will run for `i+1` number of times, so the time complexity for that will be T(n)= n+1
finally the `i--` will run for `i` number of times resulting in time complexity of T(n) = n. 
Adding them up will give T(n) = 2n+2 Next, is the interior part.
There are two lines inside which will run `n` number of times, and the T(n) = n.

**To summarize** 
* Outside the for loop, the T(n) = 3.
* The for loop overhead T(n) = 2n+2
* Inside the for loop T(n) = n

Adding them all up, we get the time complexity of
T(n) = 3n+5

Now that we have the specific time complexity for it, we can simplify the bounding function by keeping the most dominant factor. For this example it is 3n, then we can remove any constant and get the Big-O notation. Which will be O(n).

## Quick reference for Big O 


| Big O  | Reason |
|-------------- |-------------- |
| O(1)| Something that takes a fixed ammount of time|
| O(lg n) | When divided in half every time and work on only one half | 
| O(n) | Perfoming a task to each elemnt|
| O(n lg n) | When divided in half every time and need to work on both half |
| O(n^2) | nested loops|
| O(n^3) | three nested loops|

