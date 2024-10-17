# HachDraw


**HachDraw** is a front-end application that allows users to view pages with images, apply hatching effects, zoom on images and remove hatching with clicks.

## 🌐 Project URL
Access the production version of the project at [www.hachdraw.com](https://guilhermemuller13.github.io/hachdraw/)

## 🛠 How to run the project locally

To run the project locally, follow the steps below:

1. **Clone the repository:

  ```bash
  git clone https://github.com/Guilhermemuller13/hachdraw.git
   ```

2. **Open the project in VSCode**:

- Navigate to the directory of the cloned project and open Visual Studio Code.

3. **Install the “Live Server” extension in Visual Studio Code:

- Go to the extensions tab (square icon in the side menu or `Ctrl+Shift+X`).
- Search for **Live Server** by **Ritwick Dey** and install.

4. **Start the project with Live Server:

- With the `index.html` file open, right-click and select **“Open with Live Server”**.
- Live Server will start a local version of the project in your default browser.

5. **Local access URL**:
After starting Live Server, the application will be accessible at: [http://127.0.0.1:5500/](http://127.0.0.1:5500/) (or depending on the port configured).

---
## 🎨 Figma and Design System
The **HachDraw** design was created using **Figma**. The entire design system of the project is documented, including color palette, typography, spacing, and reusable components.

- Figma URL: [www.figma.com](https://www.figma.com/design/EjVAof9Fwj0KPWUoyPmpV7/HACHDRAW?m=auto&t=tawcTRIXTnaNUaNr-1)


### **Design System**:
The design system guarantees visual and functional consistency to the project. It includes:

- **Color palette**: Definition of primary, secondary, background, icon and grid colors.
- Components:
    - **Buttons**
    - Navbar
    - **Footers**

### **Pages created in Figma**:
1. **Cover**: Displays a project cover
2. **Design System**: Shows the definition of colors, grids and icons.
3. **Web: Shows the components used, as well as the main page.
---
## ⚙️ Code Organization
The project was developed with a clear division of responsibilities, both in CSS and JavaScript.


### JavaScript:
The JavaScript code was divided into specific files, each responsible for a different functionality:

- **`controlHatching.js`**: Manages the logic for drawing, applying and removing hatches in images.
- **`controlModeDraw.js`**: Defines and manages drawing modes or just visualization.
- **`controlPaginate.js`**: Implements navigation and pagination functionality between different images.
- **`index.js`**: Main file that integrates all the functionalities, starting the application.
- **`utils.js`**: Contains functions for persisting data in storage.

### CSS:
The CSS files have been organized by component, ensuring that each one has a clear scope and avoids overlapping styles:


- **`content.css`**: Styles applied to the main content of the application.
- **`footer.css`**: Specific styles for the footer.
- **`navbar.css`**: Styles related to the navigation bar.
- **`index.css`**: General styles for the main page and layout, including reset and base styles for the entire project.
---

## 🚀 Main features

1. **Upload and display images.
2. **Apply hatches (in the shape of squares) to any area of the image.
3. **Zoom in/out** with the mouse wheel, centered on the cursor's focus point.
4. **Remove hatches individually with a click**.
5. **Save and restore hatches for each image using `localStorage`.

---
## 🔧 Technologies Used
- **HTML5**
- **CSS3**
- **JavaScript (ECMAScript 6)**
- **Canvas API** (for graphic manipulation)



