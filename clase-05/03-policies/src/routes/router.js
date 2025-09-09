import { Router as ExpressRouter } from "express";

export default class Router {
    constructor(){
        this.router = ExpressRouter()
        this.init()
    }

    getRouter(){
        return this.router
    }

    init(){} // metodo a implementar en las clases hijas

    get(path, ...callbacks){
        this.router.get(path, this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    post(path, ...callbacks){
        this.router.post(path, this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    delete(path, ...callbacks){
        this.router.delete(path, this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    put(path, ...callbacks){
        this.router.put(path, this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    generateCustomResponses(req, res, next){
        res.sendSuccess = function(payload){
            res.send({status: 'success', payload})
        }
        res.sendServerError = function(error){
            res.status(500).send({status: 'error', error})
        }
        res.sendUserError = function(error){
            res.status(400).send({status: 'error', error})
        }
        next()
    }

    applyCallbacks(callbacks){
        return callbacks.map(callback => async(...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.log(error)
                params[1].status(500).send({error})
            }
        })
    }
}