import { Router } from 'express'
import { issueController } from './issue.controller'
import auth from '../../middleware/auth.middleware'
import { authorizeRoles } from '../../middleware/authorizeRoles'

const router = Router()

router.post('/', 
    auth,
    authorizeRoles("contributor", "maintainer"),
    issueController.createIssue)

router.get('/', issueController.getAllIssues)

router.get('/:id', issueController.getIssueById)  

router.put('/:id',
    auth,
    authorizeRoles("contributor", "maintainer"),
    issueController.updateIssueById)

router.delete('/:id',
    auth,
    authorizeRoles("maintainer"),
    issueController.deleteIssueById)

export const issuesRoutes = router