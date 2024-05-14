---
title: "Hashing"
date: 2022-10-04T23:16:28-04:00
draft: false
---
When we require a data structure that can perform add, remove, and search operations in constant time, we can turn to the concept of hashing. While using an array allows for constant-time addition, searching and removal operations can be time-consuming. Hashing offers a solution by significantly reducing the time complexity involved.

## Terminology

Before diving into the details of hash tables, let's clarify some key terms:

* Hash code: An integer value computed for a given object, which serves as the index in the hash table.
* Hash function: A function that calculates the hash code for an object.
* Hash table: A data structure that stores objects based on their hash codes, typically using an array.

# Hash Table

A hash table stores objects in an array, using the object's hash code as the index. To achieve constant-time operations, we need to address two important aspects: computing the hash code and handling collisions.

**Computing the hash code**

To ensure fairness and reduce collisions, the hash function must adhere to the Hash Contract. According to the contract, if two objects are equal, they must produce the same hash code. Additionally, the hash function should be efficient in its computation.

When the hash code for an object is larger than the array size, we need to map it to a valid index within the array. This can be achieved by using the modulus operator. For example, if the hash code is 798 and the length of the array is 10, the index can be calculated as 798 % 10 = 8. Thus, the object will be stored at index 8 of the array.

**Handling collisions**

Collisions occur when two or more objects produce the same hash code and need to be stored at the same index. One common approach to handle collisions is called Separate Chaining. In this method, if an index already has an object stored, we create a linked list at that index to accommodate multiple values.

To evaluate the performance of a hash table, we calculate the load factor by dividing the total item count by the length of the hash table. Maintaining an appropriate load factor is crucial for the efficient operation of the hash table.

Hash tables provide an efficient solution for achieving constant-time operations for add, remove, and search tasks. By properly computing hash codes and handling collisions, we can leverage the power of hashing to address these requirements effectively.
