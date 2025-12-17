---
title: 'Kalman Filters & Rust'
description: 'Implementing state estimation for autonomous blimps.'
pubDate: 'Dec 16 2025'
---

## Introduction

In our robotics lab at **GMU**, we often deal with noisy sensor data. To estimate the true state of the blimp, we use a Linear Kalman Filter.

The state update equation is defined as:

$$
\hat{x}_{k|k} = \hat{x}_{k|k-1} + K_k (z_k - H \hat{x}_{k|k-1})
$$

Where $K_k$ is the optimal Kalman Gain.

## Implementation

Here is a simplified implementation using `nalgebra` in Rust:

```rust
use nalgebra::{Matrix2, Vector2};

fn update(x: Vector2<f32>, p: Matrix2<f32>, z: Vector2<f32>) {
    // Calculate Kalman Gain
    let h = Matrix2::identity();
    let r = Matrix2::new(0.1, 0.0, 0.0, 0.1);
    
    // Innovation
    let y = z - h * x;
}

