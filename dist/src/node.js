import prisma from "./prisma.js";
console.log("running node script");
const students = await prisma.student.findMany({});
// const students = await prisma.student.deleteMany();
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
console.log("salom");
