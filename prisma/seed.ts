// import { PrismaClient, UserRole } from '@prisma/client';

// const prisma = new PrismaClient();

// const main = async () => {
//   console.log('Start seeding...');

//   // Create users
//   // const password = await bcrypt.hash('password', 10);
//   await prisma.user.create({
//     data: {
//       name: 'isAdmin1',
//       email: 'admin1@example.com',
//       password: "password@123",
//       role: UserRole.ADMIN,
//     },
//   });
//   await prisma.user.create({
//     data: {
//       name: 'isStudent1',
//       email: 'student1@example.com',
//       password: "password@123",
//       role: UserRole.STUDENT,
//     },
//   });
//   await prisma.user.create({
//     data: {
//       name: 'isTeacher1',
//       email: 'teacher1@example.com',
//       password: "password@123",
//       role: UserRole.TEACHER,
//     },
//   });

//   console.log('Seeding completed.');
// };

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create users
    const user1 = await prisma.user.create({
      data: {
        name: 'Wowe',
        email: 'Wowe@gmail.com',
        password: 'password123',
        role: 'STUDENT'
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: 'njyewe',
        email: 'njyewe@hotmail.com',
        password: 'password456',
        role: 'ADMIN',
      },
    });

    // Create courses
    const course1 = await prisma.course.create({
      data: {
        courseName: 'Mathematics',
        credits: 3,
        courseStudents: ['John Doe', 'Jane Smith'],
        slug: 'mathematics',
      },
    });

    const course2 = await prisma.course.create({
      data: {
        courseName: 'Science',
        credits: 4,
        courseStudents: ['John Doe'],
        slug: 'science',
      },
    });

    const class1 = await prisma.class.create({
      data: {
        className: 'Class 1',
        slug: 'class-1',
      },
    });

    const class2 = await prisma.class.create({
      data: {
        className: 'Class 2',
        slug: 'class-2',
      },
    });

    // Populate students
    const student1 = await prisma.student.create({
      data: {
        studentName: 'John Doe',
        studentAge: 20,
        studentClass: class1.id.toString(),
        studentCourse: 'Course 1',
        slug: 'john-doe',
      },
    });

    const student2 = await prisma.student.create({
      data: {
        studentName: 'Jane Smith',
        studentAge: 22,
        studentClass: class2.id.toString(),
        studentCourse: 'Course 2',
        slug: 'jane-smith',
      },
    });
    // Create test
    const test1 = await prisma.test.create({
      data: {
        name: 'Midterm Exam',
        description: 'Test your knowledge in the midterm exam.',
        courseId: course1.id,
      },
    });

    const test2 = await prisma.test.create({
      data: {
        name: 'Final Exam',
        description: 'Test your knowledge in the final exam.',
        courseId: course2.id,
      },
    });

    // Create test results
    const testResult1 = await prisma.testResult.create({
      data: {
        result: 80,
        createdAt: new Date(),
        test: {
          connect: {
            id: test1.id,
          },
        },
        user: {
          connect: {
            id: user1.id,
          },
        },
      },
    });


    const testResult2 = await prisma.testResult.create({
      data: {
        result: 70,
        createdAt: new Date(),
        test: {
          connect: {
            id: test2.id,
          },
        },
        user: {
          connect: {
            id: user2.id,
          },
        },
      },
    });


    // Create course enrollment
    const enrollment1 = await prisma.courseEnrollment.create({
      data: {
        courseId: course1.id,
        userId: user1.id,
      },
    });

    const enrollment2 = await prisma.courseEnrollment.create({
      data: {
        courseId: course2.id,
        userId: user2.id,
      },
    });

    console.log('Seed data created successfully.');
  } catch (error) {
    console.error('Error creating seed data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('Error in seed script:', error);
});

