# 💖 SheMatters - Empowering Women's Mental Health

🌐 **Live Demo:**  
- 🔗 [Frontend](https://shematters.netlify.app/)  
- 🛠️ [Backend API](https://shematters-production.up.railway.app/)

**SheMatters** is an online psychotherapy platform designed exclusively for women in Pakistan. It provides a **safe, judgment-free digital space** where women can access certified mental health professionals, share their stories, track their mental health progress, and connect with others going through similar experiences.

---

## 🚀 Features

- 👩‍⚕️ **One-on-One Therapy Sessions**
- 📔 **Journaling Tool** to track mood and emotional well-being
- 📅 **Appointment Scheduling System**
- 🔐 **Secure Login/Signup with Role-Based Authentication**
- 💬 **Video/Audio Calls** with Psychologists 
- 📰 **Blog Section** to learn about mental health topics (Planned)
- 📈 **Progress Dashboard** for users to see their journey
- 🎗️ **Community Forums** for anonymous discussions (Planned)

---

## 🛠️ Tech Stack

| Layer         | Technology Used                             |
|---------------|---------------------------------------------|
| **Frontend**  | React.js, Material UI, Tailwind CSS, RTK Query |
| **Backend**   | Node.js, Express.js                         |
| **Database**  | MongoDB (Mongoose)                          |
| **Authentication** | JWT + HTTP-only Cookies, RBAC (Role-Based Access Control) |
| **APIs**      | RESTful APIs (built using Express)          |
| **Communication** | Socket.IO (Real-Time Chat), Peer.js + WebRTC (Video/Audio Calls) |
| **State Management** | Redux Toolkit (RTK Query for API handling) |

---

## 📷 UI Snapshots

| Home Page | Therapist Profile | Journal |
|-----------|-------------------|---------|
![Screenshot 2025-04-22 214238](https://github.com/user-attachments/assets/dea54af5-935a-4ca4-ab72-f59ea786fae6)
![Screenshot 2025-04-22 214344](https://github.com/user-attachments/assets/5c32b7bb-ae4e-4dd6-82b1-8c13461471be)
![Screenshot 2025-04-22 214726](https://github.com/user-attachments/assets/4d434359-cd0c-4d51-804d-9898679066e6)
![Screenshot 2025-04-22 214828](https://github.com/user-attachments/assets/4fa7cbdc-e2c8-4cb1-b375-3ceff9ea689a)


---

## 📦 Installation Instructions

```bash
# 1. Clone the repository
git clone https://github.com/your-username/she-matters.git

# 2. Go into the project directory
cd she-matters

# 3. Install frontend dependencies
cd frontend
npm install

# 4. Install backend dependencies
cd backend
npm install

# 5. Set up environment variables
Create a `.env` file in backend with:
- MONGO_URI
- JWT_SECRET
- PORT (optional)

# 6. Run the backend server
npm start

# 7. Run the frontend
cd frontend
npm run dev
