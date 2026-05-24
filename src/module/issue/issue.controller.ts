import type { Request, Response } from "express"
import { issueService } from "./issue.service"
import AppError from "../../utils/appError"

const createIssue = async (req: Request, res: Response) => {
         if (!req.user) {
            throw new Error('User not found')
        }

        const result = await issueService.createIssueIntoDB(req.body, req.user)

        res.status(201).json({
            success: true,
            message: 'Issue Created Successfully',
            data: result,
        })
}

const getAllIssues = async (req: Request, res: Response) => {
         const filters = {
            sort: req.query.sort as string,
            type: req.query.type as string,
            status: req.query.status as string,
        }

    const result = await issueService.getAllIssuesFromDB(filters)

    res.status(200).json({
        success: true,
        data: result,
    })

}

const getIssueById = async (req: Request, res: Response) =>{
        const { id } = req.params

        const result = await issueService.getIssueByIdFromDB(id as string)

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Issue not found",
            })
        }

        res.status(200).json({
            success: true,
            data: result,
        })
}   

const updateIssueById = async (req: Request, res: Response)=>{
         if (!req.user) {
            throw new AppError(404, 'User not found')
        }

        const { id } = req.params
        const result = await issueService.updateIssueByIdInDB(req.body, req.user, id as string)

        res.status(200).json({
            success: true,
            message: 'Issue updated successfully',
            data: result
        })
}

const deleteIssueById = async (req: Request, res: Response)=>{
    if (!req.user) {
        throw new AppError(404, "User Not Found");
    }

    const { id } = await req.params;
    const result = await issueService.deleteIssueByIdFromDB(
        req.user,
        id as string,
    );

    res.status(200).json({
        success: true,
        message: 'Issue deleted successfully',
    })

}

export const issueController = {
    getAllIssues,
    getIssueById,
    createIssue,
    updateIssueById,
    deleteIssueById
}