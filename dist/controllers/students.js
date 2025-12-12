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
export const markAttendance = async (req, res, next) => {
    try {
        const { attendanceId, code } = req.body;
        const studentId = req.user.id;
        const attendance = await prisma.attendance.update({
            where: {
                id: attendanceId,
                qrCode: { code }
            },
            data: {
                students: {
                    connect: {
                        id: studentId,
                    }
                }
            }
        });
        res.status(200).json({ message: "Attendance marked successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: "Failed to mark attendance. Invalid attendance ID or code." });
    }
};
