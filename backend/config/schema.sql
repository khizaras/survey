-- MySQL schema for Internal Polling Application

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  department VARCHAR(255),
  sso_id VARCHAR(255) NOT NULL UNIQUE
);

-- Polls Table
CREATE TABLE IF NOT EXISTS polls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  creator_id INT NOT NULL,
  question VARCHAR(1024) NOT NULL,
  image_url VARCHAR(1024),
  type ENUM('radio', 'checkbox') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NULL,
  status ENUM('active', 'completed') DEFAULT 'active'
);

-- Questions Table (for multi-question polls)
CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  poll_id INT NOT NULL,
  question_text VARCHAR(1024) NOT NULL,
  type ENUM('radio', 'checkbox') NOT NULL,
  image_url VARCHAR(1024),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Options Table (references question_id)
CREATE TABLE IF NOT EXISTS options (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  option_text VARCHAR(1024) NOT NULL
);

-- Votes Table (references poll_id, question_id, option_id, user_id)
CREATE TABLE IF NOT EXISTS votes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  poll_id INT NOT NULL,
  question_id INT NOT NULL,
  option_id INT NOT NULL
);
