# Siemens SDET 2025 - Technical Task 🚀

This repository contains the UI and API automation solutions for the Siemens Software Development Engineer in Test (SDET) 2025 technical assessment.

---

## 📁 Repository Structure

```

siemens-sdet-task/
├── ui-tests/             # NightwatchJS UI tests for My Store
│   ├── page-objects/     # Page Object Model (no hardcoded selectors)
│   ├── tests/            # UI test cases for Contact Us and Search
│   ├── tests_output/     # HTML reports and screenshots
│   └── ...
├── api-tests/            # API tests using Supertest and Jest
│   ├── tests/            # Tests for mock-user-auth npm module
│   ├── reports/          # HTML report for API test run
│   └── ...
├── .circleci/            # CircleCI config for CI/CD setup
├── README.md             # Project overview (you're here!)

````

---

## ✅ Task Requirements Coverage

## 💻 UI Test Scenarios (NightwatchJS)

The following scenarios are covered:

### 1. **Contact Us Page**
- Validate all required and optional fields
- Form submission with:
  - Valid data
  - Missing required fields
  - File upload (positive and negative)
- Assertion on submission success/failure

### 2. **Home Page**
- Search for the word **"dress"**
- Assert that all returned results contain "dress" in their titles

🧩 **Tech Highlights**:
- Page Object Model used for all element selectors
- Dynamic locators, no hardcoded XPaths
- Screenshots captured on failures
- HTML report generated via Nightwatch HTML Reporter

---

## 🔗 API Testing (Supertest + Jest)

Tested the [mock-user-auth](https://www.npmjs.com/package/mock-user-auth) module routes.

### Coverage:
- `POST /register`
- `POST /login`
- `GET /profile`
- `GET /refresh-token`

✔️ Validations include:
- Valid & invalid request body
- Valid & invalid authorization headers
- Edge case handling (e.g., missing fields)

📄 An HTML report is available in `/api-tests/reports`.

---

## Documentation

- ✅ [Test Cases and Bugs Sheet (Google Sheets)](https://docs.google.com/spreadsheets/d/1V_kG96WDwSh_HF2ia_Z7sDsiMmJcyvL6OwcFRPcI1yU/edit?usp=sharing)

---

## 🛠 How to Run Locally

### ✅ Prerequisites:
- Node.js (v18+)
- Chrome browser (for Nightwatch)
- `npm install` required in both `ui-tests` and `api-tests`

### 🔍 Run UI Tests:
```bash
cd ui-tests
npm install
npm run test
```


### 🔗 Run API Tests:
```bash
cd api-tests
npm install
npm run test
```

> Reports will be generated inside `/reports/` folders for both UI and API tests.

---

## 🔁 Continuous Integration – CircleCI

CircleCI is configured to run both UI and API tests.

### Workflow:

1. Run UI tests
2. Run API tests
3. Generate reports

📄 CircleCI config file: `.circleci/config.yml`

### ✅ Status Badge:

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/4wDYvJ9Sj85XDA6x4ZiodN/KMpJ5Uq7PrXFY8pqJNsVkt/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/4wDYvJ9Sj85XDA6x4ZiodN/KMpJ5Uq7PrXFY8pqJNsVkt/tree/main)



---

## 🧪 Tools & Libraries Used

| Area        | Tool                |
| ----------- | ------------------- |
| UI Testing  | NightwatchJS        |
| API Testing | Supertest + Jest    |
| Reporting   | HTML Reports        |
| CI/CD       | CircleCI            |
| Docs        | Google Sheets       |

---

## 👤 Author

**Rana Gamal**

📧 [RanaGamalDaif@gmail.com](mailto:RanaGamalDaif@gmail.com)

🔗 [LinkedIn](https://www.linkedin.com/in/rana-gamal-daif)

🐙 [GitHub](https://github.com/engRana404)

---

## 📅 Submission

This project was completed and submitted as part of the Siemens SDET 2025 hiring process.
All instructions and requirements have been fulfilled.
