-- Create sample news articles
INSERT INTO "News" (id, title, content, excerpt, "imageUrl", published, "createdAt", "updatedAt", "authorId") VALUES
('news1', 'Welcome to New Academic Year 2024', 'We are excited to welcome all students back for the new academic year. This year promises to be filled with exciting opportunities for learning and growth.', 'Welcome message for the new academic year', '/placeholder.svg?height=400&width=600', true, NOW(), NOW(), 'admin1'),
('news2', 'Sports Day 2024 Results', 'Congratulations to all participants in our annual Sports Day. The event was a huge success with record participation from all houses.', 'Sports Day 2024 results and highlights', '/placeholder.svg?height=400&width=600', true, NOW(), NOW(), 'admin1'),
('news3', 'New Science Laboratory Opening', 'We are proud to announce the opening of our new state-of-the-art science laboratory, equipped with modern equipment for enhanced learning.', 'New science lab facility announcement', '/placeholder.svg?height=400&width=600', false, NOW(), NOW(), 'admin1');

-- Create sample calendar events
INSERT INTO "CalendarEvent" (id, title, description, "startDate", "endDate", type, "createdAt", "updatedAt") VALUES
('event1', 'First Term Begins', 'Start of the first academic term', '2024-01-15 08:00:00', '2024-01-15 17:00:00', 'term', NOW(), NOW()),
('event2', 'Mid-term Break', 'Mid-term holiday break', '2024-02-15 00:00:00', '2024-02-19 23:59:59', 'holiday', NOW(), NOW()),
('event3', 'Science Fair', 'Annual school science fair and exhibition', '2024-03-10 09:00:00', '2024-03-10 16:00:00', 'event', NOW(), NOW()),
('event4', 'First Term Exams', 'End of term examinations', '2024-03-20 08:00:00', '2024-03-25 17:00:00', 'exam', NOW(), NOW());

-- Create sample staff members
INSERT INTO "Staff" (id, name, position, subjects, "imageUrl", email, phone, bio, "order", "createdAt", "updatedAt") VALUES
('staff1', 'Mr. John Kamau', 'Principal', '{}', '/placeholder.svg?height=300&width=300', 'principal@kasikeuboys.ac.ke', '+254700000001', 'Experienced educator with over 20 years in school administration.', 1, NOW(), NOW()),
('staff2', 'Mrs. Mary Wanjiku', 'Deputy Principal', '{}', '/placeholder.svg?height=300&width=300', 'deputy@kasikeuboys.ac.ke', '+254700000002', 'Dedicated to student welfare and academic excellence.', 2, NOW(), NOW()),
('staff3', 'Mr. Peter Mwangi', 'Mathematics Teacher', '{"Mathematics", "Physics"}', '/placeholder.svg?height=300&width=300', 'pmwangi@kasikeuboys.ac.ke', '+254700000003', 'Mathematics and Physics teacher with 15 years experience.', 3, NOW(), NOW()),
('staff4', 'Ms. Grace Akinyi', 'English Teacher', '{"English", "Literature"}', '/placeholder.svg?height=300&width=300', 'gakinyi@kasikeuboys.ac.ke', '+254700000004', 'Passionate about language and literature education.', 4, NOW(), NOW());

-- Create sample gallery images
INSERT INTO "Gallery" (id, title, description, "imageUrl", category, "createdAt", "updatedAt") VALUES
('gallery1', 'School Main Building', 'Our beautiful main academic building', '/placeholder.svg?height=400&width=600', 'facilities', NOW(), NOW()),
('gallery2', 'Science Laboratory', 'State-of-the-art science laboratory', '/placeholder.svg?height=400&width=600', 'facilities', NOW(), NOW()),
('gallery3', 'Sports Day 2024', 'Students participating in athletics', '/placeholder.svg?height=400&width=600', 'sports', NOW(), NOW()),
('gallery4', 'Graduation Ceremony', 'Class of 2023 graduation ceremony', '/placeholder.svg?height=400&width=600', 'events', NOW(), NOW()),
('gallery5', 'Mathematics Class', 'Students in mathematics lesson', '/placeholder.svg?height=400&width=600', 'academics', NOW(), NOW());

-- Create sample blog posts
INSERT INTO "Blog" (id, title, content, excerpt, "imageUrl", published, slug, tags, "createdAt", "updatedAt", "authorId") VALUES
('blog1', 'Tips for Academic Success', 'Here are some proven strategies to help students excel in their studies...', 'Academic success tips for students', '/placeholder.svg?height=400&width=600', true, 'tips-for-academic-success', '{"study tips", "academics", "students"}', NOW(), NOW(), 'admin1'),
('blog2', 'The Importance of Extracurricular Activities', 'Extracurricular activities play a crucial role in student development...', 'Benefits of participating in school activities', '/placeholder.svg?height=400&width=600', true, 'importance-of-extracurricular-activities', '{"activities", "development", "students"}', NOW(), NOW(), 'admin1'),
('blog3', 'Preparing for National Exams', 'A comprehensive guide to preparing for KCSE examinations...', 'KCSE preparation guide for students', '/placeholder.svg?height=400&width=600', false, 'preparing-for-national-exams', '{"exams", "KCSE", "preparation"}', NOW(), NOW(), 'admin1');

-- Create sample admission information
INSERT INTO "AdmissionInfo" (id, title, content, requirements, fees, documents, deadlines, "createdAt", "updatedAt") VALUES
('admission1', 'Form 1 Admission 2024', 'Information about Form 1 admission for the year 2024', '{"KCPE certificate", "Birth certificate", "Passport photos"}', 'KSh 45,000 per term', '{"KCPE certificate", "Birth certificate", "Medical certificate", "Passport photos"}', 'Applications close on December 15, 2023', NOW(), NOW());

-- Create sample notifications
INSERT INTO "Notification" (id, title, message, type, priority, "targetAudience", published, "expiresAt", "createdAt", "updatedAt", "authorId") VALUES
('notif1', 'School Reopening Date', 'School will reopen on January 15, 2024. All students should report by 8:00 AM.', 'info', 'high', 'all', true, '2024-01-20 00:00:00', NOW(), NOW(), 'admin1'),
('notif2', 'Fee Payment Reminder', 'Parents are reminded to clear school fees before the end of the month.', 'warning', 'normal', 'parents', true, '2024-02-01 00:00:00', NOW(), NOW(), 'admin1'),
('notif3', 'Sports Day Registration', 'Registration for Sports Day is now open. Students can register with their class teachers.', 'success', 'normal', 'students', true, '2024-03-01 00:00:00', NOW(), NOW(), 'admin1');
