# 🚀 NestJS Multi-Tenant API Blueprint

## 📖 Overview

This project is a **NestJS multi-tenant API blueprint** using **MongoDB**. The application dynamically assigns database connections per request based on the **`x-tenant-db` header**.

## 🛠 Installation & Setup

### 1️⃣ **Clone the repository**

```sh
git clone https://github.com/WildanMZaki/nyapa-be-blueprint.git some-service
cd some-service
```

### 2️⃣ **Install dependencies**

```sh
npm install
```

### 3️⃣ **Create an environment file** (`.env`)

```sh
cp .env.example .env
```

Edit `.env` and configure required values such as database settings.

### 4️⃣ **Run the application**

#### 🔹 Development Mode

```sh
npm run start:dev
```

#### 🔹 Production Mode

```sh
npm run build
npm run start
```

## 📌 **Required Headers for Multi-Tenancy**

All requests **must include** the following header to indicate which database to use:

```yaml
x-tenant-db: <mongodb-connection-url>
```

### 🔹 **Example Request**

```sh
curl -X GET http://localhost:3000/contacts \
     -H "x-tenant-db: mongodb://localhost:27017/tenant_db"
```

## 🛠 **API Endpoints (available for testing)**

### 📍 Contacts Module

| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| `POST` | `/contacts`     | Create a new contact  |
| `GET`  | `/contacts`     | Retrieve all contacts |
| `GET`  | `/contacts/:id` | Get contact by ID     |

### 🛠 **Example: Create Contact**

```sh
curl -X POST http://localhost:3000/contacts \
     -H "Content-Type: application/json" \
     -H "x-tenant-db: mongodb://localhost:27017/tenant_db" \
     -d '{ "name": "John Doe", "phone": "123456789", "email": "john@example.com" }'
```

## 🧪 **Running Tests**

### 🔹 **Run Unit Tests**

```sh
npm run test
```

### 🔹 **Run Integration Tests**

```sh
npm run test:e2e
```

## 💡 **Development Tips**

### ✅ **Auto-Registration of Models**

- All models are **automatically included** if they are listed in `src/schemas/models.ts`:
  ```ts
  models = [ContactModelProvider, UserModelProvider];
  ```
- This ensures models are globally registered when `TenantModule` is included.

### ✅ **Error Handling**

- Use **built-in error classes** instead of manually handling responses:
  ```ts
  throw new NotFoundError('Contact not found');
  throw new BadRequestError('Invalid input data');
  ```
- Errors are **automatically formatted** by the global exception filter.

### ✅ **Tenant Connection Management**

- `TenantService` dynamically selects the **right MongoDB connection**.
- Do **not manually manage database connections**, always inject the model using:
  ```ts
  constructor(@Inject('CONTACT_MODEL') private readonly contactModel: ContactModel) {}
  ```

## 👥 **Contributing**

1. Fork the repository
2. Create a new feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## 📜 **License**

MIT License. See `LICENSE` file for details.
