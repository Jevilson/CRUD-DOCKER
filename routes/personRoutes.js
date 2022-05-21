const router = require('express').Router()
const Person = require('../models/Person')

// ADD PESSOA
router.post('/', async (req, res) => {

    const {name, salary, approved} = req.body

    if(!name) {
        res.status(422).json({message: 'Nome é obrigatório!'})
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        
        await Person.create(person)
        res.status(201).json({message: 'Pessoa inserida no sistema con sucesso!'})

    } catch (error) {
        res.status(500).json({message: error})
    }
})

// VER TODAS PESSOAS
router.get('/', async (req, res) => {
    try {
        
        const people = await Person.find()
        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({message: error})
    }
})

// VER PESSOA POR ID
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        
        const person = await Person.findOne({_id: id})

        if(!person){
            res.status(422).json({message: "Pessoa não foi encontrada!"})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(422).json({message: "Pessoa não foi encontrada!"})
    }



})

// ATUALIZAR PESSOA
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {
        
        const update = await Person.updateOne({_id: id}, person)

        if (update.matchedCount === 0) {
            res.status(422).json({message: "Pessoa não foi encontrada!"})
            return
        }
        
        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({message: error})
    }

})


// DELETA A PESSOA
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({_id: id})

    if(!person){
        res.status(422).json({message: "Pessoa não foi encontrada!"})
        return
    }

    try {
        
        await Person.deleteOne({_id: id})
        res.status(200).json({message: "Pessoa apagada com sucesso!"})

        
    } catch (error) {
        res.status(500).json({message: error})
    }

})


module.exports = router
