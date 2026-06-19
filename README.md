# 🍲 Umami – Full-Stack Fusion Food Delivery Application

[![React Version](https://img.shields.io/badge/React-19.2--RC-blue?logo=react&color=61DAFB&logoColor=000)](https://react.dev)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4--SNAPSHOT-brightgreen?logo=springboot&logoColor=white&color=6DB33F)](https://spring.io/projects/spring-boot)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple?logo=vite&logoColor=white)](https://vite.dev)
[![Java JDK](https://img.shields.io/badge/JDK-21-orange?logo=oracle&logoColor=white)](https://jdk.java.net/21/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4.0-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

**Umami** is a premium full-stack food ordering application built with a cutting-edge **React 19** frontend and a robust **Spring Boot (Java 21)** REST API backend. It features an automated React Compiler build system, a custom asynchronous HTTP hook, centralized flow control via Context + Reducers, and a transactional relational database schema managed via Spring Data JPA.

The project is specifically architected to demonstrate mastery of complex React hooks, UI modal portals, functional state reductions, modern Java features (such as Records), and enterprise-grade Spring Boot layered patterns.

---

## 🚀 Key Architectural Highlights

### 1. Modern React 19 Reactivity & Compiler
* **Zero-Manual-Memoization:** The application utilizes the new **React Compiler** (`babel-plugin-react-compiler`), which analyzes the dependency graph and automatically applies optimization (memoizing component trees and value allocations) without the visual clutter of `useMemo` or excessive `useCallback`.
* **React 19 Actions API (`useActionState`):** In [Checkout.jsx](src/components/Checkout.jsx), form submission is powered by `useActionState`. Instead of manually tracking `isLoading` or `isSending` states inside try/catch blocks, React natively manages the async execution path and yields pending status transitions (`isSending`).

### 2. Tailored Async Custom Hooks (`useHttp`)
* **Stateful Fetch Layer:** The custom [useHttp.js](src/hooks/useHttp.js) hook manages the lifecycle of all network requests (state transitions for `data`, `isLoading`, and `errorState`).
* **Reference Isolation:** To avoid infinite rendering cascades, request configuration constants (like GET method objects) are strictly declared outside the component scope (e.g., in [Meals.jsx](src/components/Meals.jsx)), or stabilized using `useCallback` dependency mapping inside the hook itself.

### 3. Centralized Reducer-Driven Context Management
* **Shopping Cart State:** The cart utilizes the `useReducer` hook inside [CartContext.jsx](src/store/CartContext.jsx) to perform deep state changes (item additions, quantity increments, quantity decrements with splice removals, and checkout clears). This state is broadcasted globally, bypassing prop-drilling.
* **Navigation & Progress Control:** A custom [UserProgressContext.jsx](src/components/UserProgressContext.jsx) coordinates visual workflow stages (Cart vs. Checkout vs. Closed States), allowing decoupled components to coordinate overlays.

### 4. Advanced Portal-Based Modals
* **HTML5 `<dialog>` Integration:** The [Modal.jsx](src/components/Modal.jsx) component binds a React `useRef` to a native `<dialog>` element. A `useEffect` syncs React state updates to trigger native browser methods (`.showModal()` and `.close()`), ensuring focus trapping, screen-reader accessibility, and escape-key handling. The component portal projects the overlay onto a root `#modal` DOM node.

### 5. Enterprise-Ready Spring Boot Backend
* **Tiered Component Architecture:** Clean decoupling across Controllers ([FoodController](umamiBackend/src/main/java/com/umami/backend/umamiBackend/controller/FoodController.java)), Services ([FoodService](umamiBackend/src/main/java/com/umami/backend/umamiBackend/service/FoodService.java)), Repositories ([MealRepo](umamiBackend/src/main/java/com/umami/backend/umamiBackend/repo/MealRepo.java)), and DTO layers.
* **Modern Java 21 Records:** Leverages immutable Java `record` structures for data transfer ([OrderDTO](umamiBackend/src/main/java/com/umami/backend/umamiBackend/models/dtos/OrderDTO.java)) to eliminate boilerplate getters and constructors. Includes Jackson annotations (`@JsonProperty`) to resolve camelCase/kebab-case discrepancies seamlessly.
* **JPA Element Collections:** Rather than generating overhead with one-to-many entity tables, `Order.java` maps purchase logs to a flat database layout using `@ElementCollection` and `@CollectionTable`, reducing database query complexities.
* **Data Seeding & H2 Integration:** Automatically seeds 18 premium global dishes (Indian, Japanese, American, and Desserts) using a `CommandLineRunner` hook ([DataInitializer](umamiBackend/src/main/java/com/umami/backend/umamiBackend/config/DataInitializer.java)) on startup.

---

## 🛠️ Tech Stack & Dependencies

### Frontend
* **Core:** React 19 (React-DOM)
* **Build System:** Vite 8, Rollup Babel, Babel Plugin React Compiler
* **Styles:** Tailwind CSS v4 (native `@tailwindcss/vite` integration)
* **Client Client:** Fetch API & Axios

### Backend
* **Core:** Spring Boot 4.x / Java 21 (JDK 21)
* **Persistence:** Spring Data JPA, Hibernate ORM
* **Database:** H2 Database (In-Memory / Persistent)
* **Dev Tools:** Project Lombok, Maven Wrapper

---

## 📂 Project Structure

```text
food-delivery-app/
├── food-delivery-app/           # Main Workspace Root
│   ├── src/                    # Frontend (React 19)
│   │   ├── components/         # Modals, Meals, Input, Checkout components
│   │   ├── hooks/              # Custom useHttp.js hooks
│   │   ├── store/              # CartContext state provider
│   │   ├── App.jsx             # Main router and layout
│   │   └── index.css           # Global custom styled themes
│   │
│   └── umamiBackend/           # Backend (Spring Boot)
│       ├── src/main/java/      # Java Source Files
│       │   └── com/umami/backend/umamiBackend/
│       │       ├── config/     # Data seeders & CORS setups
│       │       ├── controller/ # REST Endpoints
│       │       ├── models/     # Relational Database Entities
│       │       ├── repo/       # JPA Data repositories
│       │       └── service/    # Transactional business logic
│       └── pom.xml             # Maven dependencies
```

---

## 💻 Code Walkthrough: Technical Explanations

### Custom Hook: `useHttp`
The `useHttp` hook wraps raw network communication and outputs consistent reactive states:

```javascript
// src/hooks/useHttp.js
export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [errorState, setErrorState] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async function sendRequest(bodyData) {
    setIsLoading(true);
    setErrorState(null);
    try {
      const resData = await sendHttpRequest(url, {
        ...config,
        body: bodyData ? JSON.stringify(bodyData) : config ? config.body : null
      });
      setData(resData);
      return resData;
    } catch (error) {
      setErrorState(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [url, config]);

  useEffect(() => {
    if ((config && config.method === 'GET') || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { data, isLoading, errorState, sendRequest, clearData };
}
```
* **Why it's advanced:** The combination of `useCallback` and `useEffect` avoids infinite render loops by stabilizing the `sendRequest` function reference. Only when `url` or `config` changes will a new function be generated.

### React 19 Action Form Management
In [Checkout.jsx](src/components/Checkout.jsx), we leverage native React 19 form actions:

```javascript
// src/components/Checkout.jsx
async function checkoutAction(prevState, formData) {
  const customerData = Object.fromEntries(formData.entries());
  
  const orderPayload = {
    name: customerData.name,
    email: customerData.email,
    street: customerData.street,
    "postal-code": customerData["postal-code"],
    city: customerData.city,
    items: items.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price
    }))
  };

  await sendRequest(orderPayload);
}

const [formState, formAction, isSending] = useActionState(checkoutAction, null);

return (
  <form action={formAction}>
     {/* UI inputs */}
     {isSending ? <p>Transmitting Secure Order...</p> : <button type="submit">Submit</button>}
  </form>
);
```
* **Why it's advanced:** Zero state variables are needed to track the values of inputs or the fetching progress indicator. The HTML5 `name` attributes pair automatically with the `FormData` object.

### JPA Embeddables in Spring Boot
Instead of complex many-to-many join tables with duplicate primary keys for simple line items, the backend JPA model embeds the records:

```java
// umamiBackend/src/main/java/com/umami/backend/umamiBackend/models/Order.java
@Entity
@Table(name = "customer_orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;

    @ElementCollection
    @CollectionTable(name = "order_items", joinColumns = @JoinColumn(name = "order_id"))
    private List<OrderItemDto> items;
}
```
* **Why it's advanced:** This maps the `OrderItemDto` objects directly inside an `order_items` join table without requiring a standalone database entity mapping lifecycle, resulting in high write efficiency and database normalization.

---

## 🚀 Setting Up the Project

### Prerequisites
* **Java Development Kit (JDK) 21**
* **Node.js (v18.x or above)**
* **Maven** (optional, wrapper is included)

### 1. Running the Backend (Spring Boot)
1. Navigate to the backend directory:
   ```bash
   cd umamiBackend
   ```
2. Build and run the server using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
3. The server starts on **`http://localhost:8080`**.
4. The database is preloaded with dishes. You can view the schema at the H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:testdb`, Username: `sa`, Password: *[blank]*).

### 2. Running the Frontend (React 19)
1. Navigate to the frontend directory:
   ```bash
   cd food-delivery-app
   ```
2. Install the node modules:
   ```bash
   npm install
   ```
3. Boot up the Vite developer server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to **`http://localhost:5173`**.

---

## 📈 Future Performance Roadmaps
* **Security Layer:** Integrating Spring Security + JWT for user credentials and private profile routes.
* **Persistent Cache:** Configuring Redis caches on the Spring Boot side to avoid hitting Database endpoints on static `/meals` catalogs.
* **Mock Testing:** Adding JUnit 5 mock controller assertion tests and Vitest component rendering metrics.
