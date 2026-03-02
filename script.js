/* ======================================================
   ENTERPRISE APP STATE (Simulated Database Layer)
====================================================== */

const AppState = {

    currentUser: {
        id: 1,
        name: "Business Owner",
        role: "owner"
    },

    business: {
        id: 101,
        name: "Biashara Enterprise",
        location: "Nairobi, Kenya",
        currency: "KES",
        taxRate: 0
    },

    products: [
        {
            id: 1,
            name: "Sukuma Wiki",
            category: "Vegetables",
            price: 50,
            stock: 12,
            reorderLevel: 5,
            supplier: "Local Farmer",
            image: "https://images.unsplash.com/photo-1594282486512-ad48c9030b42?auto=format&fit=crop&q=60&w=150"
        },
        {
            id: 2,
            name: "Tray of Eggs",
            category: "Retail Goods",
            price: 450,
            stock: 6,
            reorderLevel: 3,
            supplier: "Kikuyu Poultry",
            image: "https://images.unsplash.com/photo-1582722872445-44ad5c78a9dd?auto=format&fit=crop&q=60&w=150"
        },
        {
            id: 3,
            name: "Tilapia",
            category: "Fish",
            price: 300,
            stock: 2,
            reorderLevel: 5,
            supplier: "Lake Victoria Supplier",
            image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=60&w=150"
        }
    ],

    sales: [],
    expenses: [],
    cart: [],
    activityLog: []

};
/* ======================================================
   ENTERPRISE THEME ENGINE (Auto Dark / Light)
====================================================== */

const ThemeEngine = {

    init() {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            this.applyTheme(savedTheme);
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            this.applyTheme(prefersDark ? "dark" : "light");
        }
    },

    applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    },

    toggleTheme() {
        const current = document.documentElement.getAttribute("data-theme");
        const newTheme = current === "dark" ? "light" : "dark";
        this.applyTheme(newTheme);
    }

};
/* ======================================================
   APPLICATION INITIALIZATION
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Biashara Navigator Enterprise Starting...");

    // 1️⃣ Initialize Theme
    ThemeEngine.init();

    // 2️⃣ Initialize Navigation
    NavigationEngine.init();

    // 3️⃣ Initialize Inventory
    InventoryEngine.init();

    // 4️⃣ Initialize POS
    POSEngine.init();

    // 5️⃣ Initialize Analytics
    AnalyticsEngine.init();

    // 6️⃣ Initialize Modals
    ModalEngine.init();

});
/* ======================================================
   NAVIGATION ENGINE (Sidebar Switching)
====================================================== */

const NavigationEngine = {

    init() {
        this.menuItems = document.querySelectorAll(".menu-item");
        this.views = document.querySelectorAll(".view");

        this.menuItems.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                const targetView = item.getAttribute("data-view");
                this.switchView(targetView);
            });
        });
    },

    switchView(viewId) {

        // Remove active from all menu items
        this.menuItems.forEach(item => {
            item.classList.remove("active");
        });

        // Hide all views
        this.views.forEach(view => {
            view.classList.remove("active-view");
            view.style.display = "none";
        });

        // Activate selected menu item
        const activeMenu = document.querySelector(`.menu-item[data-view="${viewId}"]`);
        if (activeMenu) {
            activeMenu.classList.add("active");
        }

        // Show selected view
        const activeView = document.getElementById(viewId);
        if (activeView) {
            activeView.style.display = "block";
            activeView.classList.add("active-view");
        }

        // Update page title dynamically
        const pageTitle = document.getElementById("dynamic-page-title");
        if (pageTitle) {
            pageTitle.innerText = viewId.charAt(0).toUpperCase() + viewId.slice(1);
        }

    }

};