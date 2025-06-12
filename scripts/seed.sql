-- Create tables and seed initial data
-- This will be handled by Prisma migrations

-- Insert sample academic calendar events
INSERT INTO "CalendarEvent" (id, title, description, "startDate", "endDate", type, "createdAt", "updatedAt") VALUES
('cal1', 'Term 1 Opening', 'First term begins', '2024-01-15T08:00:00Z', '2024-01-15T08:00:00Z', 'term', NOW(), NOW()),
('cal2', 'Mid-term Break', 'One week break', '2024-02-19T00:00:00Z', '2024-02-25T23:59:59Z', 'holiday', NOW(), NOW()),
('cal3', 'Term 1 Closing', 'End of first term', '2024-04-05T15:00:00Z', '2024-04-05T15:00:00Z', 'term', NOW(), NOW()),
('cal4', 'KCSE Examinations', 'National examinations period', '2024-10-21T08:00:00Z', '2024-11-22T17:00:00Z', 'exam', NOW(), NOW());

-- Insert sample staff members
INSERT INTO "Staff" (id, name, position, subjects, "imageUrl", email, phone, bio, "order", "createdAt", "updatedAt") VALUES
('staff1', 'Mr. John Kamau', 'Principal', '{}', '/placeholder.svg?height=300&width=300', 'principal@kasikeuboys.ac.ke', '+254700000001', 'Experienced educator with over 20 years in secondary education.', 1, NOW(), NOW()),
('staff2', 'Mrs. Mary Wanjiku', 'Deputy Principal', '{"Mathematics", "Physics"}', '/placeholder.svg?height=300&width=300', 'deputy@kasikeuboys.ac.ke', '+254700000002', 'Mathematics and Physics teacher with excellent track record.', 2, NOW(), NOW()),
('staff3', 'Mr. Peter Ochieng', 'Head of Sciences', '{"Chemistry", "Biology"}', '/placeholder.svg?height=300&width=300', 'sciences@kasikeuboys.ac.ke', '+254700000003', 'Science department head specializing in Chemistry and Biology.', 3, NOW(), NOW()),
('staff4', 'Ms. Grace Mutua', 'English Teacher', '{"English", "Literature"}', '/placeholder.svg?height=300&width=300', 'english@kasikeuboys.ac.ke', '+254700000004', 'Passionate about language and literature education.', 4, NOW(), NOW());

-- Insert sample news
INSERT INTO "News" (id, title, content, excerpt, "imageUrl", published, "createdAt", "updatedAt", "authorId") VALUES
('news1', 'Excellent KCSE Results 2023', 'Kasikeu Boys High School has once again demonstrated academic excellence with outstanding KCSE results. Our students achieved a mean score of 8.2, with 85% of candidates qualifying for university admission.

The school recorded impressive performances across all subjects, with particular strength in Mathematics, Sciences, and Languages. We congratulate our students, teachers, and parents for this remarkable achievement.

Principal Mr. John Kamau attributed the success to dedicated teaching staff, improved facilities, and strong parental support. The school continues to invest in quality education and character development.', 'Outstanding KCSE performance with 85% university qualification rate', '/placeholder.svg?height=400&width=600', true, NOW(), NOW(), 'admin'),
('news2', 'New Science Laboratory Opened', 'We are excited to announce the opening of our state-of-the-art science laboratory, equipped with modern apparatus and safety equipment. This facility will enhance practical learning in Physics, Chemistry, and Biology.

The laboratory features:
- Modern workbenches and equipment
- Safety shower and eyewash stations  
- Fume hoods for chemical experiments
- Digital microscopes and projectors
- Chemical storage facility

This investment demonstrates our commitment to providing quality science education and preparing students for STEM careers.', 'Modern science laboratory now operational for enhanced practical learning', '/placeholder.svg?height=400&width=600', true, NOW(), NOW(), 'admin');

-- Insert sample blog posts
INSERT INTO "Blog" (id, title, content, excerpt, "imageUrl", published, slug, tags, "createdAt", "updatedAt", "authorId") VALUES
('blog1', 'Preparing for KCSE: Study Tips for Success', 'The Kenya Certificate of Secondary Education (KCSE) is a crucial milestone in every student''s academic journey. Here are proven strategies to help you excel:

## Time Management
Create a realistic study timetable that allocates adequate time for each subject. Prioritize subjects based on your strengths and weaknesses.

## Active Learning Techniques
- Practice past papers regularly
- Form study groups with classmates
- Use mind maps for complex topics
- Teach concepts to others

## Exam Preparation
- Start revision early
- Focus on understanding rather than memorization
- Take regular breaks to avoid burnout
- Maintain a healthy lifestyle

## Subject-Specific Tips
**Mathematics**: Practice daily, master formulas, show all working
**Sciences**: Understand concepts, practice diagrams, learn definitions
**Languages**: Read widely, practice essay writing, expand vocabulary

Remember, consistent effort and proper preparation are key to KCSE success.', 'Essential study strategies and tips for KCSE examination success', '/placeholder.svg?height=400&width=600', true, 'preparing-for-kcse-study-tips', '{"KCSE", "Study Tips", "Examinations", "Academic Success"}', NOW(), NOW(), 'admin');

-- Insert admission information
INSERT INTO "AdmissionInfo" (id, title, content, requirements, fees, documents, deadlines, "createdAt", "updatedAt") VALUES
('admission1', 'Form One Admission Requirements', 'Kasikeu Boys High School welcomes applications for Form One admission. We seek students who demonstrate academic potential and good character.

## Academic Requirements
Students must have completed Standard Eight and obtained their KCPE results. We consider students with a minimum score that aligns with our academic standards.

## Application Process
1. Obtain application form from the school office
2. Submit completed form with required documents
3. Attend interview if shortlisted
4. Await admission decision

## School Fees Structure
Our fees are competitive and cover tuition, boarding, meals, and learning materials. Payment plans are available to support families.

## What We Offer
- Quality education following the Kenyan curriculum
- Experienced and dedicated teaching staff
- Modern facilities and resources
- Co-curricular activities and sports
- Character development programs
- University preparation support

We look forward to welcoming new students to our school community.', 
'{"KCPE Certificate", "Birth Certificate", "Passport Photos", "Medical Report", "Transfer Certificate"}',
'Contact school office for current fee structure',
'{"Application Form", "KCPE Certificate Copy", "Birth Certificate Copy", "4 Passport Photos", "Medical Report", "Transfer Certificate (if applicable)"}',
'Applications open in November each year',
NOW(), NOW());

-- Insert sample notifications
INSERT INTO "Notification" (id, title, message, type, priority, "targetAudience", published, "expiresAt", "createdAt", "updatedAt", "authorId") VALUES
('notif1', 'Term 2 Opening Date Confirmed', 'Term 2 will officially begin on Monday, May 6th, 2024. All students are expected to report by 6:00 PM on Sunday, May 5th. Please ensure all fees are cleared before reporting.', 'info', 'high', 'all', true, '2024-05-10T23:59:59Z', NOW(), NOW(), 'admin'),
('notif2', 'URGENT: Parent-Teacher Meeting', 'All parents are required to attend the Parent-Teacher meeting scheduled for Saturday, April 20th, 2024, starting at 9:00 AM. This is mandatory for all parents. Please confirm your attendance.', 'urgent', 'urgent', 'parents', true, '2024-04-25T23:59:59Z', NOW(), NOW(), 'admin'),
('notif3', 'New Science Laboratory Equipment', 'We are excited to announce the arrival of new laboratory equipment for our Physics and Chemistry labs. Students will begin using the new equipment starting next week.', 'success', 'normal', 'students', true, NULL, NOW(), NOW(), 'admin'),
('notif4', 'Staff Development Workshop', 'All teaching staff are required to attend the CBC transition workshop on Friday, April 12th, 2024. The workshop will run from 8:00 AM to 4:00 PM in the school hall.', 'warning', 'high', 'staff', true, '2024-04-15T23:59:59Z', NOW(), NOW(), 'admin'),
('notif5', 'Library Extended Hours', 'The school library will now be open until 8:00 PM on weekdays to support students with their studies. Weekend hours remain 9:00 AM to 5:00 PM.', 'info', 'normal', 'students', true, NULL, NOW(), NOW(), 'admin');
