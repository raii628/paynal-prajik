-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema hotel_management
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hotel_management
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hotel_management` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `hotel_management` ;

-- -----------------------------------------------------
-- Table `hotel_management`.`amenities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`amenities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`areas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`areas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `capacity` INT NOT NULL,
  `price_per_hour` DECIMAL(10,2) NOT NULL,
  `status` ENUM('available', 'occupied', 'maintenance') NULL DEFAULT 'available',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`auth_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`auth_group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`django_content_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`django_content_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `app_label` VARCHAR(100) NOT NULL,
  `model` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label` ASC, `model` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`auth_permission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`auth_permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `content_type_id` INT NOT NULL,
  `codename` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id` ASC, `codename` ASC) VISIBLE,
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co`
    FOREIGN KEY (`content_type_id`)
    REFERENCES `hotel_management`.`django_content_type` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 81
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`auth_group_permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`auth_group_permissions` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `group_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id` ASC, `permission_id` ASC) VISIBLE,
  INDEX `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id` ASC) VISIBLE,
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm`
    FOREIGN KEY (`permission_id`)
    REFERENCES `hotel_management`.`auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id`
    FOREIGN KEY (`group_id`)
    REFERENCES `hotel_management`.`auth_group` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`auth_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`auth_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(128) NOT NULL,
  `last_login` DATETIME(6) NULL DEFAULT NULL,
  `is_superuser` TINYINT(1) NOT NULL,
  `username` VARCHAR(150) NOT NULL,
  `first_name` VARCHAR(150) NOT NULL,
  `last_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(254) NOT NULL,
  `is_staff` TINYINT(1) NOT NULL,
  `is_active` TINYINT(1) NOT NULL,
  `date_joined` DATETIME(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`auth_user_groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`auth_user_groups` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `group_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id` ASC, `group_id` ASC) VISIBLE,
  INDEX `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id` ASC) VISIBLE,
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id`
    FOREIGN KEY (`group_id`)
    REFERENCES `hotel_management`.`auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `hotel_management`.`auth_user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`auth_user_user_permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`auth_user_user_permissions` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id` ASC, `permission_id` ASC) VISIBLE,
  INDEX `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id` ASC) VISIBLE,
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm`
    FOREIGN KEY (`permission_id`)
    REFERENCES `hotel_management`.`auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `hotel_management`.`auth_user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`booking_guests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`booking_guests` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(200) NOT NULL,
  `last_name` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `address` LONGTEXT NOT NULL,
  `contact_number` VARCHAR(25) NOT NULL,
  `role` VARCHAR(20) NOT NULL,
  `created_at` DATETIME(6) NOT NULL,
  `updated_at` DATETIME(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `contact_number` (`contact_number` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`property_roomtypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`property_roomtypes` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `base_price` DECIMAL(10,2) NOT NULL,
  `capacity` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`property_rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`property_rooms` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `room_number` VARCHAR(10) NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `notes` LONGTEXT NOT NULL,
  `room_type_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `room_number` (`room_number` ASC) VISIBLE,
  INDEX `property_rooms_room_type_id_50a63196_fk_property_roomtypes_id` (`room_type_id` ASC) VISIBLE,
  CONSTRAINT `property_rooms_room_type_id_50a63196_fk_property_roomtypes_id`
    FOREIGN KEY (`room_type_id`)
    REFERENCES `hotel_management`.`property_roomtypes` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`booking_bookings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`booking_bookings` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `check_in_date` DATE NOT NULL,
  `check_out_date` DATE NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `created_at` DATETIME(6) NOT NULL,
  `updated_at` DATETIME(6) NOT NULL,
  `room_id` BIGINT NOT NULL,
  `guest_id` BIGINT NOT NULL,
  `cancellation_date` DATETIME(6) NULL DEFAULT NULL,
  `cancellation_reason` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `booking_bookings_room_id_03052452_fk_property_rooms_id` (`room_id` ASC) VISIBLE,
  INDEX `booking_bookings_guest_id_a08d07df_fk_booking_guests_id` (`guest_id` ASC) VISIBLE,
  CONSTRAINT `booking_bookings_guest_id_a08d07df_fk_booking_guests_id`
    FOREIGN KEY (`guest_id`)
    REFERENCES `hotel_management`.`booking_guests` (`id`),
  CONSTRAINT `booking_bookings_room_id_03052452_fk_property_rooms_id`
    FOREIGN KEY (`room_id`)
    REFERENCES `hotel_management`.`property_rooms` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`property_areas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`property_areas` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `capacity` INT NOT NULL,
  `price_per_hour` DECIMAL(10,2) NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`booking_reservations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`booking_reservations` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `start_time` DATETIME(6) NOT NULL,
  `end_time` DATETIME(6) NOT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `created_at` DATETIME(6) NOT NULL,
  `updated_at` DATETIME(6) NOT NULL,
  `area_id` BIGINT NOT NULL,
  `guest_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `booking_reservations_area_id_7f02ef1c_fk_property_areas_id` (`area_id` ASC) VISIBLE,
  INDEX `booking_reservations_guest_id_c5ca7d5a_fk_booking_guests_id` (`guest_id` ASC) VISIBLE,
  CONSTRAINT `booking_reservations_area_id_7f02ef1c_fk_property_areas_id`
    FOREIGN KEY (`area_id`)
    REFERENCES `hotel_management`.`property_areas` (`id`),
  CONSTRAINT `booking_reservations_guest_id_c5ca7d5a_fk_booking_guests_id`
    FOREIGN KEY (`guest_id`)
    REFERENCES `hotel_management`.`booking_guests` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`booking_reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`booking_reviews` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `review_text` LONGTEXT NOT NULL,
  `rating` INT NOT NULL,
  `booking_id` BIGINT NOT NULL,
  `guest_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `booking_reviews_booking_id_4ec64e66_fk_booking_bookings_id` (`booking_id` ASC) VISIBLE,
  INDEX `booking_reviews_guest_id_b76565f7_fk_booking_guests_id` (`guest_id` ASC) VISIBLE,
  CONSTRAINT `booking_reviews_booking_id_4ec64e66_fk_booking_bookings_id`
    FOREIGN KEY (`booking_id`)
    REFERENCES `hotel_management`.`booking_bookings` (`id`),
  CONSTRAINT `booking_reviews_guest_id_b76565f7_fk_booking_guests_id`
    FOREIGN KEY (`guest_id`)
    REFERENCES `hotel_management`.`booking_guests` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`booking_transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`booking_transactions` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `transaction_type` VARCHAR(30) NOT NULL,
  `amount` DECIMAL(10,2) NULL DEFAULT NULL,
  `transaction_date` DATETIME(6) NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `booking_id` BIGINT NULL DEFAULT NULL,
  `guest_id` BIGINT NOT NULL,
  `reservation_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `booking_transactions_booking_id_0fcfa857_fk_booking_bookings_id` (`booking_id` ASC) VISIBLE,
  INDEX `booking_transactions_guest_id_539cecf4_fk_booking_guests_id` (`guest_id` ASC) VISIBLE,
  INDEX `booking_transactions_reservation_id_fb28294b_fk_booking_r` (`reservation_id` ASC) VISIBLE,
  CONSTRAINT `booking_transactions_booking_id_0fcfa857_fk_booking_bookings_id`
    FOREIGN KEY (`booking_id`)
    REFERENCES `hotel_management`.`booking_bookings` (`id`),
  CONSTRAINT `booking_transactions_guest_id_539cecf4_fk_booking_guests_id`
    FOREIGN KEY (`guest_id`)
    REFERENCES `hotel_management`.`booking_guests` (`id`),
  CONSTRAINT `booking_transactions_reservation_id_fb28294b_fk_booking_r`
    FOREIGN KEY (`reservation_id`)
    REFERENCES `hotel_management`.`booking_reservations` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`guests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`guests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(200) NOT NULL,
  `last_name` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `address` TEXT NOT NULL,
  `contact_number` VARCHAR(25) NOT NULL,
  `role` ENUM('regular', 'vip') NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `contact_number` (`contact_number` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`room_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`room_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `base_price` DECIMAL(10,2) NOT NULL,
  `capacity` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `room_number` VARCHAR(10) NOT NULL,
  `room_type_id` INT NOT NULL,
  `status` ENUM('available', 'occupied', 'maintenance') NULL DEFAULT 'available',
  `notes` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `room_number` (`room_number` ASC) VISIBLE,
  INDEX `room_type_id` (`room_type_id` ASC) VISIBLE,
  CONSTRAINT `rooms_ibfk_1`
    FOREIGN KEY (`room_type_id`)
    REFERENCES `hotel_management`.`room_types` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`bookings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`bookings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `guest_id` INT NOT NULL,
  `room_id` INT NOT NULL,
  `check_in_date` DATE NOT NULL,
  `check_out_date` DATE NOT NULL,
  `status` ENUM('confirmed', 'checked_in', 'checked_out', 'cancelled') NULL DEFAULT 'confirmed',
  `cancellation_date` DATETIME NULL DEFAULT NULL,
  `cancellation_reason` TEXT NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `guest_id` (`guest_id` ASC) VISIBLE,
  INDEX `room_id` (`room_id` ASC) VISIBLE,
  INDEX `idx_bookings_dates` (`check_in_date` ASC, `check_out_date` ASC) VISIBLE,
  CONSTRAINT `bookings_ibfk_1`
    FOREIGN KEY (`guest_id`)
    REFERENCES `hotel_management`.`guests` (`id`),
  CONSTRAINT `bookings_ibfk_2`
    FOREIGN KEY (`room_id`)
    REFERENCES `hotel_management`.`rooms` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`django_admin_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`django_admin_log` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `action_time` DATETIME(6) NOT NULL,
  `object_id` LONGTEXT NULL DEFAULT NULL,
  `object_repr` VARCHAR(200) NOT NULL,
  `action_flag` SMALLINT UNSIGNED NOT NULL,
  `change_message` LONGTEXT NOT NULL,
  `content_type_id` INT NULL DEFAULT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id` ASC) VISIBLE,
  INDEX `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co`
    FOREIGN KEY (`content_type_id`)
    REFERENCES `hotel_management`.`django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `hotel_management`.`auth_user` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`django_migrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`django_migrations` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `app` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `applied` DATETIME(6) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`django_session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`django_session` (
  `session_key` VARCHAR(40) NOT NULL,
  `session_data` LONGTEXT NOT NULL,
  `expire_date` DATETIME(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  INDEX `django_session_expire_date_a5c62663` (`expire_date` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`property_amenities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`property_amenities` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`property_roomtypeamenities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`property_roomtypeamenities` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `amenity_id` BIGINT NOT NULL,
  `room_type_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `property_roomtypeamenities_room_type_id_amenity_id_bd8b5ff2_uniq` (`room_type_id` ASC, `amenity_id` ASC) VISIBLE,
  INDEX `property_roomtypeame_amenity_id_d4d4287c_fk_property_` (`amenity_id` ASC) VISIBLE,
  CONSTRAINT `property_roomtypeame_amenity_id_d4d4287c_fk_property_`
    FOREIGN KEY (`amenity_id`)
    REFERENCES `hotel_management`.`property_amenities` (`id`),
  CONSTRAINT `property_roomtypeame_room_type_id_7bb49118_fk_property_`
    FOREIGN KEY (`room_type_id`)
    REFERENCES `hotel_management`.`property_roomtypes` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`reservations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`reservations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `guest_id` INT NOT NULL,
  `area_id` INT NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NOT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  `status` ENUM('confirmed', 'cancelled') NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `guest_id` (`guest_id` ASC) VISIBLE,
  INDEX `area_id` (`area_id` ASC) VISIBLE,
  INDEX `idx_reservations_times` (`start_time` ASC, `end_time` ASC) VISIBLE,
  CONSTRAINT `reservations_ibfk_1`
    FOREIGN KEY (`guest_id`)
    REFERENCES `hotel_management`.`guests` (`id`),
  CONSTRAINT `reservations_ibfk_2`
    FOREIGN KEY (`area_id`)
    REFERENCES `hotel_management`.`areas` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`reviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `booking_id` INT NOT NULL,
  `guest_id` INT NOT NULL,
  `review_text` TEXT NULL DEFAULT NULL,
  `rating` INT NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `booking_id` (`booking_id` ASC) VISIBLE,
  INDEX `guest_id` (`guest_id` ASC) VISIBLE,
  CONSTRAINT `reviews_ibfk_1`
    FOREIGN KEY (`booking_id`)
    REFERENCES `hotel_management`.`bookings` (`id`),
  CONSTRAINT `reviews_ibfk_2`
    FOREIGN KEY (`guest_id`)
    REFERENCES `hotel_management`.`guests` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`room_type_amenities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`room_type_amenities` (
  `room_type_id` INT NOT NULL,
  `amenity_id` INT NOT NULL,
  PRIMARY KEY (`room_type_id`, `amenity_id`),
  INDEX `amenity_id` (`amenity_id` ASC) VISIBLE,
  CONSTRAINT `room_type_amenities_ibfk_1`
    FOREIGN KEY (`room_type_id`)
    REFERENCES `hotel_management`.`room_types` (`id`),
  CONSTRAINT `room_type_amenities_ibfk_2`
    FOREIGN KEY (`amenity_id`)
    REFERENCES `hotel_management`.`amenities` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`room_type_prices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`room_type_prices` (
  `room_type_id` INT NOT NULL,
  `valid_from` DATE NOT NULL,
  `price` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`room_type_id`, `valid_from`),
  CONSTRAINT `room_type_prices_ibfk_1`
    FOREIGN KEY (`room_type_id`)
    REFERENCES `hotel_management`.`room_types` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `booking_id` INT NULL DEFAULT NULL,
  `reservation_id` INT NULL DEFAULT NULL,
  `guest_id` INT NOT NULL,
  `transaction_type` ENUM('room_booking', 'area_reservation', 'cancellation_refund', 'additional_charge') NULL DEFAULT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `transaction_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('completed', 'pending', 'failed') NULL DEFAULT 'pending',
  PRIMARY KEY (`id`),
  INDEX `booking_id` (`booking_id` ASC) VISIBLE,
  INDEX `reservation_id` (`reservation_id` ASC) VISIBLE,
  INDEX `guest_id` (`guest_id` ASC) VISIBLE,
  CONSTRAINT `transactions_ibfk_1`
    FOREIGN KEY (`booking_id`)
    REFERENCES `hotel_management`.`bookings` (`id`),
  CONSTRAINT `transactions_ibfk_2`
    FOREIGN KEY (`reservation_id`)
    REFERENCES `hotel_management`.`reservations` (`id`),
  CONSTRAINT `transactions_ibfk_3`
    FOREIGN KEY (`guest_id`)
    REFERENCES `hotel_management`.`guests` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hotel_management`.`user_auth_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel_management`.`user_auth_user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `owner_id` INT NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE,
  INDEX `user_auth_note_owner_id_d5c153e0_fk_auth_user_id` (`owner_id` ASC) VISIBLE,
  CONSTRAINT `user_auth_note_owner_id_d5c153e0_fk_auth_user_id`
    FOREIGN KEY (`owner_id`)
    REFERENCES `hotel_management`.`auth_user` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;