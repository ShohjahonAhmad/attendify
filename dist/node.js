import prisma from "./prisma.js";
const students = await prisma.student.deleteMany();
// const attendance = await prisma.attendance.update({
//     where: {
//         id: 4
//     },
//     data: {
//         students: {
//             create: [
//                 {
//                     firstName: "Shohjahon", 
//                     lastName: "Ahmedov", 
//                     password: "12345678",
//                     uniqueIdentifier: "12345678"
//                 },
//                 {
//                     firstName: "Zubair", 
//                     lastName: "Babadar", 
//                     password: "12345678",
//                     uniqueIdentifier: "123456789"
//                 },
//                 {
//                     firstName: "Eldona", 
//                     lastName: "Rama", 
//                     password: "12345678",
//                     uniqueIdentifier: "12345678910"
//                 }
//             ]
//         }
//     }
// })
// console.log(await prisma.student.findMany());
