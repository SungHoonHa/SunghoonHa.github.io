---
layout: single
title: "Technical Projects"
permalink: /projects/
author_profile: true
toc: true
---

This section highlights my core engineering projects, demonstrating my ability to bridge theoretical modeling with high-fidelity hardware implementation.

---
## 1. Next-Generation EV HVAC Systems & Thermal Management
**Senior Research Engineer | Hyundai WIA | 2024 – Present**

At Hyundai WIA, I have led the development of advanced thermal management systems, bridging the gap between virtual design and mass production reality.

<div style="display: flex; align-items: center; gap: 15px; margin-top: 30px; margin-bottom: 20px;">
  <img src="/assets/images/PV5.png" alt="Kia PV5 Vehicle" style="height: 60px; width: auto; border-radius: 8px;">
  <h4 style="margin: 0;">a. Kia PV5 (Dedicated PBV CargoVan): Mass Production Maturation</h4>
</div>
*Focus: Field Engineering, Supplier Quality, and System Validation*

* **Global Recognition (2026 IVOTY Winner):** Contributed to the successful development of the PV5 platform, which made history as the first Korean vehicle to win the **"2026 International Van of the Year (IVOTY)"** with a unanimous vote. [[Official News]](https://www.kia.com/ie/about-kia/news-and-events/kia-pv5-wins-international-van-of-the-year/)
* **Manufacturing Maturation:** Spearheaded the transition to mass production by managing supplier-side mold structures and refining injection-molded part dimensions for zero-defect assembly.
* **Cross-functional Coordination:** Coordinated technical requirements between Procurement, Quality, and Production teams to resolve manufacturing bottlenecks.
* **Field Validation:** Conducted extensive real-car evaluations to suppress NVH (Whistle/Booming noise) and optimize thermal distribution for the commercial vehicle segment.
* **Benchmarking:** Analyzed competitor HVAC architectures to implement performance-enhancing features, achieving top-tier efficiency for the PV5 platform.


#### **b. PV7 Platform (Ongoing Project): Advanced Reliability & Kinematic Design**
*Focus: DFSS/FMEA Methodologies and Precision Engineering*
* **Reliability Engineering (FMEA/DFSS):** Applied **Design for Six Sigma (DFSS)** to innovate case-locking structures and conducted **FMEA** to ensure long-term structural integrity.
* **Kinematic Optimization:** Developed complex **CAM trajectories** to improve the linearity of the **Smart Intake System**, ensuring precise control of Fresh/Recirculated air mixing.
* **CFD-to-Real-Car Correlation:** Identified and resolved discrepancies between CFD simulations and physical test data for foot-vent airflow, achieving high-fidelity performance correlation.
* **3D Packaging:** Utilized **CATIA V5** to manage dense system packaging, preventing interference with surrounding cockpit and chassis components.



#### **c. Strategic R&D Leadership & Global Representation**
*Focus: Global Partnerships, IP Strategy, and Customer Excellence*

* **Global Technical Representation (GM Tech Day):** Selected as a lead technical spokesperson to represent Hyundai WIA at **GM Tech Day in Detroit**. I presented next-generation HVAC roadmaps and TMS business strategies to GM’s global engineering and procurement leadership.
* **Intellectual Property (IP) Portfolio:** Leading the company’s technical innovation by authoring **7+ patents** (filed/pending) focused on high-efficiency control logic and energy-efficient thermal architectures.
* **Standardization of Design Protocols:** Refined and established new internal design standards by synthesizing technical requirements from various global and domestic project cycles.
* **Award for Professional Excellence:** Awarded **2nd Place in Team Customer Satisfaction** (HMG) for excellence in managing technical requirements and fostering strong relationships with major stakeholders.

---

<div style="display: flex; align-items: center; gap: 15px; margin-top: 30px; margin-bottom: 20px;">
  <img src="/assets/images/VFCV_1.jpg" alt="VFCV Prototype" style="height: 70px; width: auto; border-radius: 8px; object-fit: cover;">
  <h2 style="margin: 0;">🚀 2. Vertical Flight Controllable Vehicle (VFCV): Reusable Launch Vehicle</h2>
</div>
**Embedded Systems & Integration Lead | Korea Aerospace University | 2023**

This project focused on the design and flight validation of a **$6$-DOF reusable rocket prototype** for autonomous VTOL. As the Integration Lead, I managed the **hardware implementation of control algorithms**, troubleshooting systemic failures and optimizing real-time performance.

* **Award:** **Excellence Prize** at the KAU Capstone Competition.

#### **Technical Contributions:**

* **Attitude Control Optimization (Quaternion Conversion):**
    * Eliminated **Gimbal Lock** by refactoring the attitude estimation and control loop into **Quaternion-based mathematics**.
    * This modification provided a singularity-free orientation representation, maintaining robust control even during high-maneuverability flight phases (e.g., $Pitch = \pm 90^\circ$).
* **Embedded Software Deployment (C/C++):**
    * Migrated HIL-validated control algorithms to **Flight Control Computer (Raspberry Pi)**.
    * Optimized the execution logic in **C/C++** to satisfy the high-frequency control loop constraints required for stable $6$-DOF dynamics.
* **Power Distribution Network (PDN) & Hardware Reliability:**
    * Troubleshot and rectified critical **in-flight power resets** caused by voltage drops during high-current motor surges.
    * Re-engineered the battery power management and signal isolation architecture to maintain sensor data integrity and overall system reliability.
* **Field Validation & Sim-to-Real Correlation:**
    * Managed **tethered and free-flight evaluations** to validate control laws. 
    * Identified discrepancies between HILS predictions and real-world dynamics, iteratively tuning the system to mitigate the effects of mechanical vibrations and signal noise.

<div style="margin-top: 30px; margin-bottom: 30px; text-align: center;">
  <video width="100%" height="auto" controls style="border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
    <source src="/assets/images/VFCV_Flight.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <p style="font-style: italic; color: #666; margin-top: 10px;">VFCV Autonomous Flight & Vertical Stabilization Test</p>
</div>

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
