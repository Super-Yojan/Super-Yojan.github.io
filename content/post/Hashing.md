---
title: "Hashing"
date: 2022-10-04T23:16:28-04:00
draft: false
---

Let's say we want a data structure that can perform add, remove, and search in a 
**constant** time. How can we do it? 

If we use an array we can add in a constant time, but to delete and search it will take a 
long time.
That's where hasing comes in. Hashing allows us to reduce the time complexity by a lot. 

### Terminology
* Hash code 
  - It's an integer value computed for a given object which will be used as the index 
* Hash function
  - A function that computes a hash code for an object 
* Hash table 
  - Place where we store object based on hash code.
  - Mostly arrays

## Hash Table 
Hash table stores object in an array where the index of a given object is the 
hash code.
Few things that we need to keep in mind while creating hash table is how to 
compute the hash code? What to do when hash code collides for two objects.


#### Computing hash code 
We need to adhere to Hash Contract while making our own hash function. Hash Contract
basically says that if two object are equal they must return same hash code. We need to 
distribute different object failry, in order to reduce collision. Hash function should be 
fairly quick to compute.

If the hash code for a given object is high and we don't have the index for it, then we 
find a smaller integer. For example, 

If the hash code is 798, and the length of array is 10. We can use modolus operator to find 
a index within the array size. 798%10 = 8 then 789 will be stored at index 8 of the array.


#### Separate Chaining
If there is something already in the given index, then we can use create a linked list 
at that given index to add more values.  Load for a hash table is calculate by 
dividing the Total item count by the length of hash table.

