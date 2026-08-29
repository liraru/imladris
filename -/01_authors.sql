-- ============================================================
-- 01_authors.sql
-- Inserta todos los autores/artistas únicos extraídos de Biblioteca.xlsx
-- (hojas 'Novela' y 'Manga', columnas Autor / Guión / Dibujo).
-- Idempotente: usa WHERE NOT EXISTS por nombre, así que se puede volver a
-- ejecutar sin duplicar autores ya existentes en Supabase.
--
-- NOTA sobre 'country': el enum actual de la app (COUNTRY) solo admite
-- ES / GB / US / JP. Muchos autores reales son de otras nacionalidades
-- (francesa, rusa, china, coreana, belga...) que no tienen equivalente,
-- así que su country se deja en NULL a propósito (campo sin valor válido).
-- Revisa/ajusta manualmente si amplías el enum en el futuro.
-- ============================================================

INSERT INTO authors (name, country, notes)
SELECT '3A Corporation', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = '3A Corporation');

INSERT INTO authors (name, country, notes)
SELECT 'Adachitoka', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Adachitoka');

INSERT INTO authors (name, country, notes)
SELECT 'Akiko Yosano', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Akiko Yosano');

INSERT INTO authors (name, country, notes)
SELECT 'Akimi Yoshida', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Akimi Yoshida');

INSERT INTO authors (name, country, notes)
SELECT 'Akutagawa Ryunosuke', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Akutagawa Ryunosuke');

INSERT INTO authors (name, country, notes)
SELECT 'Alena Pons', 'ES', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Alena Pons');

INSERT INTO authors (name, country, notes)
SELECT 'Alex Pler', 'ES', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Alex Pler');

INSERT INTO authors (name, country, notes)
SELECT 'Alfonso R. Castelao', 'ES', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Alfonso R. Castelao');

INSERT INTO authors (name, country, notes)
SELECT 'Anthony Doerr', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Anthony Doerr');

INSERT INTO authors (name, country, notes)
SELECT 'Antonine de Saint-Exupéry', 'FR', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Antonine de Saint-Exupéry');

INSERT INTO authors (name, country, notes)
SELECT 'Arina Tanemura', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Arina Tanemura');

INSERT INTO authors (name, country, notes)
SELECT 'Asumiko Nakamura', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Asumiko Nakamura');

INSERT INTO authors (name, country, notes)
SELECT 'Atsuko Asano', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Atsuko Asano');

INSERT INTO authors (name, country, notes)
SELECT 'Atsushi Ohkubo', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Atsushi Ohkubo');

INSERT INTO authors (name, country, notes)
SELECT 'Bikke', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Bikke');

INSERT INTO authors (name, country, notes)
SELECT 'Brent Weeks', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Brent Weeks');

INSERT INTO authors (name, country, notes)
SELECT 'Bunta Tsushimi', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Bunta Tsushimi');

INSERT INTO authors (name, country, notes)
SELECT 'Carlos Ruíz Zafón', 'ES', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Carlos Ruíz Zafón');

INSERT INTO authors (name, country, notes)
SELECT 'Carmen Torres Ripa', 'ES', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Carmen Torres Ripa');

INSERT INTO authors (name, country, notes)
SELECT 'Charles Dickens', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Charles Dickens');

INSERT INTO authors (name, country, notes)
SELECT 'Christina Scull', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Christina Scull');

INSERT INTO authors (name, country, notes)
SELECT 'Chuuya Nakahara', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Chuuya Nakahara');

INSERT INTO authors (name, country, notes)
SELECT 'Dan Brown', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Dan Brown');

INSERT INTO authors (name, country, notes)
SELECT 'Daniel Wolf', 'DE', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Daniel Wolf');

INSERT INTO authors (name, country, notes)
SELECT 'David B. Gil', 'ES', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'David B. Gil');

INSERT INTO authors (name, country, notes)
SELECT 'Diana Jones Wynne', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Diana Jones Wynne');

INSERT INTO authors (name, country, notes)
SELECT 'Edgar Allan Poe', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Edgar Allan Poe');

INSERT INTO authors (name, country, notes)
SELECT 'Edogawa Ranpo', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Edogawa Ranpo');

INSERT INTO authors (name, country, notes)
SELECT 'Eric Marchal', 'FR', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Eric Marchal');

INSERT INTO authors (name, country, notes)
SELECT 'Ernest Cline', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Ernest Cline');

INSERT INTO authors (name, country, notes)
SELECT 'Ernest Hemingway', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Ernest Hemingway');

INSERT INTO authors (name, country, notes)
SELECT 'Fiódor Dostoievski', 'RU', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Fiódor Dostoievski');

INSERT INTO authors (name, country, notes)
SELECT 'Frederick Hadland Davis', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Frederick Hadland Davis');

INSERT INTO authors (name, country, notes)
SELECT 'Genzaburo Yoshino', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Genzaburo Yoshino');

INSERT INTO authors (name, country, notes)
SELECT 'George Orwell', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'George Orwell');

INSERT INTO authors (name, country, notes)
SELECT 'Glenn Cooper', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Glenn Cooper');

INSERT INTO authors (name, country, notes)
SELECT 'Gustavo Adolfo Becquer', 'ES', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Gustavo Adolfo Becquer');

INSERT INTO authors (name, country, notes)
SELECT 'Hagi', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Hagi');

INSERT INTO authors (name, country, notes)
SELECT 'Haruki Murakami', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Haruki Murakami');

INSERT INTO authors (name, country, notes)
SELECT 'Hideo Yokohama', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Hideo Yokohama');

INSERT INTO authors (name, country, notes)
SELECT 'Higuchi Ichiyo', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Higuchi Ichiyo');

INSERT INTO authors (name, country, notes)
SELECT 'Hinoki Kino', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Hinoki Kino');

INSERT INTO authors (name, country, notes)
SELECT 'Hiro Arikawa', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Hiro Arikawa');

INSERT INTO authors (name, country, notes)
SELECT 'Hiromi Kawakami', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Hiromi Kawakami');

INSERT INTO authors (name, country, notes)
SELECT 'Hiromi Sato', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Hiromi Sato');

INSERT INTO authors (name, country, notes)
SELECT 'Hiromu Arokawa', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Hiromu Arokawa');

INSERT INTO authors (name, country, notes)
SELECT 'Hisashi Kashiwai', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Hisashi Kashiwai');

INSERT INTO authors (name, country, notes)
SELECT 'Ian McEwan', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Ian McEwan');

INSERT INTO authors (name, country, notes)
SELECT 'Ildefonso Falcones', 'ES', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Ildefonso Falcones');

INSERT INTO authors (name, country, notes)
SELECT 'Inazo Nitobe', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Inazo Nitobe');

INSERT INTO authors (name, country, notes)
SELECT 'Inio Asano', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Inio Asano');

INSERT INTO authors (name, country, notes)
SELECT 'Izumi Kyoka', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Izumi Kyoka');

INSERT INTO authors (name, country, notes)
SELECT 'J. K. Rowling', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'J. K. Rowling');

INSERT INTO authors (name, country, notes)
SELECT 'Jack Thorne', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Jack Thorne');

INSERT INTO authors (name, country, notes)
SELECT 'Jay', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Jay');

INSERT INTO authors (name, country, notes)
SELECT 'Jihyun Yun', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Jihyun Yun');

INSERT INTO authors (name, country, notes)
SELECT 'John Ronald Reuel Tolkien', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'John Ronald Reuel Tolkien');

INSERT INTO authors (name, country, notes)
SELECT 'John Tiffany', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'John Tiffany');

INSERT INTO authors (name, country, notes)
SELECT 'Julio Verne', 'FR', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Julio Verne');

INSERT INTO authors (name, country, notes)
SELECT 'Jun Mochizuki', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Jun Mochizuki');

INSERT INTO authors (name, country, notes)
SELECT 'Juniichiro Tanizaki', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Juniichiro Tanizaki');

INSERT INTO authors (name, country, notes)
SELECT 'Kafka Asagiri', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Kafka Asagiri');

INSERT INTO authors (name, country, notes)
SELECT 'Kamome Shirahama', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Kamome Shirahama');

INSERT INTO authors (name, country, notes)
SELECT 'Kanna Kii', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Kanna Kii');

INSERT INTO authors (name, country, notes)
SELECT 'Katherine Neville', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Katherine Neville');

INSERT INTO authors (name, country, notes)
SELECT 'Ken Follet', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Ken Follet');

INSERT INTO authors (name, country, notes)
SELECT 'Kunikida Doppo', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Kunikida Doppo');

INSERT INTO authors (name, country, notes)
SELECT 'Kyota Ko', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Kyota Ko');

INSERT INTO authors (name, country, notes)
SELECT 'Lafcadio Hearn', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Lafcadio Hearn');

INSERT INTO authors (name, country, notes)
SELECT 'Laura Gallego', 'ES', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Laura Gallego');

INSERT INTO authors (name, country, notes)
SELECT 'Lewis Carrol', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Lewis Carrol');

INSERT INTO authors (name, country, notes)
SELECT 'Li Haoling', 'CN', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Li Haoling');

INSERT INTO authors (name, country, notes)
SELECT 'Makoto Shinkai', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Makoto Shinkai');

INSERT INTO authors (name, country, notes)
SELECT 'Mark Gatiss', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Mark Gatiss');

INSERT INTO authors (name, country, notes)
SELECT 'Marta García', 'ES', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Marta García');

INSERT INTO authors (name, country, notes)
SELECT 'Mary Shelley', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Mary Shelley');

INSERT INTO authors (name, country, notes)
SELECT 'Matt Haig', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Matt Haig');

INSERT INTO authors (name, country, notes)
SELECT 'Meng Xi Shi', 'CN', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Meng Xi Shi');

INSERT INTO authors (name, country, notes)
SELECT 'Michael Crane', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Michael Crane');

INSERT INTO authors (name, country, notes)
SELECT 'Miguel de Cervantes', 'ES', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Miguel de Cervantes');

INSERT INTO authors (name, country, notes)
SELECT 'Miyazawa Kenji', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Miyazawa Kenji');

INSERT INTO authors (name, country, notes)
SELECT 'Mo Xiang Tong Xiu', 'CN', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Mo Xiang Tong Xiu');

INSERT INTO authors (name, country, notes)
SELECT 'Mori Ogai', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Mori Ogai');

INSERT INTO authors (name, country, notes)
SELECT 'Nagisa Furuya', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Nagisa Furuya');

INSERT INTO authors (name, country, notes)
SELECT 'Natsuki Kizu', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Natsuki Kizu');

INSERT INTO authors (name, country, notes)
SELECT 'Natsume Soseki', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Natsume Soseki');

INSERT INTO authors (name, country, notes)
SELECT 'Nekojitablog', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Nekojitablog');

INSERT INTO authors (name, country, notes)
SELECT 'Oda Sakunosuke', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Oda Sakunosuke');

INSERT INTO authors (name, country, notes)
SELECT 'Oliver Bowden', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Oliver Bowden');

INSERT INTO authors (name, country, notes)
SELECT 'Osamu Dazai', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Osamu Dazai');

INSERT INTO authors (name, country, notes)
SELECT 'Oyoyo', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Oyoyo');

INSERT INTO authors (name, country, notes)
SELECT 'Patrick Rothfuss', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Patrick Rothfuss');

INSERT INTO authors (name, country, notes)
SELECT 'Peyo', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Peyo');

INSERT INTO authors (name, country, notes)
SELECT 'Phillip K. Dick', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Phillip K. Dick');

INSERT INTO authors (name, country, notes)
SELECT 'Phillip Pullman', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Phillip Pullman');

INSERT INTO authors (name, country, notes)
SELECT 'Piper C.J.', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Piper C.J.');

INSERT INTO authors (name, country, notes)
SELECT 'Richard Gordon Smith', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Richard Gordon Smith');

INSERT INTO authors (name, country, notes)
SELECT 'Robert Galbraith', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Robert Galbraith');

INSERT INTO authors (name, country, notes)
SELECT 'Robert Louis Stevenson', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Robert Louis Stevenson');

INSERT INTO authors (name, country, notes)
SELECT 'Rou Bao Bu Chi Rou', 'CN', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Rou Bao Bu Chi Rou');

INSERT INTO authors (name, country, notes)
SELECT 'Sakaguchi Ango', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Sakaguchi Ango');

INSERT INTO authors (name, country, notes)
SELECT 'Sanaka Hiiragi', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Sanaka Hiiragi');

INSERT INTO authors (name, country, notes)
SELECT 'Sango Harukawa', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Sango Harukawa');

INSERT INTO authors (name, country, notes)
SELECT 'Satoru Nii', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Satoru Nii');

INSERT INTO authors (name, country, notes)
SELECT 'Satoshi Yagisawa', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Satoshi Yagisawa');

INSERT INTO authors (name, country, notes)
SELECT 'Sayaka Murata', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Sayaka Murata');

INSERT INTO authors (name, country, notes)
SELECT 'Seicho Matsumoto', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Seicho Matsumoto');

INSERT INTO authors (name, country, notes)
SELECT 'Shinji Cobkubo', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Shinji Cobkubo');

INSERT INTO authors (name, country, notes)
SELECT 'Sir Arthur Conan Doyle', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Sir Arthur Conan Doyle');

INSERT INTO authors (name, country, notes)
SELECT 'Sosuke Natsukawa', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Sosuke Natsukawa');

INSERT INTO authors (name, country, notes)
SELECT 'Steve Alten', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Steve Alten');

INSERT INTO authors (name, country, notes)
SELECT 'Steven Moffat', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Steven Moffat');

INSERT INTO authors (name, country, notes)
SELECT 'Suzanne Collins', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Suzanne Collins');

INSERT INTO authors (name, country, notes)
SELECT 'Takeshi Hirano', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Takeshi Hirano');

INSERT INTO authors (name, country, notes)
SELECT 'Takeshi Obata', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Takeshi Obata');

INSERT INTO authors (name, country, notes)
SELECT 'Tang Jiu Qing', 'CN', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Tang Jiu Qing');

INSERT INTO authors (name, country, notes)
SELECT 'Tayama Katai', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Tayama Katai');

INSERT INTO authors (name, country, notes)
SELECT 'Teresa Pierce Williston', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Teresa Pierce Williston');

INSERT INTO authors (name, country, notes)
SELECT 'Teru Miyamoto', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Teru Miyamoto');

INSERT INTO authors (name, country, notes)
SELECT 'Titania Hardie', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Titania Hardie');

INSERT INTO authors (name, country, notes)
SELECT 'Tom Felton', 'GB', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Tom Felton');

INSERT INTO authors (name, country, notes)
SELECT 'Toshikazu Kawaguchi', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Toshikazu Kawaguchi');

INSERT INTO authors (name, country, notes)
SELECT 'Tsugumi Ohba', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Tsugumi Ohba');

INSERT INTO authors (name, country, notes)
SELECT 'VVAA', '-', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'VVAA');

INSERT INTO authors (name, country, notes)
SELECT 'Venio Tachibana', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Venio Tachibana');

INSERT INTO authors (name, country, notes)
SELECT 'Wayne G. Hammond', 'US', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Wayne G. Hammond');

INSERT INTO authors (name, country, notes)
SELECT 'Xavier Alcalá', 'ES', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Xavier Alcalá');

INSERT INTO authors (name, country, notes)
SELECT 'Yoko Nakazawa', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Yoko Nakazawa');

INSERT INTO authors (name, country, notes)
SELECT 'Yoshitoshi', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Yoshitoshi');

INSERT INTO authors (name, country, notes)
SELECT 'Yuki Fumino', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Yuki Fumino');

INSERT INTO authors (name, country, notes)
SELECT 'Yuko Tsushima', 'JP', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Yuko Tsushima');

INSERT INTO authors (name, country, notes)
SELECT 'miHoYo / HoYoverse', 'CN', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'miHoYo / HoYoverse');

INSERT INTO authors (name, country, notes)
SELECT 'priest', 'CN', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'priest');

INSERT INTO authors (name, country, notes)
SELECT 'Álvaro Lopez', 'ES', NULL
WHERE NOT EXISTS (SELECT 1 FROM authors WHERE name = 'Álvaro Lopez');
