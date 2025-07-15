from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from datetime import datetime, timedelta
import psycopg2
import redis
from flask_cors import CORS

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret-key'
app.config['JWT_TOKEN_LOCATION'] = ['headers']
jwt = JWTManager(app)
CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:3000",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

conn = psycopg2.connect(dbname="expirysync", user="postgres", password="password", host="localhost")
redis_client = redis.Redis(host='localhost', port=6379, db=0)

@app.route('/customer/recommendations', methods=['GET'])
@jwt_required()
def get_recommendations():
    cursor = conn.cursor()
    cursor.execute("SELECT item, quantity, expiry_date FROM inventory")
    items = cursor.fetchall()
    recommendations = []

    current_date = datetime(2025, 7, 15)
    for item, quantity, expiry_date in items:
        # expiry_date is already a datetime.date object, so use it directly
        days_difference = (expiry_date - current_date.date()).days

        if days_difference == 0:
            action = "donation"
            discount = 0.0
        elif 0 < days_difference <= 3:
            action = "offer"
            discount = 0.5
        else:
            continue

        recommendations.append({
            "item": item,
            "quantity": quantity,
            "discount": discount,
            "action": action
        })

    cursor.close()
    return jsonify(recommendations)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400
    role = "admin" if email == "admin@walmartadmin.com" else "customer"
    token = create_access_token(identity=email)
    print(f"Generated token: {token}")
    return jsonify({"token": token, "role": role})

@app.route('/admin/inventory', methods=['POST'])
@jwt_required()
def add_inventory():
    identity = get_jwt_identity()
    if identity != "admin@walmartadmin.com":
        return jsonify({"error": "Admin access required"}), 403
    data = request.get_json()
    item = data.get('item')
    quantity = data.get('quantity')
    expiry_date = data.get('expiry_date')

    if not (item and quantity is not None and expiry_date):
        return jsonify({"error": "Missing or invalid fields"}), 422

    try:
        quantity = int(quantity)
        if quantity <= 0:
            return jsonify({"error": "Quantity must be positive"}), 422
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid quantity"}), 422

    cursor = conn.cursor()
    cursor.execute("INSERT INTO inventory (item, quantity, expiry_date) VALUES (%s, %s, %s)", (item, quantity, expiry_date))
    conn.commit()
    redis_client.hset(f"item:{item}", mapping={"quantity": quantity, "expiry_date": expiry_date})
    cursor.close()
    return jsonify({"message": "Item added"})

if __name__ == '__main__':
    app.run(debug=True)