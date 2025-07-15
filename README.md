

# ExpirySync Dual-Dashboard System

## 1. Overview
The ExpirySync Dual-Dashboard System is a web application designed to manage inventory with expiry dates and provide tailored recommendations to customers. It features two distinct dashboards:

- **Admin Dashboard**: Allows administrators to add inventory items (item name, quantity, and expiry date) to the system.
- **Customer Dashboard**: Displays near-expiry deals, offering a 50% discount for items expiring within 3 days or suggesting donation for items expiring today (July 15, 2025).

### Key Technologies
- **Frontend**: React (running on `http://localhost:3000`)
- **Backend**: Flask (running on `http://localhost:5000`)
- **Authentication**: JSON Web Tokens (JWT)
- **Database**: PostgreSQL
- **Caching**: Redis

## 2. Features
- Secure user authentication with JWT tokens.
- Inventory management with real-time updates.
- Automated recommendations based on expiry dates.
- Responsive and user-friendly interface.

## 3. Prerequisites
Before setting up the project, ensure the following are installed:
- **Python 3.12**
- **Node.js and npm**
- **PostgreSQL**
- **Redis**

## 4. Installation

### 4.1 Clone the Repository
```bash
git clone https://github.com/RiyaBhurse/ExpirySync-Dual-Dashboard.git
cd ICP/SPARKATHON
```

### 4.2 Backend Setup
1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```
2. Install Python dependencies:
   ```bash
   pip install flask flask-jwt-extended flask-cors psycopg2-binary redis
   ```
3. Set the environment variable:
   ```bash
   export JWT_SECRET=super-secret-key
   ```

### 4.3 Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install JavaScript dependencies:
   ```bash
   npm install
   ```

### 4.4 Database Configuration
1. Create a PostgreSQL database named `expirysync`.
2. Create the `inventory` table with the following SQL command:
   ```sql
   CREATE TABLE inventory (
       id SERIAL PRIMARY KEY,
       item VARCHAR(255) NOT NULL,
       quantity INTEGER NOT NULL,
       expiry_date DATE NOT NULL
   );
   ```

## 5. Usage

### 5.1 Start the Backend
```bash
python app.py
```

### 5.2 Start the Frontend
```bash
cd frontend
npm start
```

### 5.3 Access the Application
- Open your browser and go to `http://localhost:3000`.
- Log in with the following credentials:
  - **Admin**: `admin@walmartadmin.com`
  - **Customer**: `user@example.com`

## 6. File Structure
```
ICP/SPARKATHON/
├── app.py                  # Flask backend with API routes
├── .gitignore              # Excludes unnecessary files
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js       # Login component
│   │   │   ├── AdminDashboard.js # Admin dashboard
│   │   │   ├── CustomerDashboard.js # Customer dashboard
│   │   ├── App.js            # Main React app
│   │   ├── index.js          # Entry point
│   ├── package.json         # Frontend dependencies
│   ├── package-lock.json    # Lock file for dependencies
├── README.md               # Project documentation
```

## 7. Contributing
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## 8. License
[Add a license here, e.g., MIT, if applicable. For now, specify it as TBD.]
- **TBD**: To be determined.

## 9. Troubleshooting
- **CORS Issues**: Ensure the backend is running and the `CORS` configuration in `app.py` allows `http://localhost:3000`.
- **Database Errors**: Verify PostgreSQL is running and the `inventory` table is correctly set up.
- **JWT Errors**: Check the `JWT_SECRET` environment variable is set.

## 10. Acknowledgements
- Thanks to the xAI team for guidance in building this system.

---

### Instructions to Apply
1. Save this content into `~/Desktop/ICP/SPARKATHON/README.md` using a text editor (e.g., `nano README.md` or `vim README.md`).
2. Commit and push to GitHub:
   ```bash
   cd ~/Desktop/ICP/SPARKATHON
   git add README.md
   git commit -m "Add detailed README.md"
   git push
   ```
3. Verify the rendered `README.md` on your GitHub repository.



- The project logic (donation today, 50% off for 1-3 days) is documented as of July 15, 2025.
- If you need to add more sections (e.g., screenshots, API documentation), let me know!

