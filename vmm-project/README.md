# 🖥️ Virtual Memory Management System
### Operating Systems University Project

A full-featured interactive tool to visualize virtual memory concepts including paging, segmentation, page replacement algorithms, and memory fragmentation.

---

## 🚀 How to Run

### Prerequisites
- Node.js (v14 or higher) — no npm packages required!

### Start the Server
```bash
node server/index.js
```
Then open: **http://localhost:3000**

---

## 📚 Features

### 1. Page Replacement Algorithms
- **LRU** (Least Recently Used)
- **Optimal** (Bélády's Algorithm)
- **FIFO** (First In First Out)
- Step-by-step mode for educational walkthroughs
- Visual page fault/hit highlighting

### 2. Paging Visualization
- Virtual-to-physical address mapping
- Page table with valid/dirty bits
- Address translation calculator
- Demand paging simulation

### 3. Memory Segmentation
- Custom segment builder (Code, Data, Stack, Heap...)
- Base + Limit register visualization
- Internal fragmentation analysis

### 4. Algorithm Comparison
- Side-by-side LRU vs Optimal vs FIFO
- Bar chart performance visualization
- Automatic analysis and recommendations

### 5. Memory Fragmentation Simulator
- Interactive First Fit / Best Fit / Worst Fit allocation
- Click blocks to free memory
- Memory compaction
- Real-time fragmentation percentage

---

## 🛠️ Tech Stack
- **Backend**: Node.js (pure `http` module, no frameworks)
- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript
- **Fonts**: Google Fonts (Orbitron, Share Tech Mono, Exo 2)

---

## 📁 Project Structure
```
vmm-project/
├── package.json
├── server/
│   └── index.js          ← Node.js HTTP server + algorithm implementations
└── public/
    ├── index.html         ← Main UI
    ├── css/
    │   └── style.css      ← All styles
    └── js/
        └── app.js         ← Frontend logic
```

---

## 🔌 REST API Endpoints

| Method | Endpoint         | Description                     |
|--------|------------------|---------------------------------|
| POST   | /api/lru         | LRU page replacement simulation |
| POST   | /api/optimal     | Optimal algorithm simulation    |
| POST   | /api/fifo        | FIFO algorithm simulation       |
| POST   | /api/compare     | Compare all three algorithms    |
| POST   | /api/paging      | Paging & page table simulation  |
| POST   | /api/segmentation| Memory segmentation simulation  |

---

## 📖 Concepts Covered
- Virtual Memory, Physical Memory
- Paging & Page Tables (Valid Bit, Dirty Bit)
- Page Faults & Demand Paging
- Segmentation with Base/Limit Registers
- LRU, Optimal, and FIFO Page Replacement
- Internal & External Fragmentation
- Memory Compaction
- First Fit, Best Fit, Worst Fit Allocation
