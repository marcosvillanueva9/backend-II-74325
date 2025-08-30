import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
    res.render('home', {})
})

viewsRouter.get('/register', (req, res) => {
    res.render('register', {})
})

viewsRouter.get('/forgot-password', (req, res) => {
    res.render('forgot-password', {})
})

export default viewsRouter;