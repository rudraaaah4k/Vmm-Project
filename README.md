💻 Virtual Memory Management Visualizer
An interactive, educational simulator for Virtual Memory Management in Operating Systems.
This tool visualizes Paging, Segmentation, Fragmentation, and Page Replacement Algorithms (LRU & Optimal) with step-by-step execution and real-time output.

🧠 Project Description
The Virtual Memory Management Visualizer is designed to simplify complex OS concepts by providing a hands-on simulation environment.

Users can:
Input custom memory configurations
Observe how pages are loaded into frames
Analyze page faults and hits
Compare different page replacement strategies
Understand segmentation and fragmentation visually

✨ Features
🔹 Paging & Page Replacement Simulator
Custom page reference string input
Adjustable number of frames
Simulates:
LRU (Least Recently Used)
Optimal Algorithm
Displays:
Step-by-step frame allocation
Page Hit / Fault status (color-coded)
Total page faults & hits
Hit ratio calculation

🔹 Segmentation Simulator
Input:
Segment base addresses
Segment limits
Segment number & offset
Features:
Logical → Physical address translation
Detection of invalid access
Segmentation fault simulation

🔹 Fragmentation Simulator
Input:
Memory block sizes
Process sizes
Features:
Allocation simulation
Remaining memory display
Visualization of internal & external fragmentation

🔹 Interactive UI
Tab-based navigation:
Paging & Replacement
Segmentation
Fragmentation
Clean dashboard layout
Reset functionality for each module
Real-time output updates

📊 Simulation Output
The simulator provides:
Step-by-step execution table
Frame-by-frame memory allocation
Page Hit / Fault status
Total page faults and hits
Hit ratio calculation

🧠 Concepts Covered
Virtual Memory
Paging
Segmentation
Page Fault
Demand Paging
Internal Fragmentation
External Fragmentation
LRU Algorithm
Optimal Algorithm
🛠 Tech Stack
Layer	Technology
Frontend	HTML5
Styling	CSS3
Logic	JavaScript (ES6)
UI	Browser DOM
Version Control	GitHub

📂 Project Structure
virtual-memory-management/
├── index.html        # Main UI structure
├── style.css         # Styling and layout
├── script.js         # Simulation logic
└── README.md         # Project documentation


📚 References
Operating System Concepts — Silberschatz
Modern Operating Systems — Tanenbaum
MDN Web Docs
GeeksforGeeks
