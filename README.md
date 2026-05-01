# 🗳️ Know-Vote — BharatVote Guide
### भारत निर्वाचन मार्गदर्शिका

> A bilingual (Hindi & English) web guide that educates Indian citizens about the complete election process, voter registration, and their democratic rights.

---

## 📖 About

**Know-Vote** (BharatVote Guide) is a React-based web application designed to make the Indian electoral process easy to understand for every citizen. It provides clear, accessible information about voting procedures, voter registration, and democratic rights — available in both **Hindi** and **English**.

---

## ✨ Features

- 🌐 **Bilingual Support** — Full content in Hindi (Devanagari) and English
- 📋 **Election Process Guide** — Step-by-step walkthrough of the Indian election process
- 🗂️ **Voter Registration Info** — How to register, check, and update voter details
- 🏛️ **Democratic Rights** — Know your rights as an Indian voter
- 📱 **Responsive Design** — Works seamlessly on mobile and desktop
- ⚡ **Fast & Lightweight** — Built with Vite for near-instant load times
- 🐳 **Docker Ready** — Optimized for Google Cloud Run deployment

---

## 🛠️ Tech Stack

| Technology | Version |
|---|---|
| React | 19 |
| TypeScript | 5.9 |
| Vite | 7 |
| Tailwind CSS | 4 |
| Framer Motion | 12 |
| Lucide React | 1.14 |
| Docker + Nginx | Alpine |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Shubh2026/Know-Vote.git
cd Know-Vote

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🐳 Docker

This project is optimized for containerized deployment on **Google Cloud Run**.

### Build & Run with Docker

```bash
# Build the image
docker build -t know-vote .

# Run the container
docker run -p 8080:8080 know-vote
```

The app will be available at `http://localhost:8080`.

### Docker Architecture

The Dockerfile uses a **multi-stage build**:
1. **Stage 1 (Builder)** — Node 20 Alpine builds the React app
2. **Stage 2 (Production)** — Nginx Alpine serves the static files, keeping the image minimal

---

## 📁 Project Structure

```
Know-Vote/
├── public/
│   └── images/          # Static assets
├── src/                 # React source code
├── index.html           # App entry point
├── Dockerfile           # Multi-stage Docker build
├── nginx.conf           # Nginx configuration
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source. See the repository for details.

---

<p align="center">Made with ❤️ for Indian Democracy 🇮🇳</p>
