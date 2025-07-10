# 🚀 Siemens SDET 2025 - Technical Task

This repository contains both **UI and API automation solutions** for the Siemens Software Development Engineer in Test (SDET) 2025 technical assessment.

---

## 📁 Repository Structure

```
siemens-sdet-task/
├── ui-tests/             # NightwatchJS UI tests for My Store
│   ├── page-objects/     # Page Object Model (no hardcoded selectors)
│   ├── tests/            # UI test cases (Contact Us & Search)
│   ├── tests_output/     # HTML reports and screenshots
│   └── ...
├── api-tests/            # API tests using Supertest and Jest
│   ├── tests/            # Tests for mock-user-auth module
│   ├── reports/          # HTML report for API test run
│   └── ...
├── .circleci/            # CircleCI config for CI/CD
├── README.md             # Project overview (you’re here!)
```

---

## ✅ Task Coverage Summary

All UI and API testing requirements outlined in the Siemens SDET 2025 task have been implemented. This includes:

* 🔎 Contact Us form validation (positive/negative)
* 🛒 Search functionality on the homepage
* 🔐 Full coverage of mock-user-auth APIs
* 📄 HTML reports and screenshots
* 🔁 CI pipeline with CircleCI

---

## 💻 UI Testing – NightwatchJS

### ✅ Scenarios Implemented

#### 1. **Contact Us Page**

* Validate required and optional fields
* Test form submission with:

  * ✅ Valid data
  * ❌ Missing required fields
  * 📎 File upload (valid and invalid formats)
* Assertions on success and error messages

#### 2. **Home Page**

* Search for the word **"dress"**
* Assert that all results contain "dress" in the title

### 🧩 Highlights

* ✅ Page Object Model (POM)
* ✅ No hardcoded selectors (dynamic locators used)
* ✅ Screenshots captured on failure (see `tests_output/screenshots`)
* ✅ HTML reports generated via `nightwatch-html-reporter`

---

## 🔗 API Testing – Supertest + Jest

Tested the [mock-user-auth](https://www.npmjs.com/package/mock-user-auth) package.

### ✅ Endpoints Covered:

* `POST /register`
* `POST /login`
* `GET /profile`
* `GET /refresh-token`

### ✅ Validations Included:

* Valid and invalid request bodies
* Auth headers (valid, missing, expired)
* Edge cases (e.g., missing fields, wrong credentials)

📄 HTML test report available under: `api-tests/reports/`

---

## 📊 Documentation

📝 [Test Cases & Bugs Sheet (Google Sheets)](https://docs.google.com/spreadsheets/d/1V_kG96WDwSh_HF2ia_Z7sDsiMmJcyvL6OwcFRPcI1yU/edit?usp=sharing)
Covers all scenarios, expected results, and actual outcomes.

---

## 🧪 How to Run Locally

### Prerequisites:

* Node.js (v18+)
* Chrome browser
* Nightwatch CLI (for UI tests)

### 🔍 Run UI Tests

```bash
cd ui-tests
npm install
npm run test
```

### 🔗 Run API Tests

```bash
cd api-tests
npm install
npm run test
```

🖼 Reports will be generated in:

* UI: `ui-tests/tests_output/`
* API: `api-tests/reports/`

---

## 🔁 Continuous Integration – CircleCI

This project uses CircleCI to run tests automatically on push.

### 🔄 Workflow:

1. Install dependencies
2. Run UI tests
3. Run API tests
4. Generate reports

📄 Config file: `.circleci/config.yml`

### ✅ CircleCI Status:

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/4wDYvJ9Sj85XDA6x4ZiodN/KMpJ5Uq7PrXFY8pqJNsVkt/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/4wDYvJ9Sj85XDA6x4ZiodN/KMpJ5Uq7PrXFY8pqJNsVkt/tree/main)

---

## 🛠 Tools & Libraries

| Category      | Tool             |
| ------------- | ---------------- |
| UI Testing    | NightwatchJS     |
| API Testing   | Supertest + Jest |
| Reporting     | HTML Reports     |
| CI/CD         | CircleCI         |
| Documentation | Google Sheets    |

---

## 👤 Author

**Rana Gamal**

📧 [RanaGamalDaif@gmail.com](mailto:RanaGamalDaif@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/rana-gamal-daif)
🐙 [GitHub](https://github.com/engRana404)

---

## 📅 Submission

This project was developed and submitted as part of the Siemens SDET 2025 hiring process.
All task instructions and technical requirements have been thoroughly addressed.
