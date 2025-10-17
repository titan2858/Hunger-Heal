# 🍽️ HungerHeal: Food Donation & Distribution Platform

A modern, full-stack web application designed to bridge the gap between food surplus and food scarcity. **HungerHeal** provides a seamless platform for donors to donate excess food, which is then efficiently assigned to collection agents (receivers) for distribution to those in need.

---

## ✨ Key Features

HungerHeal is built with a **role-based architecture** to serve different user needs effectively.

### 👩‍🍳 For Donors
* **Easy Donation Process:** A user-friendly form to list food details, quantity, and pickup information.
* **Interactive Map:** Select the exact pickup location using an interactive map powered by **Leaflet**.
* **Image Uploads:** Provide a photo of the food for agents to view.
* **Dynamic Dashboard:** View real-time stats on all donations.
* **Track Donations:** Keep track of pending and previous donations in separate, organized views.
* **Editable Profiles:** Manage personal information, including address for geocoding.

### 🚚 For Agents (Receivers)
* **Dynamic Dashboard:** Get a quick overview of pending and completed collections.
* **Assigned Collections:** View a detailed list of all donations assigned for pickup.
* **Donation Details:** Access complete donation information, including donor contact, address, and food photo, on a dedicated page.
* **Status Updates:** Mark donations as "Collected" or "Rejected" with a single click.

### 🧑‍💼 Admin Panel (Manual Assignment)
* **Donation Management:** Admins can view all incoming donation requests.
* **Manual Assignment:** Donations can be manually assigned to available agents based on proximity or availability.
* **Status Overview:** Track all donations across different statuses for transparency.

---

## 🛠️ Tech Stack

The project is built using a **modern MERN-like stack**, separated into frontend and backend.

### 🖥️ Frontend
* **Framework:** React.js (with Vite)
* **Styling:** Tailwind CSS
* **UI Components:** Shadcn/ui
* **Routing:** React Router DOM
* **Animations:** Framer Motion
* **Mapping:** React Leaflet
* **API Calls:** Axios

### ⚙️ Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (with Mongoose)
* **Authentication:** JSON Web Tokens (JWT) & bcrypt.js
* **File Uploads:** Multer
* **Geocoding:** OpenCage Geocoding API

---

## 🚀 Getting Started

Follow these steps to get a local copy of **HungerHeal** up and running.

### 📋 Prerequisites
Before you begin, make sure you have:
* Node.js and npm installed
* A MongoDB Atlas account (or local MongoDB instance)
* An API key from [OpenCage Geocoding](https://opencagedata.com/)

---

## ⚙️ Backend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/hungerheal.git
cd hungerheal

# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory and add the following variables:
# (You can create this manually or using echo commands)
echo "MONGO_URI=your_mongodb_connection_string" >> .env
echo "JWT_SECRET=your_jwt_secret_key" >> .env
echo "PORT=5000" >> .env
echo "OPENCAGE_API_KEY=your_opencage_api_key" >> .env

# Run the backend server
npm run dev

# The backend will start on http://localhost:5000
