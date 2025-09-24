# 📦 Project Information Suite

**A professional toolkit for synchronizing, exporting, and visualizing project metadata.** This suite establishes a single source of truth for project information, ensuring consistency across standard data formats while powering rich, interactive web interfaces that are always up-to-date.

---

## 🎯 Project Goal & Vision

This initiative introduces a comprehensive strategy for unifying project metadata through a single, central file: **The Core Manifest**.

In the current development ecosystem, critical project information is often scattered across various specialized formats. While standards like **SPDX** excel at licensing, **CodeMeta** at academic metadata, and **CFF** at citation, a truly comprehensive, developer-centric manifest is missing.

**Our mission is not to replace these standards, but to integrate them.** The Core Manifest is designed to be the single source of truth that contains all essential project information and acts as a central hub, linking to or containing data for these specialized formats.

By advocating for the adoption of this unified file across all IDEs and development tools, we aim to:
* Establish a clear, consistent standard for all software projects.
* Enhance interoperability between development tools.
* Simplify project setup and automation for developers and CI/CD pipelines.

This repository provides the reference implementation, schema definitions, and tools to drive this vision forward.

---

## 🌟 Overview

This project provides a robust, streamlined solution for maintaining your project's metadata. It is built upon a **"single source of truth"** philosophy and consists of two primary, interconnected components:

1.  **🧠 Data Synchronization & Export Engine (`converter_pro.py`)** A powerful Python script that performs two critical tasks:
    * **Synchronization:** It reads data from a master file (e.g., `PROJECTINFO.md`) and injects it directly into the project's web visualization assets.
    * **Exporting:** It generates and exports the data into all other standard formats (`.json`, `.yaml`, `.xml`) within a clean `output` directory.

2.  **🌐 Data-Driven Web Visualizations** A set of pre-built, professional single-page applications that consume the synchronized data to provide insightful views of the project. The data is managed externally, allowing the HTML files to remain clean and focused on structure.

---

## ✨ Features

* **Single Source of Truth:** Modify your data in one place (`.md`, `.json`, `.yaml`, or `.xml`) and let the script handle the rest.
* **Dynamic Data Injection:** Automatically updates the data objects within the external JavaScript files (`/assets/js/*.js`), ensuring the web visualizations always display the latest information instantly.
* **Multi-Format Export:** Seamlessly generates `.json`, `.yaml`, `.xml`, and a rich `.md` file from your source file.
* **Automatic Source Detection:** The script intelligently finds the source file in the root directory to use as the master record.
* **Clean Separation of Concerns:** The project structure is organized professionally, separating HTML structure, CSS styling, and JavaScript logic and data.
* **Interactive Dashboard:** A dynamic SPA (`interactive_dashboard.html`) for exploring project details through a clean, multi-view interface with charts and data cards.
* **Data-Driven Infographic:** A beautiful, single-page infographic (`project_infographic.html`) that tells a compelling visual story of the project's key metrics, tech stack, and team.
* **Zero Dependencies for Viewers:** The HTML visualizations are self-contained and can be opened in any modern web browser without a backend or special setup.

---

## 🚀 Getting Started

Follow these simple steps to get the project running.

### 🔧 Prerequisites

* Python 3.x
* `pip` for installing Python libraries

### 📥 Installation & Setup

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd <your-repository-directory>
    ```
2.  Install the required Python libraries:
    ```bash
    pip install ruamel.yaml xmltodict dicttoxml
    ```

---

## 🛠️ Usage Workflow

The workflow is designed to be simple and efficient.

### Step 1: Update Your Master Data File

Choose **one** of the root data files (`PROJECTINFO.md`, `.json`, `.yaml`, or `.xml`) to be your single source of truth. Open it and make any necessary changes to the project information.

### Step 2: Run the Synchronization Script

Execute the main script from your terminal:
```bash
python converter_pro.py
````

### What Happens Next?

The script performs two actions simultaneously:

1.  **Visuals are Updated:** The data inside `assets/js/dashboard_script.js` and `assets/js/infographic_script.js` is instantly overwritten with your new information.
2.  **Data is Exported:** A new `/output` directory is created (or cleaned) and populated with the freshly generated `.md`, `.json`, `.yaml`, and `.xml` files.

### Step 3: View the Results

  * **Check the Visualizations:** Simply refresh `interactive_dashboard.html` or `project_infographic.html` in your browser to see the live updates.
  * **Use the Exported Data:** The files in the `/output` directory are ready for use in other systems, APIs, or for distribution.

## 📁 Project Structure

This is the final, organized structure of the project.

```text
.
├── assets/
│   ├── css/
│   │   ├── dashboard_styles.css      # Styles for the Dashboard
│   │   └── infographic_styles.css    # Styles for the Infographic
│   └── js/
│       ├── dashboard_script.js       # Logic & DATA for the Dashboard
│       └── infographic_script.js     # Logic & DATA for the Infographic
│
├── 🐍 converter_pro.py                # The main synchronization & export script
├── 📄 PROJECTINFO.md                   # Example master data file (source of truth)
├── 📊 interactive_dashboard.html       # The interactive dashboard SPA (clean structure)
├── 📈 project_infographic.html         # The project infographic SPA (clean structure)
└── 📜 README.md                        # This file

./output/                                 <-- Auto-generated on script run
    ├── PROJECTINFO.md
    ├── PROJECTINFO.json
    ├── PROJECTINFO.xml
    └── PROJECTINFO.yaml
```

```
```
