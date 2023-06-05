---
title: "Lists"
date: 2022-10-04T20:10:23-04:00
draft: false
---
# Lists

Two of the most common types of lists are Dynamic Array Lists and Linked Lists. Each of these lists has its own advantages and disadvantages.

## Dynamic Array List

A Dynamic Array List is a list that grows as more items are added to it. It is a widely used list implementation in many programming languages. While it is easy to use, it may not be the most efficient. Let's take a closer look at how a Dynamic Array List works.

To create a Dynamic Array List, we start with a regular array of a default initial size, such as 2. As we add more values to the list, the size of the underlying array doubles every time it becomes full. The following diagram illustrates this process:


![](/lists/figure1.png)



This type of data structure is easy to implement but may not be very efficient. When we add a new value to the array and it becomes full, we need to create a new array and copy the old values to the new one. This process of creating a new array and copying values has a time complexity of O(n).

![](/lists/figure2.png)

#### Big O Notation for Dynamic Array List

| Data Structure    | Get/Set | Add/Remove End | Insert/Remove Front | Insert/Remove Middle | Search | Easy to grow? |
|-------------------|---------|----------------|---------------------|----------------------|--------|---------------|
| Dynamic Array     | O(1)    | O(n)           | O(n)                | O(n)                 | O(n)   | Not really    |

The table above shows the worst-case time complexity for the Dynamic Array List. However, since the Dynamic Array only needs to copy values when it becomes full, the average time complexity can be analyzed using amortized analysis. This analysis considers the efficiency over a sequence of M operations.

| Data Structure    | Get/Set | Add/Remove End | Insert/Remove Front | Insert/Remove Middle | Search | Easy to grow? |
|-------------------|---------|----------------|---------------------|----------------------|--------|---------------|
| Dynamic Array     | O(1)    | O(1)*          | O(n)                | O(n)                 | O(n)   | Not really    |

We can see that the average time complexity for adding an item to the Dynamic Array List is O(1).

## Linked List

Linked Lists are lists based on linked nodes. Each node holds a value and a reference to the next node.

There are two different types of Linked Lists:
- Singly-Linked Lists
- Doubly-Linked Lists

### Singly-Linked List

A Singly-Linked List has one data field and one field for the next node.

```java
class Node<T> {
    public T value;
    public Node<T> next;

    public Node() {

    }

    public Node(T value) {
       this.value = value;
    }
}
```

This is a Node class in Java for Singly-Linked List.

A visual representation of node would look something like. 

![](/lists/figure3.png)

A linked list is essentially a chain of these nodes, as shown below:

![](/lists/figure4.png)

The first node in the list is called the head, and the last node is called the tail. The tail node points to null. When iterating over a linked list, we know we have reached the end when tail.next equals null.

### Doubly-Linked List

A Doubly-Linked List is similar to a Singly-Linked List, but each node has a reference to the previous node as well.


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
We just need to add a prev field to store a reference to the previous node. A visual representation of a Doubly-Linked List would look something like this:

![](/lists/figure5.png)



## O notation summary

| Data Structure | Get/Set | Add/Remove End | Insert/Remove Front | Insert/ Remove Middle | Search | Easy to grow? |
| ------ | ----- | ------ | ------ | ----- | ---- | ---- |
| Dymanic Array | 1 | *1** | N | N | N | Not really |
| Singly-Linked List | N | 1,N | 1 | N | N | yes |
| Doubly-Linked List | N | 1 | 1 | N | N | yes|



