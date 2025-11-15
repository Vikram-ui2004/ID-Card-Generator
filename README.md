# 🎟️ ID Card Generator (React + Tailwind + Framer Motion)

A fully customizable **ID Card Generator** built with **React**, **Tailwind CSS**, and **Framer Motion**.  
Users can select templates, drag-and-drop text, upload photos, customize fonts, change colors, preview their card live, and export high-quality **PNG** or **PDF** files.

This project is ideal for:
- Tech fest organizers  
- College event coordinators  
- Hackathon teams  
- Startups generating employee ID cards  
- Automated digital badge creators  

---

## 🚀 Features

### 🎨 Template & UI Features
- Pre-built **ID Card templates**
- Fully responsive modern user interface
- Sidebar with real-time controls
- Smooth animations via **Framer Motion**
- Professional, minimal dashboard-style layout

### ✏️ Customization Tools
- Drag-and-drop **text boxes**
- Drag-and-drop **profile photo**
- Edit text content (name, team/college, etc.)
- Change:
  - Font family
  - Font size
  - Font color
  - Bold style
  - Text alignment (left / center / right)
- Enable/Disable portrait image
- Adjust portrait size
- Live background color selector
- Dynamic card size control

### 🖼 Live Preview
- High-quality card preview  
- Optional grid overlay for alignment  
- Template background rendered behind elements  

### 📤 Export Tools
- Export **PNG (High Resolution)**
- Export **PDF (A4 centered)**
- Direct printing option
- Ensures **high DPI output (3× scaling)**  
- Export waits for fonts to load before rendering

---

## 🔧 Technologies Used

- **React 18**
- **Tailwind CSS**
- **Framer Motion** (drag support)
- **html-to-image** (PNG export)
- **jsPDF** (PDF export)
- **Vite** or **CRA** compatible

---

## 📁 Folder Structure

```

project/
│
├── public/
│   └── templates/
│       ├── template1.png
│       ├── template2.png
│       └── template3.png
│
└── src/
├── components/
│   ├── IDCardCanvas.jsx
│   ├── Sidebar.jsx
│   ├── TemplateSelector.jsx
│   ├── DownloadButtons.jsx
│   ├── Toolbar.jsx
│   └── icons.jsx
│
├── data/
│   ├── templates.js
│   └── fonts.js
│
├── App.jsx
├── index.css
└── main.jsx

````

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/id-card-generator.git
cd id-card-generator
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Install additional required packages

```bash
npm install framer-motion html-to-image jspdf
```

### 4️⃣ Start the development server

```bash
npm run dev
```

Your app will run at:
**[http://localhost:5173](http://localhost:5173)**

---

## 🧩 Usage Guide

### 1. Select a Template

Choose any template from the left sidebar.
Templates should be stored inside:

```
public/templates/
```

### 2. Edit Text Fields

You can:

* Change name, college/team, etc.
* Move text around the card (drag)
* Change font (Poppins, Roboto, Times New Roman…)
* Adjust colors & sizes

### 3. Upload a Profile Photo

Upload a JPG/PNG image.
Drag it into position.
Resize through the sidebar options.

### 4. Adjust Card Layout

* Set card width & height
* Change background color
* Enable grid for neat alignment

### 5. Export the Card

You can export as:

#### → **PNG**

High-resolution PNG using `html-to-image`.

#### → **PDF**

A4 PDF with the card centered.
Useful for printing badges.

#### → **Print**

Opens a print dialog with the card rendered at high DPI.

---

## ⚠️ Important: CORS Rules for Images

To export PNG/PDF correctly, **ALL images must be CORS-safe**.

### ✔ Images that work:

* Local images from `public/templates/`
* Base64 images (uploaded user photos)

### ❌ Images that WILL BREAK export:

* External images without CORS headers

  ```
  Access-Control-Allow-Origin: *
  ```

If even **one image** violates CORS, the export fails with errors like:

```
PNG Export Error: Event
PDF Export Error: Event
```

### ✔ Solution:

Always keep template images inside:

```
public/templates/
```

And use:

```jsx
<img src="/templates/template1.png" crossOrigin="anonymous" />
```

---

## 🛠 Developer Notes

### Framer Motion for Dragging

Dragging is implemented using:

```jsx
<motion.div drag dragMomentum={false} />
```

This eliminates the old `react-draggable` issues in React 18.

### High DPI Export

The app exports with:

```js
pixelRatio: 3
```

You may change to `2` for lower file size.

---

## 🤝 Contributing

Pull requests are welcome!

If you want to:

* Add text rotation
* Add resizable elements
* Add bulk CSV ID card generation
* Add QR codes
* Improve export quality

Feel free to open an issue or PR.

---

## 📜 License

MIT License © 2025
You are free to modify and use this project in events, hackathons, commercial apps, or college projects.

---

## 🌟 Author

Built by **Vikram Nayak**
Web Developer • React & MERN Stack • IAMR College

---

# 🎉 Happy ID Card Generating!

```

---

If you want, I can also create:

📦 `README.pdf`  
📦 A GitHub-ready project structure  
📦 A ZIP file of the full working project  

Just tell me!
```
