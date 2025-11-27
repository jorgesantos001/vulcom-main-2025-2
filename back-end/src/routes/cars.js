/*
    Vulnerabilidade: API9:2023 – Gerenciamento inapropriado do inventário
    Foi evitada por manter a documentação das rotas adequada sem expor endpoints de debug.
*/
import { Router } from 'express'
import controller from '../controllers/cars.js'

const router = Router()

router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router