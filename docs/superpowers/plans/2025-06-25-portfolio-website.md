# Portfolio Website 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 构建 Meng Wen 的求职导向个人作品集网站，使用滚动叙事单页形式展示职业转型故事。

**架构：** 使用 Vite + React 构建单页应用，利用 GSAP + ScrollTrigger 实现滚动动画，采用 Vanilla CSS (CSS Modules) 和 CSS Variables 管理样式，React Context 提供中英双语切换。

**技术栈：** Vite, React, GSAP, vanilla CSS

---

### 任务 1：初始化项目与基础配置

**文件：**
- 创建：`package.json` 等配置（由 Vite 创建）
- 创建：`src/styles/variables.css`
- 创建：`src/styles/global.css`
- 修改：`src/main.jsx`
- 修改：`src/App.jsx`

- [ ] **步骤 1：初始化 Vite React 项目**

由于目录可能不是空的，我们手动创建基础配置：
创建 `package.json`：
```json
{
  "name": "portfolio-website",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap": "^3.12.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.1"
  }
}
```

运行安装依赖：
```bash
npm install
```

创建 `vite.config.js`：
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

创建 `index.html`：
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meng Wen - Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **步骤 2：配置基础 CSS 变量**

创建 `src/styles/variables.css`：
```css
:root {
  --color-bg-primary: #0a0a0f;
  --color-bg-secondary: #12121a;
  --color-bg-elevated: #1a1a2e;
  --color-text-primary: #f0f0f5;
  --color-text-secondary: #8888a0;
  --color-accent-start: #6366f1;
  --color-accent-end: #8b5cf6;
  --color-border: rgba(255,255,255,0.08);
  --color-glass: rgba(10,10,15,0.8);
  
  --font-display: 'Inter', 'Noto Sans SC', sans-serif;
  --font-body: 'Inter', 'Noto Sans SC', sans-serif;
  
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 6rem;
  --spacing-section: 8rem;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  --text-hero: clamp(3rem, 8vw, 6rem);
  --text-h1: clamp(2rem, 4vw, 3rem);
  --text-h2: clamp(1.25rem, 2vw, 1.75rem);
  --text-body: 1rem;
  --text-small: 0.875rem;
}
```

- [ ] **步骤 3：配置全局样式**

创建 `src/styles/global.css`：
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Noto+Sans+SC:wght@400;500;700&display=swap');
@import './variables.css';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  line-height: 1.6;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}
```

- [ ] **步骤 4：初始化 React 组件入口**

创建 `src/App.jsx`：
```javascript
import React from 'react'

function App() {
  return (
    <div>
      <h1>Portfolio Init</h1>
    </div>
  )
}

export default App
```

创建 `src/main.jsx`：
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **步骤 5：提交基础配置**

```bash
git add package.json vite.config.js index.html src/
git commit -m "chore: initialize project and global styles"
```

### 任务 2：实现 i18n 语言切换功能

**文件：**
- 创建：`src/locales/zh.json`
- 创建：`src/locales/en.json`
- 创建：`src/context/LanguageContext.jsx`

- [ ] **步骤 1：创建语言文案文件**

创建 `src/locales/zh.json`：
```json
{
  "nav.about": "关于",
  "nav.experience": "经历",
  "nav.portfolio": "作品",
  "nav.contact": "联系"
}
```
创建 `src/locales/en.json`：
```json
{
  "nav.about": "About",
  "nav.experience": "Experience",
  "nav.portfolio": "Portfolio",
  "nav.contact": "Contact"
}
```

- [ ] **步骤 2：创建 LanguageContext**

创建 `src/context/LanguageContext.jsx`：
```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import zh from '../locales/zh.json';
import en from '../locales/en.json';

const LanguageContext = createContext();
const translations = { zh, en };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'zh';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => translations[language][key] || key;
  const toggleLanguage = () => setLanguage(lang => lang === 'zh' ? 'en' : 'zh');

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
```

- [ ] **步骤 3：在 App 中包裹 Provider**

修改 `src/main.jsx`：
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import { LanguageProvider } from './context/LanguageContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
);
```

- [ ] **步骤 4：Commit**

```bash
git add src/locales/ src/context/ src/main.jsx
git commit -m "feat: add i18n support"
```

### 任务 3：实现 Navbar 组件

**文件：**
- 创建：`src/components/Navbar/index.jsx`
- 创建：`src/components/Navbar/Navbar.module.css`

- [ ] **步骤 1：创建 Navbar 样式**

创建 `src/components/Navbar/Navbar.module.css`：
```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  transition: background-color 0.3s, backdrop-filter 0.3s;
}
.scrolled {
  background-color: var(--color-glass);
  backdrop-filter: blur(10px);
}
.logo {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--color-text-primary);
}
.navLinks {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}
.navLinks a {
  color: var(--color-text-primary);
  transition: color 0.2s;
}
.navLinks a:hover {
  color: var(--color-accent-start);
}
.langBtn {
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.langBtn:hover {
  border-color: var(--color-accent-start);
}
```

- [ ] **步骤 2：创建 Navbar 组件**

创建 `src/components/Navbar/index.jsx`：
```javascript
import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>Meng Wen</div>
      <div className={styles.navLinks}>
        <a href="#about">{t('nav.about')}</a>
        <a href="#experience">{t('nav.experience')}</a>
        <a href="#portfolio">{t('nav.portfolio')}</a>
        <a href="#contact">{t('nav.contact')}</a>
        <button className={styles.langBtn} onClick={toggleLanguage}>
          {language === 'zh' ? 'EN' : '中文'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
```

- [ ] **步骤 3：在 App 中使用 Navbar**

修改 `src/App.jsx`：
```javascript
import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ height: '200vh' }}></div>
    </div>
  );
}

export default App;
```

- [ ] **步骤 4：Commit**

```bash
git add src/components/Navbar/ src/App.jsx
git commit -m "feat: implement Navbar component"
```

### 任务 4：实现 Hero 组件

**文件：**
- 修改：`src/locales/zh.json`, `src/locales/en.json`
- 创建：`src/components/Hero/index.jsx`
- 创建：`src/components/Hero/Hero.module.css`

- [ ] **步骤 1：添加 Hero 文案**

修改 `src/locales/zh.json`，在末尾追加：
```json
{
  "nav.about": "关于",
  "nav.experience": "经历",
  "nav.portfolio": "作品",
  "nav.contact": "联系",
  "hero.greeting": "你好，我是",
  "hero.title": "Meng Wen",
  "hero.subtitle": "产品设计师 · 数字化实践者",
  "hero.quote": "\"用数字化释放人的精力，回归人文关怀\"",
  "hero.btn.work": "查看作品",
  "hero.btn.contact": "联系我"
}
```
修改 `src/locales/en.json`，在末尾追加：
```json
{
  "nav.about": "About",
  "nav.experience": "Experience",
  "nav.portfolio": "Portfolio",
  "nav.contact": "Contact",
  "hero.greeting": "Hello, I am",
  "hero.title": "Meng Wen",
  "hero.subtitle": "Product Designer · Digital Practitioner",
  "hero.quote": "\"Liberating human energy through digitalization, returning to human care\"",
  "hero.btn.work": "View Work",
  "hero.btn.contact": "Contact Me"
}
```

- [ ] **步骤 2：创建 Hero 样式**

创建 `src/components/Hero/Hero.module.css`：
```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-xl);
}
.content {
  flex: 0 0 60%;
}
.greeting {
  color: var(--color-text-secondary);
  font-size: var(--text-h2);
}
.title {
  font-size: var(--text-hero);
  font-weight: 800;
  background: linear-gradient(to right, var(--color-accent-start), var(--color-accent-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: var(--spacing-xs);
}
.subtitle {
  color: var(--color-text-secondary);
  font-size: var(--text-h2);
  margin-bottom: var(--spacing-md);
}
.quote {
  font-style: italic;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  font-size: var(--text-body);
}
.actions {
  display: flex;
  gap: var(--spacing-sm);
}
.btnPrimary {
  background: linear-gradient(to right, var(--color-accent-start), var(--color-accent-end));
  color: #fff;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: var(--text-body);
}
.btnSecondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 600;
  font-size: var(--text-body);
}
```

- [ ] **步骤 3：创建 Hero 组件**

创建 `src/components/Hero/index.jsx`：
```javascript
import React, { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';

const Hero = () => {
  const { t } = useLanguage();
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    gsap.fromTo(el.children, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.content} ref={contentRef}>
        <div className={styles.greeting}>{t('hero.greeting')}</div>
        <h1 className={styles.title}>{t('hero.title')}</h1>
        <div className={styles.subtitle}>{t('hero.subtitle')}</div>
        <blockquote className={styles.quote}>{t('hero.quote')}</blockquote>
        <div className={styles.actions}>
          <button className={styles.btnPrimary}>{t('hero.btn.work')}</button>
          <button className={styles.btnSecondary}>{t('hero.btn.contact')}</button>
        </div>
      </div>
      <div className={styles.visual}>
        {/* Placeholder for photo or visual element */}
      </div>
    </section>
  );
};

export default Hero;
```

- [ ] **步骤 4：在 App 中集成 Hero**

修改 `src/App.jsx`：
```javascript
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
```

- [ ] **步骤 5：Commit**

```bash
git add src/locales/ src/components/Hero/ src/App.jsx
git commit -m "feat: implement Hero section with animations"
```

### 任务 5：实现其它区块占位组件 (About, Experience, Portfolio, Contact)

**文件：**
- 创建：`src/components/About/index.jsx`
- 创建：`src/components/Experience/index.jsx`
- 创建：`src/components/Portfolio/index.jsx`
- 创建：`src/components/Contact/index.jsx`
- 修改：`src/App.jsx`

- [ ] **步骤 1：创建区块占位组件**

创建 `src/components/About/index.jsx`：
```javascript
import React from 'react';
const About = () => <section id="about" style={{minHeight: '100vh', padding: '100px 20px'}}><h2>关于我</h2></section>;
export default About;
```
创建 `src/components/Experience/index.jsx`：
```javascript
import React from 'react';
const Experience = () => <section id="experience" style={{minHeight: '100vh', padding: '100px 20px'}}><h2>工作经历</h2></section>;
export default Experience;
```
创建 `src/components/Portfolio/index.jsx`：
```javascript
import React from 'react';
const Portfolio = () => <section id="portfolio" style={{minHeight: '100vh', padding: '100px 20px'}}><h2>作品集</h2></section>;
export default Portfolio;
```
创建 `src/components/Contact/index.jsx`：
```javascript
import React from 'react';
const Contact = () => <section id="contact" style={{minHeight: '50vh', padding: '100px 20px'}}><h2>联系我</h2></section>;
export default Contact;
```

- [ ] **步骤 2：在 App 中组装**

修改 `src/App.jsx`：
```javascript
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Portfolio />
      <Contact />
    </div>
  );
}

export default App;
```

- [ ] **步骤 3：Commit**

```bash
git add src/components/ src/App.jsx
git commit -m "feat: add skeleton sections for full single page layout"
```
