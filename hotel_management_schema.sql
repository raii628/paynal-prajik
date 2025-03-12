-- Guests
CREATE TABLE guests (
	id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    contact_number VARCHAR(25) UNIQUE NOT NULL,
	role ENUM('regular', 'vip') NOT NULL,
    created_at DATETIME DEFAULT	CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT	CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Rooms
CREATE TABLE rooms (
	id INT PRIMARY KEY AUTO_INCREMENT,
    room_number VARCHAR(10) UNIQUE NOT NULL,
    room_type_id INT NOT NULL,
    status ENUM('available', 'occupied', 'maintenance') DEFAULT 'available',
    notes TEXT,
    FOREIGN KEY (room_type_id) REFERENCES room_types(id)
);

-- Room Types
CREATE TABLE room_types (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    capacity INT NOT NULL
);

-- Amenities
CREATE TABLE amenities (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Room Type <-> Amenity Junction Table
CREATE TABLE room_type_amenities (
	room_type_id INT NOT NULL,
    amenity_id INT NOT NULL,
    PRIMARY KEY (room_type_id, amenity_id),
    FOREIGN KEY (room_type_id) REFERENCES room_types(id),
    FOREIGN KEY (amenity_id) REFERENCES amenities(id)
);

-- Areas (Event Spaces)
CREATE TABLE areas (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    capacity INT NOT NULL,
    price_per_hour DECIMAL(10, 2) NOT NULL,
    status ENUM('available', 'occupied', 'maintenance') DEFAULT 'available'
);

-- Bookings (Rooms)
CREATE TABLE bookings (
	id INT PRIMARY KEY AUTO_INCREMENT,
    guest_id INT NOT NULL,
    room_id INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    status ENUM('confirmed', 'checked_in', 'checked_out', 'cancelled') DEFAULT 'confirmed',
    cancellation_date DATETIME NULL,
	cancellation_reason TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (guest_id) REFERENCES guests(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- Reservations (Areas)
CREATE TABLE reservations (
	id INT PRIMARY KEY AUTO_INCREMENT,
    guest_id INT NOT NULL,
    area_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('confirmed', 'cancelled'),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (guest_id) REFERENCES guests(id),
    FOREIGN KEY (area_id) REFERENCES areas(id)
);

-- Room Type Prices
CREATE TABLE room_type_prices (
    room_type_id INT,
    valid_from DATE,
    price DECIMAL(10, 2),
    PRIMARY KEY (room_type_id, valid_from),
    FOREIGN KEY (room_type_id) REFERENCES room_types(id)
);

-- Transactions
CREATE TABLE transactions (
	id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    reservation_id INT,
    guest_id INT NOT NULL,
    transaction_type ENUM('booking', 'reservation', 'cancellation_refund') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
	transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('completed', 'pending', 'failed') DEFAULT 'pending',
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (reservation_id) REFERENCES reservations(id),
    FOREIGN KEY (guest_id) REFERENCES guests(id),
    CHECK (booking_id IS NOT NULL OR reservation_id IS NOT NULL)
);

-- Reviews
CREATE TABLE reviews (
	id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    guest_id INT NOT NULL,
    review_text TEXT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (guest_id) REFERENCES guests(id)
);