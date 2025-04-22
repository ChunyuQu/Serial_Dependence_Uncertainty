# 🧠 Serial Dependence in Time Perception under Uncertainty

This repository contains the full implementation of a behavioral experiment exploring **serial dependence in time perception** under varying levels of sensory **uncertainty**. The experiment is built with [PsychoJS](https://pavlovia.org/) and ready for deployment via [Pavlovia](https://pavlovia.org/).

---

## 📋 Overview

This experiment investigates how uncertainty modulates **serial dependence** in a **time reproduction task** using **Random Dot Kinematograms (RDKs)**. Participants observe a motion stimulus and reproduce its duration. Coherence is varied to introduce high vs. low uncertainty conditions.

---

## 🧪 Experimental Procedure

### 🔄 Block Design

- The task includes multiple **blocks**, each with `54` trials.
- The **first block** is a practice block.
- Before each block, a prompt appears:
➤ "Block (X / N) will start. Please press 'S' to continue."


### 🔁 Trial Flow

Each trial consists of the following stages:

1. **Masking Phase (`Mask_2`)**  
 A low-coherence RDK is presented to reduce aftereffects.

2. **Encoding Phase (`M2`)**  
 A directional RDK is shown for a randomized duration (e.g., 0.8–1.6 s). Direction is randomized per trial.

3. **Cue Phase (`Cue`)**  
 A cue ("T") appears, signaling the participant to start reproduction.

4. **Reproduction Phase (`Response`)**  
 Participants hold the ↓ key to reproduce the observed duration. Duration of the key press is recorded.

5. **Feedback Phase (`Feedback_Time`)**  
 Five colored circles give visual feedback based on the **relative error** between target and reproduced duration.

---

## 🔧 Technical Highlights

This experiment includes several key features to ensure **precision** and **device consistency**:

- ✅ **Screen Calibration**  
Participants resize a reference image (e.g., credit card) to match real-world size. This enables accurate pixel-per-cm scaling.

- ✅ **Frame Rate Compensation**  
The frame rate of the participant's display is measured, and dot movement speed is automatically adjusted to maintain consistent **motion in cm/sec** across devices.

- ✅ **RDK**  
A custom JavaScript-based RDK engine supports:
- Coherence control
- Noise modes: `"mask"`, `"inertial"`, `"replace"`, `"walk"`
- Dot scaling, speed control, and dynamic pixel mapping


---

## 🗃 Data Logging

Each trial logs the following information (to `.csv`):

| Column              | Description                             |
|---------------------|-----------------------------------------|
| `Block_id`          | Block index                             |
| `trial_in_block`    | Trial number within the block           |
| `coherence`         | Motion coherence level (uncertainty)    |
| `direction`         | RDK motion direction (degrees)          |
| `TimeDur`           | True stimulus duration (in seconds)     |
| `keyDuration_global`| Participant’s reproduced duration       |
| `feedback_ID`       | Feedback index (1–5)                    |
| `relative_error`    | Signed error between true & reproduced  |
| `x_scale`, `y_scale`| Screen scaling calibration values       |

---

## 🌐 Deployment Guide

To run the experiment online using **Pavlovia**:

1. Upload the following files to your Pavlovia Git project:
 - `Serial_Dependence_U.psyexp`
 - `Serial_Dependence_U.js`
 - `resources (containing images, CSVs, and the custom RDK script)

2. Sync the project using **PsychoPy** or Git.

3. Share the experiment link with participants.

