import prisma from "../prisma.js";
import generatePassword from "../utils/generatePassword.js";
import { sendStudentInfo } from "../utils/confirmEmail.js";
export const createStudents = async (req, res, next) => {
    let studentsRequest = req.body.students;
    studentsRequest = studentsRequest.map((student) => ({ ...student, password: generatePassword() }));
    const students = await prisma.student.createManyAndReturn({
        data: studentsRequest,
        omit: {
            createdAt: true,
            updatedAt: true,
            id: true
        }
    });
    const failedEmails = [];
    for (let student of students) {
        const isSuccessful = await sendStudentInfo(student);
        if (!isSuccessful) {
            failedEmails.push(student.email);
        }
    }
    if (failedEmails.length > 0) {
        res.status(500).json({
            error: "Failed to email student credentials to student emails",
            failedEmails
        });
        return;
    }
    res.status(201).json({ students });
};
