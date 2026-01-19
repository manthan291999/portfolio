# 🚀 Manthan Mittal - AI Engineer Portfolio

![Portfolio Preview](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

A modern, immersive 3D portfolio website showcasing my work as an AI Engineer. Built with cutting-edge web technologies for a stunning visual experience.

## ✨ Features

- 🎮 **Interactive 3D Robot** - Animated 3D robot model with textures using React Three Fiber
- 🌌 **Particle Background** - Dynamic starfield and particle effects
- 🎨 **Cyberpunk Aesthetic** - Neon colors, glowing effects, and futuristic UI
- ⚡ **Smooth Animations** - Framer Motion powered transitions and scroll effects
- 📱 **Fully Responsive** - Optimized for all screen sizes
- 🔊 **Text-to-Speech** - Robot greets visitors with voice synthesis
- 📧 **Contact Form** - Powered by Resend for reliable email delivery
- 🚀 **Optimized for Vercel** - Edge-ready with speed insights

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React Framework |
| [React 19](https://react.dev/) | UI Library |
| [TypeScript](https://www.typescriptlang.org/) | Type Safety |
| [Three.js](https://threejs.org/) | 3D Graphics |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js |
| [Drei](https://github.com/pmndrs/drei) | R3F helpers |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [TailwindCSS](https://tailwindcss.com/) | Styling |
| [Resend](https://resend.com/) | Email Service |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/manthan291999/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Resend API key:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

This project is optimized for **Vercel** deployment:

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variable `RESEND_API_KEY` in project settings
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/manthan291999/portfolio)

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── source/          # 3D model files (OBJ)
│   ├── textures/        # 3D model textures
│   └── og-image.png     # Open Graph image
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── api/         # API routes (contact form)
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/
│   │   ├── canvas/      # 3D components (RobotHero)
│   │   ├── Hero.tsx     # Hero section
│   │   ├── About.tsx    # About section
│   │   ├── Skills.tsx   # Skills section
│   │   ├── Projects.tsx # Projects showcase
│   │   └── Contact.tsx  # Contact form
│   └── data/            # Site configuration
├── vercel.json          # Vercel configuration
└── tailwind.config.js   # Tailwind configuration
```

## 🎨 Customization

### Update Personal Info
Edit `src/data/siteConfig.ts`:
```typescript
export const siteConfig = {
  name: "Your Name",
  tagline: "Your Tagline",
  // ...
};
```

### Change 3D Model
Replace files in `public/source/` and `public/textures/` with your own OBJ model and textures.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- 3D Robot Model from [Sketchfab](https://sketchfab.com)
- Icons from [Lucide](https://lucide.dev)
- Fonts from [Google Fonts](https://fonts.google.com)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/manthan291999">Manthan Mittal</a>
</p>