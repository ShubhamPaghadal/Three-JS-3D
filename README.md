# 🏠 3D Interactive Plotting System (Beginner's Guide)

Welcome! This project is a digital interactive map for real estate. Imagine a "Google Maps" but specifically for a housing colony or a piece of land where you can click on individual plots to see their information.

---

## 🌟 1. What is this project? (Simple Terms)
In simple words, we are creating a **3D World** (The Canvas) and placing **Boxes** (The Plots) on it.
- **The Brain (Zustand)**: Remembers which plot you clicked on.
- **The Map (Canvas)**: Where you see the plots and move around.
- **The Info Menu (Overlay)**: The text and buttons you see on top of the map.

---

## 🛠️ 2. Step-by-Step: How to build it

### Step 1: Render Plots on Canvas
We have a list of data (like an Excel sheet). We use a `map` function to look at each item in the list and draw a 3D box at its X and Z coordinates.

### Step 2: Detect Click on a Plot
Every plot box has a "sensor" called `onClick`. When you click the box, it sends the ID of that plot to the "Brain" (Store).

### Step 3: Highlight Selected Plot
Inside the plot box, we check: *"Is my ID the same as the Selected ID in the Brain?"*
- If **Yes** -> Change color to **Blue** (Highlight).
- If **No** -> Keep original color.

### Step 4: Show Plot Details
The Info Menu (UI) also talks to the "Brain". When it sees a `selectedPlotId`, it automatically shows the Area (e.g., 1800 sqft) and Dimensions (e.g., 40x45) for that specific plot.

### Step 5: Apply Status Filters
We have a "Status Switch". When you turn it **ON**:
- The plots look at their "Status" (Available, Booked, etc.).
- They change their color: **Green** for Available, **Red** for Booked, **Yellow** for On Hold.

---

## ❓ 3. Frequently Asked Questions (Your Doubts)

### Can I use a ready-made template/design from a client?
**Yes!** This is very common. You take the client's design image and place it as a "floor" in the 3D world. Then, you place your interactive boxes exactly on top of the plots shown in that image.

### How to show different colors for status (Toggle)?
You create a list of colors:
- `available` -> Green
- `booked` -> Red
- `on-hold` -> Yellow
When the user clicks the "Status Toggle" button, the plots simply switch from their "Basic" color to their "Status" color.

### How to select a plot without filters?
Selecting a plot and showing status colors are two different things. Clicking a plot always saves its ID in the "Brain". The filters only change the **colors**, they don't stop you from clicking!

### How to manage logic properly?
Keep things separate:
1. **Data**: Keep all plot info in one file.
2. **Logic**: Keep the "Brain" (Zustand Store) in its own folder.
3. **Components**: Keep 3D parts and UI parts in different folders.

---

## 🏗️ 4. Real-World Project Structure
```text
/store        -> The "Brain" (remembers selection and status)
/components
  /3d         -> The "Map" (renders the boxes and ground)
  /ui         -> The "Menu" (shows the area and buttons)
/types        -> The "Dictionary" (defines what a 'Plot' looks like)
```

---

## 🚀 How to Run
1. Install: `npm install`
2. Run: `npm run dev`
3. View: Open `http://localhost:3000` in your browser.
