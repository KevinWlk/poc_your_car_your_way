CREATE DATABASE IF NOT EXISTS poc;

USE poc;

CREATE TABLE `AGENCIES` (
                            `id` INT PRIMARY KEY AUTO_INCREMENT,
                            `name` VARCHAR(40) NOT NULL,
                            `address` VARCHAR(255) NOT NULL,
                            `createdat` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                            `updatedat` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE `USERS` (
                         `id` INT PRIMARY KEY AUTO_INCREMENT,
                         `firstname` VARCHAR(40) NOT NULL,
                         `lastname` VARCHAR(40) NOT NULL,
                         `email` VARCHAR(40) NOT NULL,
                         `password` VARCHAR(255) NOT NULL,
                         `birthdate` DATE NOT NULL,
                         `type` VARCHAR(40) NOT NULL, -- customer / support
                         `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                         `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE `CUSTOMERS` (
                             `customerid` INT PRIMARY KEY AUTO_INCREMENT,
                             `address` VARCHAR(255) NOT NULL,
                             `userid` INT NOT NULL,
                             FOREIGN KEY (`userid`) REFERENCES `USERS`(`id`)
);

CREATE TABLE `CUSTOMER_SERVICE` (
                                    `customerserviceid` INT PRIMARY KEY AUTO_INCREMENT,
                                    `agencyid` INT NOT NULL,
                                    `userid` INT NOT NULL,
                                    FOREIGN KEY (`userid`) REFERENCES `USERS`(`id`),
                                    FOREIGN KEY (`agencyid`) REFERENCES `AGENCIES`(`id`)
);

CREATE TABLE `VEHICLE_CATEGORIES` (
                                      `id` INT PRIMARY KEY AUTO_INCREMENT,
                                      `category` VARCHAR(255) NOT NULL,
                                      `type` VARCHAR(255) NOT NULL,
                                      `transmission` VARCHAR(255) NOT NULL,
                                      `fuel` VARCHAR(255) NOT NULL
);

-- 🔹 Offres de location
CREATE TABLE `OFFERS` (
                          `id` INT PRIMARY KEY AUTO_INCREMENT,
                          `agencyid` INT NOT NULL,
                          `departurecity` VARCHAR(255) NOT NULL,
                          `backcity` VARCHAR(255) NOT NULL,
                          `departuretimestamp` TIMESTAMP NOT NULL,
                          `backtimestamp` TIMESTAMP NOT NULL,
                          `vehiclecategory` INT NOT NULL,
                          `price` INT NOT NULL,
                          `createdat` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                          `updatedat` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                          FOREIGN KEY (`agencyid`) REFERENCES `AGENCIES`(`id`),
                          FOREIGN KEY (`vehiclecategory`) REFERENCES `VEHICLE_CATEGORIES`(`id`)
);

CREATE TABLE `RENTALS` (
                           `id` INT PRIMARY KEY AUTO_INCREMENT,
                           `offerid` INT NOT NULL,
                           `customerrenterid` INT NOT NULL,
                           `createdat` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                           `updatedat` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                           FOREIGN KEY (`offerid`) REFERENCES `OFFERS`(`id`),
                           FOREIGN KEY (`customerrenterid`) REFERENCES `CUSTOMERS`(`customerid`)
);

CREATE TABLE `CONVERSATIONS` (
                                 `id` INT PRIMARY KEY AUTO_INCREMENT,
                                 `customerid` INT NOT NULL,
                                 `customerserviceid` INT NOT NULL,
                                 `createdat` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                 `updatedat` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                                 FOREIGN KEY (`customerid`) REFERENCES `CUSTOMERS`(`customerid`),
                                 FOREIGN KEY (`customerserviceid`) REFERENCES `CUSTOMER_SERVICE`(`customerserviceid`)
);

CREATE TABLE `MESSAGES` (
                            `id` INT PRIMARY KEY AUTO_INCREMENT,
                            `conversationid` INT NOT NULL,
                            `senderid` INT NOT NULL, -- FK vers USERS : client ou support
                            `message_content` VARCHAR(2000) NOT NULL,
                            `sent_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                            FOREIGN KEY (`conversationid`) REFERENCES `CONVERSATIONS`(`id`),
                            FOREIGN KEY (`senderid`) REFERENCES `USERS`(`id`)
);