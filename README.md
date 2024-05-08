
# Issue Poster
**! ! ! Warning ! ! !**
-   This is personal homework for applying internships in [**Dcard**](https://about.dcard.tw/); it has **No Commercial Use**.

-   The website will be unavailable after 2024 / 6 / 1.

---

# Table of Contents
- [Basic Info](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework?tab=readme-ov-file#basic-info)

- [Getting Started](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework?tab=readme-ov-file#getting-started)
   - [Visit on Vercel](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework?tab=readme-ov-file#visit-on-vercel)
   - [Run on localhost](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework?tab=readme-ov-file#run-on-localhost)
   
- [DEMO](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework?tab=readme-ov-file#demo)

- [Features](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework?tab=readme-ov-file#features)
   - [Homepage](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework?tab=readme-ov-file#homepage)
   - [`issues`](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework?tab=readme-ov-file#issues)
   - [`repos`](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework?tab=readme-ov-file#repos)
   - [`/issues/[owner]/[repo]`](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework?tab=readme-ov-file#issuesownerrepo)
   - [`/issues/[owner]/[repo]/[number]`](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework?tab=readme-ov-file#issuesownerreponumber)

- [API](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework?tab=readme-ov-file#api)

- [Skills](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework?tab=readme-ov-file#skills)

- [Package Used](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework?tab=readme-ov-file#package-used)

---

# Basic Info

-   Author: Ramy Chu

-   Web Page: https://dcard-frontend-intern-homework.vercel.app/

-   Skills:
    - HTML5
    - CSS3 / Tailwind CSS
    - JavaScript ( ES6 ) / TypeScript
    - React / Next JS
    - Responsive Web Design
    - Infinite Scroll / Skeleton Loading

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

# DEMO

https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/6612d20d-620b-4511-acc8-40034428076a

---

# Features

## Homepage
**Must log in with GitHub, or you can not use any service on the website.** ps. `scope: "user repo"`

- Homepage without OAuth

   ![homepage without OAuth](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/d9d46b4d-0e68-4871-8934-27d82475da7d)

- Homepage with OAuth

   ![homepage with OAuth](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/4c12cc53-9609-41e9-9184-71c989ed83bb)

- Links
   - See your repos: `/repos`
   - See your issues: `/issues`
   - GitHub avatar: to your GitHub profile page (ex. `https://github.com/raamiiChu`)

## `/issues`
You can see all the issues you created.

![list your issues](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/ad38213a-3ba7-4a27-8d09-847aa38e1640)

- Links
   - Create a new Issue in your repos: `/repos`
   - Title or issues: `/issues/[owner]/[repo]/[number]`
   - Icon beside title: to issue page on GitHub (ex. `https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/issues/5`)
   - Comments: `/issues/[owner]/[repo]/[number]#comments`

## `/repos`
You can see all the repositories you participated in.

![list your repos](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/5228a216-964a-4350-a7ba-de51d42869bb)

- Links
   - Title or repos: `/issues/[owner]/[repo]`
   - Icon beside title: to repo page on GitHub (ex. `https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework`)
   - Issues: `/issues/[owner]/[repo]`

## `/issues/[owner]/[repo]`

- List all issues in the repo

   ![list all issues in the repo](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/97fce992-c7d9-4dfc-b9ce-f837f0306746)

- Message if there's no issue

   ![message if there's no issue](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/f1cc6830-8759-4f98-8dae-b51014412efc)

- Post an issue ( modal )

   ![modal for post an issue](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/01886610-3695-4884-b534-5bfde97a9d34)

   Data validation

   ![data validation](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/5d96f35a-8502-4363-ada4-72829dcb7844)


- Links
   - "Go Back" button: `/repos`
   - Title or issues: `/issues/[owner]/[repo]/[number]`
   - Icon on top-right of cards: to issue page on GitHub (ex. `https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/issues/5`)
   - Comments: `/issues/[owner]/[repo]/[number]#comments`

## `/issues/[owner]/[repo]/[number]`

Show issue body & comments

![show issue body & comments](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/648a4d0e-5c4a-4b35-971f-fa479139bac1)

- Update an issue ( modal )

   The default value depends on the current issue.

   ![Update an issue](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/2bd7272d-16dc-487d-9a24-006cfefec35f)

- Delete an issue

   Show an alert message, to make sure the user wants to delete.  
   If deleted successfully, the user will be redirected to `/issues/[owner]/[repo]`.

   ![Delete an issue](https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/assets/87169493/ce2e80f8-2724-400c-bd5b-1f7d80e8d2a5)


- Links
   - "Go Back" button: `/issues/[owner]/[repo]`
   - Title or issues: to issue page on GitHub (ex. `https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/issues/5`)
   - Datetime on left-bottom of cards: to comments on GitHub
     (ex. `https://github.com/raamiiChu/Dcard-Frontend-Intern-Homework/issues/1#issuecomment-2022095005`)

---

# API

- `/api/auth/[...nextauth]`: GitHub OAuth

- `/api/github/repos`:

   - GET: return all the repositories the user participated in.
      - Status code: 200 / 304 / 400 / 401 / 403 / 422

- `/api/github/issues`:

   - GET: return all the issues the user created.
      - Status code: 200 / 304 / 400 / 401 / 404 / 422

- `/api/github/issues/[owner]/[repo]`:

   - GET: return all the issues from a specific repository.
      - Status code: 200 / 301 / 400 / 401 / 404 / 422
  
   - POST: create a new issue to a specific repository.
      - Status code: 201 / 400 / 401 / 403 / 404 / 410 / 422 / 503

- `/api/github/issues/[owner]/[repo]/[number]`:

   - GET: return the details of a specific issue.
      - Status code: 200 / 301 / 304 / 400 / 404 / 410
  
   - PATCH: update details of a specific issue.
      - Status code: 200 / 301 / 400 / 401 / 403 / 404 / 410 / 422 / 503
    
   - DELETE: delete a specific issue.
      - Status code: 200 / 301 / 400 / 401 / 403 / 404 / 410 / 422 / 503

- `/api/github/issues/[owner]/[repo]/[number]/[comments]`: 

   - GET: return all comments in a specific issue.
      - Status code: 200 / 400 / 404 / 410

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

- Context API

## API Call

- axios
- useSWR

---

