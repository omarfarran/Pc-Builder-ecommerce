-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 20 ديسمبر 2025 الساعة 22:16
-- إصدار الخادم: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admins`
--

-- --------------------------------------------------------

--
-- بنية الجدول `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `role`) VALUES
(4, 'omar', 'omar@gmail.com', '123456', 'admin'),
(5, 'Admin User', 'admin@pcbuilder.com', 'admin123', 'admin');

-- --------------------------------------------------------

--
-- بنية الجدول `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `product_id`, `qty`, `created_at`) VALUES
(10, 12, 6, 2, '2025-12-19 19:31:29'),
(11, 12, 7, 1, '2025-12-19 19:31:32'),
(12, 12, 5, 1, '2025-12-19 19:31:34'),
(51, 7, 5, 5, '2025-12-20 16:04:28'),
(56, 7, 22, 1, '2025-12-20 19:32:12');

-- --------------------------------------------------------

--
-- بنية الجدول `cpu`
--

CREATE TABLE `cpu` (
  `product_id` int(11) NOT NULL,
  `cores` int(11) NOT NULL,
  `threads` int(11) NOT NULL,
  `base_clock` double NOT NULL,
  `boost_clock` double NOT NULL,
  `socket` varchar(20) NOT NULL,
  `tdp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `cpu`
--

INSERT INTO `cpu` (`product_id`, `cores`, `threads`, `base_clock`, `boost_clock`, `socket`, `tdp`) VALUES
(12, 24, 32, 3, 5.8, 'LGA1700', 125),
(13, 16, 24, 3.4, 5.4, 'LGA1700', 125),
(14, 12, 24, 4.7, 5.6, 'AM5', 170),
(15, 14, 20, 3.5, 5.1, 'LGA1700', 125),
(16, 8, 16, 4.5, 5.4, 'AM5', 105);

-- --------------------------------------------------------

--
-- بنية الجدول `gpu`
--

CREATE TABLE `gpu` (
  `product_id` int(11) NOT NULL,
  `vram` int(11) NOT NULL,
  `core_clock` int(11) NOT NULL,
  `memory_bus` int(11) NOT NULL,
  `tdp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `gpu`
--

INSERT INTO `gpu` (`product_id`, `vram`, `core_clock`, `memory_bus`, `tdp`) VALUES
(4, 16, 2124, 256, 263),
(5, 24, 2300, 384, 355),
(6, 12, 1830, 192, 200),
(7, 24, 2235, 384, 450);

-- --------------------------------------------------------

--
-- بنية الجدول `motherboard`
--

CREATE TABLE `motherboard` (
  `product_id` int(11) NOT NULL,
  `socket` text NOT NULL,
  `chipset` text NOT NULL,
  `form_factor` text NOT NULL,
  `max_ram` int(11) NOT NULL,
  `ram_type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `motherboard`
--

INSERT INTO `motherboard` (`product_id`, `socket`, `chipset`, `form_factor`, `max_ram`, `ram_type`) VALUES
(4, 'AM4', 'B550', 'ATX', 128, 'DDR4');

-- --------------------------------------------------------

--
-- بنية الجدول `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `city` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `date` date NOT NULL,
  `status` text NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `orders`
--

INSERT INTO `orders` (`id`, `userId`, `userName`, `email`, `phone`, `city`, `address`, `date`, `status`, `total`) VALUES
(1, 12, '', '', '', NULL, NULL, '2025-12-19', 'pending', 4057),
(3, 7, '', '', '', NULL, NULL, '2025-01-10', 'completed', 468),
(4, 8, '', '', '', NULL, NULL, '2025-01-12', 'pending', 899),
(5, 7, 'omar', 'ommar@gmail.com', '', NULL, NULL, '2025-12-19', 'pending', 300),
(6, 7, 'omar', 'ommar@gmail.com', '', NULL, NULL, '2025-12-19', 'pending', 470),
(7, 7, 'omar', 'ommar@gmail.com', '05977777', 'nablus', 'nablus', '2025-12-19', 'pending', 1599),
(8, 7, 'omar', 'omar_farran123@hotmail.com', '0597994958', 'nablus', 'anblusss', '2025-12-19', 'pending', 6178);

-- --------------------------------------------------------

--
-- بنية الجدول `order_items`
--

CREATE TABLE `order_items` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `order_items`
--

INSERT INTO `order_items` (`order_id`, `product_id`, `qty`, `price`) VALUES
(5, 6, 1, 300),
(6, 6, 1, 300),
(6, 9, 1, 170),
(7, 7, 1, 1599),
(8, 4, 1, 433),
(8, 7, 1, 1599),
(8, 13, 2, 549),
(8, 17, 1, 299),
(8, 18, 1, 239),
(8, 20, 1, 149),
(8, 22, 1, 129),
(8, 26, 1, 85),
(8, 32, 1, 1599),
(8, 36, 1, 95),
(8, 44, 1, 120),
(8, 55, 1, 109),
(8, 57, 1, 139),
(8, 62, 1, 85);

-- --------------------------------------------------------

--
-- بنية الجدول `pc_cases`
--

CREATE TABLE `pc_cases` (
  `product_id` int(11) NOT NULL,
  `form_factor` text NOT NULL,
  `gpu_max_length_mm` int(11) NOT NULL,
  `cooling_support` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `pc_cases`
--

INSERT INTO `pc_cases` (`product_id`, `form_factor`, `gpu_max_length_mm`, `cooling_support`) VALUES
(11, 'ATX', 381, 'Front 2x120mm, Top 2x120mm, Rear 1x120mm');

-- --------------------------------------------------------

--
-- بنية الجدول `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `type` varchar(100) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(10) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `products`
--

INSERT INTO `products` (`id`, `name`, `type`, `brand`, `price`, `stock`, `description`, `image`) VALUES
(4, 'AMD RX 7800 XT', 'GPU', 'AMD', 433.00, 20, 'Excellent price-performance GPU for 1440p gaming', '../../assets/images/productsimgs/amd7080.webp'),
(5, 'AMD RX 7900 XTX', 'GPU', 'AMD', 289.00, 30, 'Flagship RDNA 3 graphics card with 24GB VRAM', '../../assets/images/productsimgs/AMD7900.webp'),
(6, 'NVIDIA RTX 4070', 'GPU', 'NVIDIA', 300.00, 35, 'Great 1440p gaming with RTX features', '../../assets/images/productsimgs/tx.webp'),
(7, 'NVIDIA RTX 4090', 'GPU', 'NVIDIA', 1599.00, 6, 'Ultimate 4K gaming performance with RT and DLSS 3', '../../assets/images/productsimgs/rtx4090.webp'),
(8, 'Corsair 4000D Airflow', 'Case', 'Corsair', 120.00, 10, 'High-airflow mid-tower with tempered glass', '../../assets/images/productsimgs/case1.webp'),
(9, 'Fractal Design Define 7', 'Case', 'Fractal', 170.00, 16, 'Silent mid-tower case with excellent airflow', '../../assets/images/productsimgs/case2.webp'),
(10, 'NZXT H7 Flow', 'Case', 'NZXT', 150.00, 7, 'Ultra airflow case with minimalist design', '../../assets/images/productsimgs/case3.webp'),
(11, 'DeepCool MATREXX 55', 'Case', 'DeepCool', 95.00, 12, 'Modern tower case with tempered glass side panel', '../../assets/images/productsimgs/case5.webp'),
(12, 'Intel Core i9-13900K', 'CPU', 'Intel', 599.00, 10, 'High-end 24-core CPU for gaming and productivity', '../../assets/images/inteli9.webp'),
(13, 'Intel Core i7-13700K', 'CPU', 'Intel', 549.00, 15, 'Excellent performance CPU for gaming and multitasking', '../../assets/images/Intel Core i7.webp'),
(14, 'AMD Ryzen 9 7900X', 'CPU', 'AMD', 399.00, 12, 'Powerful Ryzen CPU with 12 cores', '../../assets/images/AMD7.webp'),
(15, 'Intel Core i5-13600K', 'CPU', 'Intel', 419.00, 0, NULL, '../../assets/images/i5.webp'),
(16, 'AMD Ryzen 7 7700X', 'CPU', 'AMD', 300.00, 0, NULL, '../../assets/images/AMD7.webp'),
(17, 'Gigabyte Z790 AORUS Elite AX', 'Motherboard', 'Gigabyte', 299.00, 10, 'Intel Z790 motherboard with WiFi 6E', '../../assets/images/mbb.webp'),
(18, 'MSI MPG B650 Tomahawk WiFi', 'Motherboard', 'MSI', 239.00, 14, 'Reliable AM5 motherboard for Ryzen CPUs', '../../assets/images/mbb.webp'),
(19, 'Corsair Vengeance 32GB DDR5 6000MHz', 'RAM', 'Corsair', 109.00, 20, 'Fast DDR5 RAM kit for gaming PCs', '../../assets/images/R.webp'),
(20, 'G.SKILL Trident Z5 RGB 32GB DDR5', 'RAM', 'G.Skill', 149.00, 12, 'Premium RGB DDR5 memory', '../../assets/images/R.webp'),
(21, 'Corsair RM850x 850W 80+ Gold', 'PSU', 'Corsair', 139.00, 18, 'Fully modular PSU with silent fan and high efficiency', '../../assets/images/psu.webp'),
(22, 'EVGA SuperNOVA 750 G5', 'PSU', 'EVGA', 129.00, 12, 'High quality modular PSU with Japanese capacitors', '../../assets/images/psu.webp'),
(23, 'Cooler Master MWE Gold 650W', 'PSU', 'Cooler Master', 99.00, 20, 'Reliable PSU with Gold efficiency for gaming builds', '../../assets/images/power.webp'),
(24, 'Samsung 980 PRO 1TB NVMe SSD', 'Storage', 'Samsung', 120.00, 25, 'High-performance PCIe 4.0 NVMe SSD', '../../assets/images/sa.webp'),
(25, 'WD Black SN850X 2TB NVMe SSD', 'Storage', 'Western Digital', 190.00, 18, 'Ultra-fast NVMe SSD optimized for gaming', '../../assets/images/ss.webp'),
(26, 'Crucial P3 Plus 1TB NVMe SSD', 'Storage', 'Crucial', 85.00, 30, 'Affordable NVMe SSD with solid performance', '../../assets/images/ss.webp'),
(27, 'Samsung 870 EVO 1TB SATA SSD', 'Storage', 'Samsung', 95.00, 22, 'Reliable SATA SSD with excellent endurance', '../../assets/images/sa.webp'),
(28, 'Seagate Barracuda 2TB HDD', 'Storage', 'Seagate', 60.00, 40, 'High-capacity HDD for mass storage', '../../assets/images/hdd.webp'),
(29, 'AMD RX 7800 XT', 'GPU', 'AMD', 433.00, 20, 'Excellent price-performance GPU for 1440p gaming', '../../assets/images/productsimgs/amd7080.webp'),
(30, 'AMD RX 7900 XTX', 'GPU', 'AMD', 289.00, 30, 'Flagship RDNA 3 graphics card with 24GB VRAM', '../../assets/images/productsimgs/AMD7900.webp'),
(31, 'NVIDIA RTX 4070', 'GPU', 'NVIDIA', 300.00, 35, 'Great 1440p gaming with RTX features', '../../assets/images/productsimgs/tx.webp'),
(32, 'NVIDIA RTX 4090', 'GPU', 'NVIDIA', 1599.00, 6, 'Ultimate 4K gaming performance with RT and DLSS 3', '../../assets/images/productsimgs/rtx4090.webp'),
(33, 'Corsair 4000D Airflow', 'Case', 'Corsair', 120.00, 10, 'High-airflow mid-tower with tempered glass', '../../assets/images/productsimgs/case1.webp'),
(34, 'Fractal Design Define 7', 'Case', 'Fractal', 170.00, 16, 'Silent mid-tower case with excellent airflow', '../../assets/images/productsimgs/case2.webp'),
(35, 'NZXT H7 Flow', 'Case', 'NZXT', 150.00, 7, 'Ultra airflow case with minimalist design', '../../assets/images/productsimgs/case3.webp'),
(36, 'DeepCool MATREXX 55', 'Case', 'DeepCool', 95.00, 12, 'Modern tower case with tempered glass side panel', '../../assets/images/productsimgs/case5.webp'),
(37, 'Intel Core i9-13900K', 'CPU', 'Intel', 599.00, 10, 'High-end 24-core CPU for gaming and productivity', '../../assets/images/inteli9.webp'),
(38, 'Intel Core i7-13700K', 'CPU', 'Intel', 549.00, 15, 'Excellent performance CPU for gaming and multitasking', '../../assets/images/Intel Core i7.webp'),
(39, 'AMD Ryzen 9 7900X', 'CPU', 'AMD', 399.00, 12, 'Powerful Ryzen CPU with 12 cores', '../../assets/images/AMD7.webp'),
(40, 'AMD RX 7800 XT', 'GPU', 'AMD', 433.00, 20, 'Excellent price-performance GPU for 1440p gaming', '../../assets/images/productsimgs/amd7080.webp'),
(41, 'AMD RX 7900 XTX', 'GPU', 'AMD', 289.00, 30, 'Flagship RDNA 3 graphics card with 24GB VRAM', '../../assets/images/productsimgs/AMD7900.webp'),
(42, 'NVIDIA RTX 4070', 'GPU', 'NVIDIA', 300.00, 35, 'Great 1440p gaming with RTX features', '../../assets/images/productsimgs/tx.webp'),
(43, 'NVIDIA RTX 4090', 'GPU', 'NVIDIA', 1599.00, 6, 'Ultimate 4K gaming performance with RT and DLSS 3', '../../assets/images/productsimgs/rtx4090.webp'),
(44, 'Corsair 4000D Airflow', 'Case', 'Corsair', 120.00, 10, 'High-airflow mid-tower with tempered glass', '../../assets/images/productsimgs/case1.webp'),
(45, 'Fractal Design Define 7', 'Case', 'Fractal', 170.00, 16, 'Silent mid-tower case with excellent airflow', '../../assets/images/productsimgs/case2.webp'),
(46, 'NZXT H7 Flow', 'Case', 'NZXT', 150.00, 7, 'Ultra airflow case with minimalist design', '../../assets/images/productsimgs/case3.webp'),
(47, 'DeepCool MATREXX 55', 'Case', 'DeepCool', 95.00, 12, 'Modern tower case with tempered glass side panel', '../../assets/images/productsimgs/case5.webp'),
(48, 'Intel Core i9-13900K', 'CPU', 'Intel', 599.00, 10, 'High-end 24-core CPU for gaming and productivity', '../../assets/images/inteli9.webp'),
(49, 'Intel Core i7-13700K', 'CPU', 'Intel', 549.00, 15, 'Excellent performance CPU for gaming and multitasking', '../../assets/images/Intel Core i7.webp'),
(50, 'AMD Ryzen 9 7900X', 'CPU', 'AMD', 399.00, 12, 'Powerful Ryzen CPU with 12 cores', '../../assets/images/AMD7.webp'),
(51, 'Intel Core i5-13600K', 'CPU', 'Intel', 419.00, 0, NULL, '../../assets/images/i5.webp'),
(52, 'AMD Ryzen 7 7700X', 'CPU', 'AMD', 300.00, 0, NULL, '../../assets/images/AMD7.webp'),
(53, 'Gigabyte Z790 AORUS Elite AX', 'Motherboard', 'Gigabyte', 299.00, 10, 'Intel Z790 motherboard with WiFi 6E', '../../assets/images/mbb.webp'),
(54, 'MSI MPG B650 Tomahawk WiFi', 'Motherboard', 'MSI', 239.00, 14, 'Reliable AM5 motherboard for Ryzen CPUs', '../../assets/images/mbb.webp'),
(55, 'Corsair Vengeance 32GB DDR5 6000MHz', 'RAM', 'Corsair', 109.00, 20, 'Fast DDR5 RAM kit for gaming PCs', '../../assets/images/R.webp'),
(56, 'G.SKILL Trident Z5 RGB 32GB DDR5', 'RAM', 'G.Skill', 149.00, 12, 'Premium RGB DDR5 memory', '../../assets/images/R.webp'),
(57, 'Corsair RM850x 850W 80+ Gold', 'PSU', 'Corsair', 139.00, 18, 'Fully modular PSU with silent fan and high efficiency', '../../assets/images/psu.webp'),
(58, 'EVGA SuperNOVA 750 G5', 'PSU', 'EVGA', 129.00, 12, 'High quality modular PSU with Japanese capacitors', '../../assets/images/psu.webp'),
(59, 'Cooler Master MWE Gold 650W', 'PSU', 'Cooler Master', 99.00, 20, 'Reliable PSU with Gold efficiency for gaming builds', '../../assets/images/power.webp'),
(60, 'Samsung 980 PRO 1TB NVMe SSD', 'Storage', 'Samsung', 120.00, 25, 'High-performance PCIe 4.0 NVMe SSD', '../../assets/images/sa.webp'),
(61, 'WD Black SN850X 2TB NVMe SSD', 'Storage', 'Western Digital', 190.00, 18, 'Ultra-fast NVMe SSD optimized for gaming', '../../assets/images/ss.webp'),
(62, 'Crucial P3 Plus 1TB NVMe SSD', 'Storage', 'Crucial', 85.00, 30, 'Affordable NVMe SSD with solid performance', '../../assets/images/ss.webp'),
(63, 'Samsung 870 EVO 1TB SATA SSD', 'Storage', 'Samsung', 95.00, 22, 'Reliable SATA SSD with excellent endurance', '../../assets/images/sa.webp'),
(64, 'Seagate Barracuda 2TB HDD', 'Storage', 'Seagate', 60.00, 40, 'High-capacity HDD for mass storage', '../../assets/images/hdd.webp');

-- --------------------------------------------------------

--
-- بنية الجدول `psu`
--

CREATE TABLE `psu` (
  `product_id` int(11) NOT NULL,
  `wattage` int(11) NOT NULL,
  `rating` text NOT NULL,
  `modular` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `psu`
--

INSERT INTO `psu` (`product_id`, `wattage`, `rating`, `modular`) VALUES
(7, 650, '80+ Gold', 'Semi-Modular');

-- --------------------------------------------------------

--
-- بنية الجدول `ram`
--

CREATE TABLE `ram` (
  `product_id` int(11) NOT NULL,
  `size_gb` int(11) NOT NULL,
  `modules` int(11) NOT NULL,
  `speed_mhz` int(11) NOT NULL,
  `type` text NOT NULL,
  `cas_latency` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `ram`
--

INSERT INTO `ram` (`product_id`, `size_gb`, `modules`, `speed_mhz`, `type`, `cas_latency`) VALUES
(5, 16, 2, 3200, 'DDR4', 16),
(19, 16, 2, 3200, 'DDR4', 16);

-- --------------------------------------------------------

--
-- بنية الجدول `storage`
--

CREATE TABLE `storage` (
  `product_id` int(11) NOT NULL,
  `type` text NOT NULL,
  `capacity_gb` int(11) NOT NULL,
  `read_speed` int(11) NOT NULL,
  `write_speed` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `storage`
--

INSERT INTO `storage` (`product_id`, `type`, `capacity_gb`, `read_speed`, `write_speed`) VALUES
(6, 'SSD NVMe', 1000, 3500, 3300);

-- --------------------------------------------------------

--
-- بنية الجدول `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  `reset_token` varchar(64) DEFAULT NULL,
  `token_expire` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `password`, `reset_token`, `token_expire`) VALUES
(7, 'ommar', 'ommar@gmail.com', '123456', NULL, NULL),
(8, 'omer ferran', 'omarfarran5@gmail.com', '123456', NULL, NULL),
(9, 'Ibrahim Ahmad', 'ibra@mail.com', '123456', NULL, NULL),
(10, 'Sara Khaled', 'sara@mail.com', '123456', NULL, NULL),
(11, 'Omar Ali', 'omar@mail.com', '123456', NULL, NULL),
(12, 'omer ferran', 'omar_farran123@hotmail.com', '1234567', NULL, NULL),
(13, 'ooo', 'ooooo@gmail.com', '123456', NULL, NULL),
(14, 'om om', 'o@gmail.com', '123456', NULL, NULL);

-- --------------------------------------------------------

--
-- بنية الجدول `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `wishlist`
--

INSERT INTO `wishlist` (`id`, `user_id`, `product_id`, `created_at`) VALUES
(6, 12, 5, '2025-12-19 19:16:15'),
(9, 7, 5, '2025-12-19 20:58:40'),
(10, 7, 6, '2025-12-19 20:58:42'),
(11, 7, 7, '2025-12-19 20:58:44'),
(14, 7, 10, '2025-12-20 19:41:49'),
(15, 7, 9, '2025-12-20 19:41:51'),
(18, 7, 13, '2025-12-20 19:44:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_cart` (`user_id`,`product_id`),
  ADD KEY `cart_items_ibfk_2` (`product_id`);

--
-- Indexes for table `cpu`
--
ALTER TABLE `cpu`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `gpu`
--
ALTER TABLE `gpu`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `motherboard`
--
ALTER TABLE `motherboard`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `fk_order_items_product` (`product_id`);

--
-- Indexes for table `pc_cases`
--
ALTER TABLE `pc_cases`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `psu`
--
ALTER TABLE `psu`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `ram`
--
ALTER TABLE `ram`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `storage`
--
ALTER TABLE `storage`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_wishlist` (`user_id`,`product_id`),
  ADD KEY `wishlist_ibfk_2` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `cpu`
--
ALTER TABLE `cpu`
  ADD CONSTRAINT `cpu_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `gpu`
--
ALTER TABLE `gpu`
  ADD CONSTRAINT `gpu_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `motherboard`
--
ALTER TABLE `motherboard`
  ADD CONSTRAINT `motherboard_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `pc_cases`
--
ALTER TABLE `pc_cases`
  ADD CONSTRAINT `pc_cases_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `psu`
--
ALTER TABLE `psu`
  ADD CONSTRAINT `psu_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `ram`
--
ALTER TABLE `ram`
  ADD CONSTRAINT `ram_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `storage`
--
ALTER TABLE `storage`
  ADD CONSTRAINT `fk_storage_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
