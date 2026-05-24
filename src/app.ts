import express, { type Application, type Request, type Response } from 'express'
import { authRoutes } from './module/auth/auth.route'
import { issuesRoutes } from './module/issue/issue.route'
import globalErrorHandler from './middleware/globalError'

const app: Application = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {    
    res.send('Server is running!')
})

app.use('/api/auth', authRoutes)

app.use('/api/issues', issuesRoutes)



app.use(globalErrorHandler);

export default app