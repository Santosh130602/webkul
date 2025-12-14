
#  Mini E-Commerce Store

A modern, responsive **E-Commerce web application** built with **Next.js (App Router)**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**.
It supports product listing, search, filter, sorting, pagination, cart management, and checkout flow.

---

##  Live Demo

`https://webkul.vercel.app/`

---

##  Features

*  Product listing from Fake Store API
*  Search products by name
*  Filter by category
*  Sort by price, rating, and name
*  Pagination (8 products per page)
*  Add to cart / remove from cart
*  Increase / decrease quantity
*  Cart badge with item count
*  Checkout flow (clears cart)
*  Fully responsive (mobile, tablet, desktop)
*  Optimized with `useMemo`
*  Type-safe with TypeScript

---

##  Tech Stack

* **Framework:** Next.js 16.0.7 (App Router)
* **Language:** TypeScript (TSX)
* **State Management:** Redux Toolkit
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **API:** Fake Store API
* **Image Optimization:** Next/Image

---

##  Project Structure

```
app/
├── products/
│   ├── page.tsx
│   └── [id]/page.tsx
├── cart/page.tsx
├── store/
│   ├── index.ts
│   └── slices/cartSlice.ts
├── components/
│   ├── products/ProductCard.tsx
│   └── ui/
│       ├── header.tsx
│       └── ProductCartItem.tsx
│       └── footer.tsx
├── types/
│   └── index.ts
├── layout.tsx
├── page.tsx
└── globals.css
```

---

##  Installation & Setup

### 1️ Clone the repository

```bash
git clone https://github.com/Santosh130602/webkul.git
cd webkul
```

### 2️ Install dependencies

```bash
npm install
# or
yarn install
```

### 3️ Run the development server

```bash
npm run dev
```

Open 👉 `http://localhost:3000`

---

##  Available Scripts

```bash
npm run dev     
npm run build   
npm run start   
npm run lint    
```

---

##  Cart Logic (Redux)

* Cart items are stored in Redux
* Quantity updates handled via reducers
* Cart badge updates automatically
* Checkout clears the cart

---


##  Future Improvements

*  Authentication
*  Real payment integration
*  Wishlist
*  Dark mode
*  Unit testing
*  SEO enhancements

---

##  Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a Pull Request

---

##  License

This project is licensed under the **MIT License**.

---

##  Author

**Santosh Kumar Pal**
📧 Email: *[santoshpal1306@gmail.com](mailto:santoshpal1306@gmail.com)*
🔗 GitHub: [https://github.com/Santosh130602](https://github.com/Santosh130602)

---

