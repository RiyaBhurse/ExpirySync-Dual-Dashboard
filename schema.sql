CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    item VARCHAR(100) NOT NULL UNIQUE,
    quantity INT NOT NULL,
    expiry_date DATE NOT NULL
);