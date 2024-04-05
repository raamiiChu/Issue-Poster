
# Dcard Frontend Intern Homework
**! ! ! Warning ! ! !**
-   This is personal homework for applying internships in [**Dcard**](https://about.dcard.tw/); it has **No Commercial Use**.

-   The website will be unavailable after 2024 / 6 / 1.

---

# Basic Info

-   Author: Ramy Chu

-   Web Page: https://dcard-frontend-intern-homework.vercel.app/

---

# Getting Started

## Visit on Vercel

Use the following link: 

[**Dcard Frontend Intern Homework**](https://dcard-frontend-intern-homework.vercel.app/)

## Run on localhost

### 1. Create a new OAuth App

1. Go to https://github.com/settings/developers,
   click "New OAuth App"

   ![click "New OAuth App"](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/85de6f7a-ef53-47e3-a3ac-f030294617d4)

3. Type the following information:

    - Application name: type whatever you want
    - Homepage URL: `http://localhost:3000/`
    - Authorization callback URL: `http://localhost:3000/`

    ![Register new OAuth App](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/651721b3-b3a9-4f92-b3b0-9275cac571a2)

4. Copy `GITHUB_ID` & `GITHUB_SECRET`

    ![Copy `GITHUB_ID` & `GITHUB_SECRET`](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/893205bc-14fc-472f-abb3-84ba975bf47c)

### 2. Create `.env.local` in the root folder

```
NEXTAUTH_SECRET = "type whatever you want"
NEXTAUTH_URL = "http://localhost:3000/"
GITHUB_ID = "your github id"
GITHUB_SECRET = "you github secret"
```

### 3. Run the development server:

```
npm run dev
```

### 4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

# Skills

- HTML5
- CSS3 / Tailwind CSS
- JavaScript ( ES6 ) / TypeScript
- React / Next JS
- RWD

---

# Package Used

## Framework

- Tailwind CSS + tailwindcss-typography
- Next JS + App Router

## UI Tools

- shadcn-ui
- sweetalert2
- react-quill
- react-icons

## Functionality
- marked / turndown / react-markdown
- date-fns

## OAuth

- Next-Auth

## State Management

- Content API

## API Call

- axios
- useSWR

---

