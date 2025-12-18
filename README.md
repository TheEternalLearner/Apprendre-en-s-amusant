

# Apprendre-en-s-amusant 🎓

Showcase website for English lessons with course sign-up functionality.

## Project Structure

    Apprendre-en-s-amusant/
    ├── backend/                       # Spring Boot backend (API + Mail)
    │   ├── src/
    │   │   ├── main/
    │   │   │   ├── java/
    │   │   │   │   └── com/ensamusant/apprendre/
    │   │   │   │       ├── controller/   # REST controllers
    │   │   │   │       ├── model/        # Entities, DTOs, enums
    │   │   │   │       ├── repository/   # Spring Data JPA repositories
    │   │   │   │       ├── service/      # Business logic
    │   │   │   │       └── config/       # Configuration classes
    │   │   │   └── resources/
    │   │   │       ├── application.properties
    │   │   │       ├── data.sql
    │   │   │       ├── static/
    │   │   │       └── templates/
    │   │   └── test/
    │   │       ├── java/com/ensamusant/apprendre/
    │   │       │   ├── ApprendreEnSAmusantApplicationTests.java
    │   │       │   ├── controller/
    │   │       │   │   └── SignUpFormControllerTest.java
    │   │       │   ├── service/
    │   │       │   │   └── MailServiceTest.java
    │   │       │   └── integration/controller/
    │   │       │       ├── CourseControllerIT.java
    │   │       │       ├── SignUpFormControllerIT.java
    │   │       │       └── UserControllerIT.java
    │   │       └── resources/
    │   │           └── application-test.properties
    │   ├── pom.xml
    │   └── HELP.md
    │
    ├── frontend/                      # Angular frontend (UI)
    │   ├── src/
    │   │   ├── app/
    │   │   │   ├── about/
    │   │   │   ├── admin/
    │   │   │   │   ├── course-form/
    │   │   │   │   ├── course-list/
    │   │   │   │   ├── user-form/
    │   │   │   │   └── user-list/
    │   │   │   ├── course-list/
    │   │   │   ├── course-sign-up/
    │   │   │   ├── header/
    │   │   │   ├── home/
    │   │   │   ├── models/           # Interfaces and classes (User, Course, etc.)
    │   │   │   ├── section/
    │   │   │   ├── services/         # API and business logic
    │   │   │   └── app.*             # Main app config, routes, etc.
    │   │   └── public/
    │   │       └── img/              # Images (logo, etc.)
    │   ├── cypress/
    │   │   ├── e2e/
    │   │   │   ├── course/
    │   │   │   │   ├── course-create.cy.ts
    │   │   │   │   ├── course-edit.cy.ts
    │   │   │   │   ├── course-delete.cy.ts
    │   │   │   │   └── course-list.cy.ts
    │   │   │   ├── user/
    │   │   │   │   ├── user-create.cy.ts
    │   │   │   │   ├── user-edit.cy.ts
    │   │   │   │   ├── user-delete.cy.ts
    │   │   │   │   └── user-list.cy.ts
    │   │   │   └── course-sign-up.cy.ts
    │   │   └── support/
    │   │       ├── commands.ts
    │   │       └── e2e.ts
    │   ├── angular.json
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── tsconfig.app.json
    │
    ├── .gitignore
    ├── LICENSE
    ├── netlify.toml
    └── README.md


## Tech Stack

### Frontend
- **Angular 20** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **Bulma CSS** - Responsive CSS framework
- **Angular Material** - UI components (Snackbar for notifications)
- **RxJS** - Reactive programming

### Backend
- **Spring Boot 3.5** - Java REST API
- **Spring Mail** - Email notifications
- **Bean Validation** - Form validation
- **Maven** - Build tool

### Testing
- **Frontend:**
  - Jasmine/Karma - Unit & component tests
  - Cypress - End-to-end tests
- **Backend:**
  - JUnit 5 - Unit tests
  - MockMvc - Integration tests
  - AssertJ - Fluent assertions

---

## Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Java** 17+
- **Maven** 3.6+ (optional if using IDE like IntelliJ)
- **Git**

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/TheEternalLearner/Apprendre-en-s-amusant.git
cd Apprendre-en-s-amusant
```

#### 2. Backend setup
```bash
cd backend
mvn clean install
# OR use Maven wrapper (no Maven installation required)
./mvnw clean install     # Linux/Mac
.\mvnw.cmd clean install # Windows
```

#### 3. Frontend setup
```bash
cd frontend
npm install
```

#### 4. Environment variables
Create a `.env` file at the root:
```env
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=your-email@example.com
MAIL_PASSWORD=your-password
```

---

## Running the Application

### Option 1: Run both (2 terminals)

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
# OR use Maven wrapper
./mvnw spring-boot:run      # Linux/Mac
.\mvnw.cmd spring-boot:run  # Windows
# OR run from IntelliJ IDEA (click Run button)
```
→ API available at `http://localhost:8080`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
→ App available at `http://localhost:4200`

### Option 2: Production build

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/Apprendre-en-s-amusant-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve dist/ folder with your web server
```

---

## Testing

### Frontend Tests

#### Unit & Component Tests (Jasmine/Karma)
```bash
cd frontend
npm test
```

#### End-to-End Tests (Cypress)

**Interactive mode (GUI):**
```bash
npm run cypress:open
```

**Headless mode (CI/CD):**
```bash
npm run e2e
```

**Note:** Frontend must be running (`npm start`) before launching E2E tests.

### Backend Tests

#### All tests
```bash
cd backend
mvn test
```

#### Integration tests only
```bash
mvn test -Dtest=*IT
```

#### Specific test
```bash
mvn test -Dtest=SignUpFormControllerIT
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/signup/submit` | Submit course sign-up form |

**Example request:**
```json
POST /api/signup/submit
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com"
}
```

**Validation rules:**
- `firstName`: required, not blank
- `lastName`: required, not blank
- `email`: required, valid email format

---

## Components Overview

- **Header** – Navigation bar with links to homepage, about page, and contact button.
- **About** – Simple about page component.
- **Course** – Lists courses on the homepage. Uses a model (`course.model.ts`) and a service (`course.service.ts`). Each course links to a **single-course** component for its detailed page.
- **CourseSignUp** – Form component with validation and email notifications via backend API.

---

## Development Guidelines

- ✅ **SOLID principles** applied
- ✅ **FIRST principles** for tests  
- ✅ **TDD approach** (Red-Green-Refactor)

---

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Write tests first (TDD)
3. Implement the feature
4. Ensure all tests pass
5. Commit with clear messages
6. Push and create a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
