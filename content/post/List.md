---
title: "Lists"
date: 2022-10-04T20:10:23-04:00
draft: false
---

# Lists

Two of the most common lists are Dymanic Array List and Linked List. Both of them have their own advantages 
and disadvantages. 


## Dymanic Array List

Dymanic Array List is a list that grows as more items are added onto the list. These are the most common types
of lists used by many programming languages. While it may seem easy to use and work with this types of list 
aren't very efficient. Let's look at how Dymanic Array works.

To make a Dymanic Array we start with a regular array with some default initial size. I will start with a 
list of size 2. As we add more value to the array list the size of array will double every time it's full.
The following picture shows how it works.

![](lists/figure1.png)

This type of data structure is easy to implement but it's efficiency isn't really good.
When we add a new value to the array and it's full, we would
need to make a new array and copy it over. 

![](lists/figure2.png)

The time complexity of making a new array and copying old 
values to the new one is O(n).

#### O notations for Dymanic Array

| Data Structure | Get/Set | Add/Remove End | Insert/Remove Front | Insert/ Remove Middle | Search | Easy to grow? |
| ------ | ----- | ------ | ------ | ----- | ---- | ---- |
Dymanic Array | 1 | N | N | N | N | Not really |

The above it the worst case for the Dynamic Array, but as 
discussed above Dynamic array only copies when it's full. 
The average time complexity can be computed using something 
called **amortized analysis** where we find the efficiency by dividing worst case by sequence of M operations.

| Data Structure | Get/Set | Add/Remove End | Insert/Remove Front | Insert/ Remove Middle | Search | Easy to grow? |
| ------ | ----- | ------ | ------ | ----- | ---- | ---- |
Dymanic Array | 1 | *1** | N | N | N | Not really |

We can see that the Add averages to O(1).

## Linked List

Linked list are list based on linked nodes. Nodes are object that holds 
the value and points to the next node. 

There are two different types of linked list. 
* Singly-Linked Lists 
* Doubly-Linked Lists 


### Singly Linked List
A singly linked list has one data field and one filed for the next node.

```java
class Node<T>{
    public T value;
    public Node<T> next;

    public Node<T>(){
        
    }
    public Node<T>(T value){
       this.value = value;
     }
}
```

This is a node in java for singly linked list.

A visual representation of node would look something like. 

![](lists/figure3.png)

A linked list is basically chains of these nodes. Which would look like.

![](lists/figure4.png)

The first node in the list is called head, and the last is called the tail. The tail 
will point to null. While iterating over a linked list we know that we reached the end 
when tail.next equals null.


### Doubly-Linked

A Doubly-Linked list is basically the same as singly other than we can move both forward 
and backwards. 

```java
class Node<T>{
    public T value;
    public Node<T> next;
    public Node<T> prev;


    public Node<T>(){
        
    }
    public Node<T>(T value){
       this.value = value;
     }
}
```
We just need to add a prev field, that will store reference to the previous node.
A visual representation of doubly linked list would look something like. 

![](lists/figure5.png)



## O notation summary

| Data Structure | Get/Set | Add/Remove End | Insert/Remove Front | Insert/ Remove Middle | Search | Easy to grow? |
| ------ | ----- | ------ | ------ | ----- | ---- | ---- |
| Dymanic Array | 1 | *1** | N | N | N | Not really |
| Singly-Linked List | N | 1,N | 1 | N | N | yes |
| Doubly-Linked List | N | 1 | 1 | N | N | yes|



