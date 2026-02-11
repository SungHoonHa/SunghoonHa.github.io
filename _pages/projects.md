---
layout: single
title: "Technical Projects"
permalink: /projects/
author_profile: true
toc: true
---

This section highlights my core engineering projects.

---
## 1. Next-Generation EV HVAC Systems & Thermal Management
**Senior Research Engineer | Hyundai WIA | 2024 – Present**

At Hyundai WIA, I have led the development of advanced thermal management systems, bridging the gap between virtual design and mass production reality.

#### **a. Kia PV5 (Dedicated PBV CargoVan): Mass Production Maturation**
*Focus: Field Engineering, Supplier Quality, and System Validation*

* **Global Recognition (2026 IVOTY Winner):** Contributed to the successful development of the PV5 platform, which made history as the first Korean vehicle to win the **"2026 International Van of the Year (IVOTY)"** with a unanimous vote. [[Official News]](https://www.kia.com/ie/about-kia/news-and-events/kia-pv5-wins-international-van-of-the-year/)
* **Manufacturing Maturation:** Spearheaded the transition to mass production by managing supplier-side mold structures and refining injection-molded part dimensions for zero-defect assembly.
* **Cross-functional Coordination:** Coordinated technical requirements between Procurement, Quality, and Production teams to resolve manufacturing bottlenecks.
* **Field Validation:** Conducted extensive real-car evaluations to suppress NVH (Whistle/Booming noise) and optimize thermal distribution for the commercial vehicle segment.
* **Benchmarking:** Analyzed competitor HVAC architectures to implement performance-enhancing features, achieving top-tier efficiency for the PV5 platform.

<div style="text-align: center; margin: 20px 0;">
  <img src="/assets/images/PV5.png" alt="Kia PV5" style="width: 80%; max-width: 400px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <p style="font-style: italic; color: #666; margin-top: 10px;">Kia PV5 - 2026 International Van of the Year</p>
</div>


#### **b. PV7 Platform (Ongoing Project): Advanced Reliability & Kinematic Design**
*Focus: DFSS/FMEA Methodologies and Precision Engineering*
* **Reliability Engineering (FMEA/DFSS):** Applied **Design for Six Sigma (DFSS)** to innovate case-locking structures and conducted **FMEA** to ensure long-term structural integrity.
* **Kinematic Optimization:** Developed complex **CAM trajectories** to improve the linearity of the **Smart Intake System**, ensuring precise control of Fresh/Recirculated air mixing.
* **CFD-to-Real-Car Correlation:** Identified and resolved discrepancies between CFD simulations and physical test data for foot-vent airflow, achieving high-fidelity performance correlation.
* **3D Packaging:** Utilized **CATIA V5** to manage dense system packaging, preventing interference with surrounding cockpit and chassis components.

<div style="text-align: center; margin: 20px 0;">
  <img src="/assets/images/PV7.png" alt="Kia PV5" style="width: 80%; max-width: 400px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <p style="font-style: italic; color: #666; margin-top: 10px;">Kia PV7 (In development)</p>
</div>

#### **c. Key Achievements & Professional Engagement**
*Focus: Global Partnerships, IP Strategy, and Customer Excellence*

* **Global Technical Representation (GM Tech Day):** Selected as a lead technical spokesperson to represent Hyundai WIA at **GM Tech Day in Detroit**. I presented next-generation HVAC roadmaps and TMS business strategies to GM’s global engineering and procurement leadership.
* **Intellectual Property (IP) Portfolio:** Leading the company’s technical innovation by authoring **7+ patents** (filed/pending) focused on high-efficiency control logic and energy-efficient thermal architectures.
* **Award for Professional Excellence:** Awarded **2nd Place in Team Customer Satisfaction** (HMG) for excellence in managing technical requirements and fostering strong relationships with major stakeholders.

---

<div style="display: flex; align-items: center; gap: 15px; margin-top: 30px; margin-bottom: 20px;">
  <h2 style="margin: 0;"> 2. Vertical Flight Controllable Vehicle (VFCV): Reusable Launch Vehicle</h2>
</div>
**Embedded Systems & Integration Lead | Korea Aerospace University | 2023**

This project focused on the design and flight validation of a **6-DOF reusable rocket prototype** for autonomous VTOL. As the Integration Lead, I managed the **hardware implementation of control algorithms**, troubleshooting systemic failures and optimizing real-time performance.

* **Award:** **Excellence Prize** at the KAU Capstone Competition.

#### **Technical Contributions:**

* **Attitude Control Optimization (Quaternion Conversion):**
    * Eliminated **Gimbal Lock** by refactoring the attitude estimation and control loop into **Quaternion-based mathematics**.
    * This modification provided a singularity-free orientation representation, maintaining robust control even during high-maneuverability flight phases (e.g., Pitch = ±90°).
* **Embedded Software Deployment (C/C++):**
    * Migrated HIL-validated control algorithms to **Flight Control Computer (Raspberry Pi)**.
    * Optimized the execution logic in **C/C++** to satisfy the high-frequency control loop constraints required for stable 6-DOF dynamics.
* **Power Distribution Network (PDN) & Hardware Reliability:**
    * Troubleshot and rectified critical **in-flight power resets** caused by voltage drops during high-current motor surges.
    * Re-engineered the battery power management and signal isolation architecture to maintain sensor data integrity and overall system reliability.
* **Field Validation & Sim-to-Real Correlation:**
    * Managed **tethered and free-flight evaluations** to validate control laws. 
    * Identified discrepancies between HILS predictions and real-world dynamics, iteratively tuning the system to mitigate the effects of mechanical vibrations and signal noise.

<div class="media-container" style="display: flex; gap: 20px; align-items: center; margin: 30px 0;">
  
  <div style="flex: 1;">
    <img src="/assets/images/VFCV_1.jpg" alt="VFCV Prototype" 
         style="width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
    <p style="text-align: center; font-style: italic; color: #666; margin-top: 10px;">VFCV Mk.2</p>
  </div>

  <div style="flex: 1;">
    <video width="100%" height="auto" controls style="border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
      <source src="/assets/videos/VFCV_Flight.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <p style="text-align: center; font-style: italic; color: #666; margin-top: 10px;">VFCV Mk.1 Autonomous Flight Test</p>
  </div>

</div>

---
<div style="display: flex; align-items: center; gap: 15px; margin-top: 30px; margin-bottom: 20px;">
  <h2 style="margin: 0;">3. Avatar-Kairos: Autonomous Vehicle Conversion</h2>
</div>
**Research Intern | UNLV (Design and Intelligent Systems Lab) | Aug 2021 ~ Jan 2022**

Collaborated within an international research team to convert a legacy electric vehicle into an autonomous research platform. I focused on the electromechanical restoration and the fabrication of custom hardware components for system integration.

#### **Technical Contributions:**

* **Electrification & System Restoration:**
    * Restored a non-functional electric powertrain and integrated **UOMO control units** to enable electronic control over steering and acceleration.
    * Managed the integration of control signals between the central processing unit and actuators, ensuring reliable system response during manual and autonomous operation modes.
* **Precision Machining & Prototyping:**
    * Manufactured custom mounting brackets and housings for **GPS units** and core electronics using **CNC machining** and manual lathes.
    * Focused on structural alignment and secure hardware mounting to ensure sensor stability during outdoor field evaluations.
* **Signal Integrity & Troubleshooting:**
    * Diagnosed and resolved intermittent **signal interference** between the central controller and actuators identified during initial field tests.
    * Refined the wiring architecture and grounding strategy to ensure consistent data transmission and prevent system resets.
* **Technical Communication & Collaboration:**
    * Documented hardware integration protocols and troubleshooting steps in a professional English-speaking environment, coordinating with the team to maintain the project timeline.

**🔗 Project Resources:** [Kairos Technical Tutorials & Wiki](https://www.daslhub.org/unlv/wiki/doku.php?id=kairos_tutorials)

<div class="media-container" style="display: flex; gap: 20px; align-items: center; margin: 30px 0;">
  
  <div style="flex: 1;">
    <img src="/assets/images/Uomo.png" alt="UNLV System Integration" 
         style="width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
    <p style="text-align: center; font-style: italic; color: #666; margin-top: 10px;">UOMO Unit</p>
  </div>

  <div style="flex: 1;">
    <video width="100%" height="auto" controls style="border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
      <source src="/assets/videos/Uomo test.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <p style="text-align: center; font-style: italic; color: #666; margin-top: 10px;">Autonomous Driving Test Video</p>
  </div>

</div>
      
---
