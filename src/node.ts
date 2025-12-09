import prisma from "./prisma.js";
import bcrypt from 'bcrypt';


console.log("running node script");
// const password = await bcrypt.hash("12345678", 10);
// const students = await prisma.student.createMany({
//     data: [
//         {
//             firstName: "Shohjahon", 
//             lastName: "Ahmedov", 
//             password: password,
//             uniqueIdentifier: "1234578",
//             email: "akhmedovshokhjakhon3@gmail.com"
//         },
//         {
//             firstName: "Zubair", 
//             lastName: "Babadar", 
//             password: password,
//             uniqueIdentifier: "12345789",
//             email: "ahmshohjahon@gmail.com"
//         },
//         {
//             firstName: "Eldona", 
//             lastName: "Rama", 
//             password: password,
//             uniqueIdentifier: "1234578910",
//             email: "shox_0502@gmail.com"
//         }
//     ]
// });

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

// console.log(await prisma.student.findUnique({
//     where: {
//         email: "akhmedovshokhjakhon3@gmail.com"
//     }
// }));

console.log(await prisma.student.findMany())