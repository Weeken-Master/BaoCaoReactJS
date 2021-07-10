-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 08, 2021 lúc 07:39 AM
-- Phiên bản máy phục vụ: 10.4.18-MariaDB
-- Phiên bản PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `myreact`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `chat`
--

INSERT INTO `chat` (`id`, `UserID`, `text`, `time`) VALUES
(1, 15, 'Hello', '2021-07-02 12:37:41'),
(3, 31, 'chào admin', '2021-07-02 12:45:35'),
(4, 27, 'Chào nha', '2021-07-02 12:46:07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `idPost` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`id`, `UserID`, `idPost`, `text`, `time`) VALUES
(1, 31, 1, 'Alo', '2021-07-01 23:21:35'),
(2, 31, 1, 'Alo', '2021-07-01 23:21:49'),
(3, 15, 1, 'Aqqq', '2021-07-01 23:24:30'),
(4, 15, 1, 'Aqppppqq', '2021-07-01 23:24:32'),
(5, 28, 4, '1111', '2021-07-02 00:25:12'),
(6, 15, 7, 'test cmt cái coi', '2021-07-02 11:55:32'),
(7, 15, 7, 'hay quá ta', '2021-07-02 11:55:40'),
(8, 28, 10, '4242142142', '2021-07-02 15:32:34'),
(9, 28, 2, '224124214', '2021-07-02 15:36:12'),
(10, 31, 9, '32132414', '2021-07-02 15:45:30'),
(11, 31, 7, '4214214242412', '2021-07-02 18:56:08'),
(12, 31, 17, '231323112', '2021-07-02 19:01:02'),
(35, 28, 34, 'cmt dạo', '2021-07-08 12:19:06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `PostID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ThemeID` int(11) DEFAULT NULL,
  `Header` varchar(255) NOT NULL,
  `Content` varchar(2000) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `Linkpath` varchar(255) DEFAULT NULL,
  `CountCMT` int(11) NOT NULL,
  `Time` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`PostID`, `UserID`, `ThemeID`, `Header`, `Content`, `Image`, `Linkpath`, `CountCMT`, `Time`, `Status`) VALUES
(1, 31, 2, 'Nguyễn Văn Hậu', 'Test bài đầu tiên', 'received_841963193072937.jpeg', 'null', 4, '2021-07-05 17:51:17', 1),
(2, 31, 1, 'Jjsjwjeje', 'Eejejjejeje', 'null', 'null', 1, '2021-07-02 15:36:12', 0),
(3, 31, 2, 'Jjsjwjejedjejejejejjr', 'Eejejjejejemmdmmeme', 'null', 'null', 0, '2021-07-02 00:11:25', 0),
(4, 28, 2, 'Test', 'Aa', 'null', 'null', 1, '2021-07-02 00:25:12', 0),
(5, 15, 1, 'Hậu', '123', 'null', 'null', 0, '2021-07-02 11:53:44', 0),
(6, 15, 2, 'Nguyễn', 'test nội dung coi ', '206421033_351371629693988_1767236463165705095_n.jpg', 'null', 0, '2021-07-02 11:55:01', 0),
(7, 15, 2, 'Nguyễn', 'test nội dung coi ', '206421033_351371629693988_1767236463165705095_n.jpg', 'null', 3, '2021-07-02 18:56:09', 0),
(8, 28, 2, '123', '412414214', 'dc03c55791fc64a23ded.jpg', 'null', 0, '2021-07-02 15:31:01', 0),
(9, 28, 2, '123', '412414214', 'dc03c55791fc64a23ded.jpg', 'null', 1, '2021-07-02 15:45:30', 0),
(10, 28, 2, '42144124421421', '3124214', 'null', 'null', 1, '2021-07-02 15:32:34', 0),
(11, 31, 1, '2414', '214124', 'null', 'null', 0, '2021-07-02 15:45:39', 0),
(12, 31, 1, '32141242421412', '421421421441421421', 'null', 'null', 0, '2021-07-02 16:47:20', 0),
(13, 31, 2, '2131313', '124242142', 'null', 'null', 0, '2021-07-02 16:47:38', 0),
(14, 31, 1, '52525235', '535325253253', 'null', 'null', 0, '2021-07-02 16:50:33', 0),
(15, 31, 1, '525252352424243', '535325253253', 'null', 'null', 0, '2021-07-02 16:51:06', 0),
(16, 31, 1, '52525235242424332532525325', '535325253253', 'null', 'null', 0, '2021-07-02 16:51:18', 0),
(17, 15, 2, '42141421', '414214214', 'null', 'null', 1, '2021-07-02 19:01:03', 0),
(18, 15, 1, '24124242142142142', '4124142424214', 'null', 'null', 0, '2021-07-02 17:02:36', 0),
(19, 15, 1, '241242421421421424242142412', '4124142424214', 'null', 'null', 0, '2021-07-05 01:13:44', 0),
(20, 28, 1, 'Uuaisiaj', 'Jsjsjjejej', 'null', 'null', 0, '2021-07-02 23:25:12', 0),
(21, 28, 1, 'Jjdjdjdkdn', 'Dd', 'null', 'null', 0, '2021-07-02 23:26:11', 0),
(22, 15, 1, 'Test bài viết coi', '123', 'received_841963193072937.jpeg', 'null', 0, '2021-07-03 13:40:08', 0),
(23, 15, 1, 'nHẬP CAP MPOWS', 'Thêm cái coi', 'received_841963193072937.jpeg', 'null', 0, '2021-07-05 17:15:42', 0),
(24, 15, 1, 'Nhập cái cap coi', 'Qqqqqqq', 'received_841963193072937.jpeg', 'null', 0, '2021-07-03 15:30:26', 0),
(25, 15, 1, '2142142', '124142412422424', 'null', 'null', 0, '2021-07-05 17:44:34', 0),
(28, 37, 2, 'hậu', '1214', 'null', 'null', 0, '2021-07-05 15:47:40', 0),
(29, 37, 2, 'Hậu', 'Thay cái cap coi', 'agsag.PNG', 'null', 0, '2021-07-05 17:41:10', 0),
(32, 31, 1, 'Hậu', 'Test', 'null', 'null', 0, '2021-07-05 19:40:32', 0),
(34, 37, 1, 'tại cái cap coi', 'test nội dung', 'null', 'null', 1, '2021-07-08 12:19:06', 0),
(35, 28, 1, '', '', 'null', 'null', 0, '2021-07-05 20:15:31', 0),
(36, 28, 1, 'nhập cái cap mới', 'sầ', 'null', 'null', 0, '2021-07-08 12:25:05', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `setting`
--

CREATE TABLE `setting` (
  `id` int(11) NOT NULL,
  `TimePost` int(11) NOT NULL,
  `StatusPost` int(1) NOT NULL,
  `StatusRegister` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `setting`
--

INSERT INTO `setting` (`id`, `TimePost`, `StatusPost`, `StatusRegister`) VALUES
(1, 35, 0, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `themes`
--

CREATE TABLE `themes` (
  `ThemeID` int(11) NOT NULL,
  `ThemeName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `themes`
--

INSERT INTO `themes` (`ThemeID`, `ThemeName`) VALUES
(1, 'Hỏi Đáp'),
(2, 'Chia sẽ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `fullname` varchar(108) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Email` varchar(108) NOT NULL,
  `actived` int(1) NOT NULL DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`UserID`, `Username`, `fullname`, `Password`, `Email`, `actived`, `time`) VALUES
(15, 'admin', 'Quản Trị Viên', 'ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa', 'haunguyen15800@gmail.com', 1, '2021-05-07 17:35:05'),
(27, 'hau', 'Tài Khoản Thử Nghiệm', 'ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa', 'haunguyen15800@gmail.com', 0, '2021-05-21 17:35:05'),
(28, 'Test', 'Test Tên', 'ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa', 'haunguyen15800@gmail.com', 1, '2021-06-16 17:35:05'),
(31, 'ad', 'Test Tên', 'ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa', 'haukenjil00@gmail.com', 1, '2021-07-02 17:35:05'),
(37, 'test1', 'HN', 'ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa', 'hau@gamil.com', 0, '2021-07-05 15:47:25');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserID` (`UserID`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPost` (`idPost`),
  ADD KEY `UserID` (`UserID`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`PostID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `ThemeID` (`ThemeID`);

--
-- Chỉ mục cho bảng `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`ThemeID`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `PostID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT cho bảng `setting`
--
ALTER TABLE `setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `themes`
--
ALTER TABLE `themes`
  MODIFY `ThemeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`idPost`) REFERENCES `posts` (`PostID`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Các ràng buộc cho bảng `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`ThemeID`) REFERENCES `themes` (`ThemeID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
