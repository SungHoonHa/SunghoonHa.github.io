---
layout: single
title: "Technical Projects"
permalink: /projects/
author_profile: true
toc: true
---

This section highlights my core engineering projects, demonstrating my ability to bridge theoretical modeling with high-fidelity hardware implementation.

---

## 🚀 1. Vertically Flying Cylindrical Vehicle (VFCV): Reusable Launch Vehicle
**Capstone Design Project | Korea Aerospace University | 2023**

Designed and fabricated a 6-DOF reusable rocket prototype capable of vertical takeoff and landing. This project required a multidisciplinary approach combining structural optimization and advanced control theory.

* **Role:** Lead Systems Engineer (Hardware & Control Logic Co-development)
* **Tech Stack:** CATIA V5, MATLAB/Simulink, Python, Raspberry Pi (FCC), C++
* **Key Achievement:** Awarded **Excellence Prize** at the KAU Capstone Competition.

#### **Technical Deep-dive:**
* **Structural Innovation (CATIA):** Engineered a **Semi-monocoque** airframe using 3D-printing-optimized designs. I developed a lightweight "Skin & Bar" structure, utilizing hexagonal reinforcements to maximize load resistance while minimizing mass.
* **Thrust Vector Control (TVC):** Designed a **2-axis gimbal system** for a 90mm ducted fan, allowing for precise thrust vectoring. I integrated a fin-stabilization system to secure roll-axis control during high-speed ascent.
* **HILS & Control Validation:** Developed a **6-DOF position and posture controller** based on quaternion math to avoid gimbal lock. I validated the system through **Hardware-in-the-Loop Simulation (HILS)**, using a Raspberry Pi as the Flight Control Computer (FCC) to interface with real-time sensors (MTi-8 INS).
* **Challenge Solved:** Overcame extreme propulsion-induced heat loads by optimizing insulation layouts without exceeding the strict mass budget for the vertical landing phase.

---

## 🤖 2. Avatar-Kairos Project: Remote-Controlled Vehicle Conversion
**Research Internship | University of Nevada, Las Vegas (UNLV) | 2023**

Collaborated with the Drones and Autonomous Systems Lab (DASL) to convert a standard, inoperable electric vehicle into a fully functional, remote-controlled research platform.

* **Role:** Mechanical & Systems Research Intern
* **Tech Stack:** CNC Machining, UOMO Control Units, Power System Engineering
* **Core Tasks:** Vehicle electrification, remote-link integration, and custom part manufacturing.

#### **Technical Deep-dive:**
* **Hardware Transformation:** Successfully transformed an inoperable electric golf cart into a drive-by-wire system. This involved designing and manufacturing custom mounting brackets and mechanical linkages using **CNC mills**.
* **System Debugging (UOMO/Shepherd):** Integrated Kairos Autonomi’s **UOMO control units** for remote steering and acceleration. I resolved critical signal-blinking issues in the Shepherd interface by identifying and fixing wiring disturbances after component reassembly.
* **Power System Recovery:** Diagnosed a complete battery failure in the vehicle's powertrain; successfully restored system functionality by precisely re-balancing the electrolyte levels with distilled water, saving the project significant hardware costs.

---

## 🚙 3. Kia PV5 HVAC Module Development
**Industrial Lead Project | Hyundai WIA | 2024 – Present**

Spearheaded the mechanical architecture and thermal optimization for the HVAC module of Kia’s first dedicated PBV (Platform Beyond Vehicle).

* **Key Solution:** Redesigned internal **cam-trajectories** using CATIA V5 to ensure airtight sealing and zero mode-door leakage, which is critical for maximizing the driving range of the EV platform.
* **NVH Mastery:** Successfully suppressed high-frequency whistle and booming noises by tuning door geometries and applying advanced **dual-injection** materials, meeting stringent global noise standards for premium EVs.

---
