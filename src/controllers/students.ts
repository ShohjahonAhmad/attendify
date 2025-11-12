import { RequestHandler } from "express";
import prisma from "../prisma.js";
import generatePassword from "../utils/generatePassword.js";
import {sendStudentInfo} from "../utils/confirmEmail.js"

export const createStudents : RequestHandler = async (req, res, next) => {
    let studentsRequest = req.body.students;

    studentsRequest = studentsRequest.map((student: any) => ({...student, password: generatePassword()}))

    const students = await prisma.student.createManyAndReturn({
        data: studentsRequest,
        omit: {
            createdAt: true,
            updatedAt: true,
            id: true
        }
    })
    
    const failedEmails: string[] = [];
    
    for(let student of students){
        const isSuccessful = await sendStudentInfo(student);
        if(!isSuccessful){
            failedEmails.push(student.email)
        }
    }

    if(failedEmails.length > 0){
        res.status(500).json({
            error: "Failed to email student credentials to student emails",
            failedEmails
        },
        );
        return;
    }

    res.status(201).json({students})
}