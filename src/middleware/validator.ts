import { body, validationResult} from 'express-validator'
import  { Request, Response, NextFunction } from "express";

export const registerOrganizationValidator = () => {
    
    return [
        body('email').isEmail().withMessage('invalid email'),
        body('email').notEmpty().withMessage('email cannot be empty'),
        body('cnpj').isLength({ min: 14 }).withMessage('invalid cnpj'),
        body('rsocial').notEmpty().withMessage('razao social cannot be empty')
    ]
}
    
export const validate = (req:Request, res:Response, next:NextFunction) => {
    
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors:any[] = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}
