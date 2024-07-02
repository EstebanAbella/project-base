import type { NextApiRequest, NextApiResponse } from 'next'
import { itemType } from '../../../../models/models'
import { withAuthController }  from '../../../../controller/withAuthController';
import ItemService from '../../../../services/ItemService';
import { generateInvalidError } from '../../../../helpers/errors';

interface DataSuccess {
    message: String
    items?: itemType[],
    item?: itemType
}

interface DataError {
    message: String
}
type Data = DataSuccess | DataError

const route = (req: NextApiRequest, res: NextApiResponse<Data>): void => {

    switch (req.method) {
        case 'GET': {
            if (req.query.id) {
                const item = ItemService.getAllItems().find(item => item.id === Number(req.query.id))
                res.status(200).json({
                    message: (item) ? 'OK' : 'Item not found',
                    item
                })
                return
            }
            const items = ItemService.getAllItems();
            res.status(200).json({
                message: 'OK',
                items
            })
            break
        }
        case 'POST': {
            const valid = ItemService.validateItem(req.body)
            if (!valid) {
                generateInvalidError(res);
                return
            }
            
            const item = ItemService.addItem(
                req.body,
            );
            res.status(200).json({
                message: (item) ? 'OK' : 'Item not found',
                item
            })
            break
        }

        case 'PUT': {
            const valid = ItemService.validateItem(req.body)
            if (!valid) {
                generateInvalidError(res);
                return
            }
            
            const item = ItemService.updateItem(
                req.body,
                { where: (item: itemType) => item.id === req.body.id }
            );
            res.status(200).json({
                message: (item) ? 'OK' : 'Item not found',
                item
            })
            break
        }

        default: {

            res.status(406).json({
                message: 'Method not allowed'
            })
            break
        }
    }
}

export default withAuthController(route);