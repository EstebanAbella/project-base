import type { NextApiRequest, NextApiResponse } from 'next'
import { clientListType } from '../../../../models/models'
import { withAuthController }  from '../../../../controller/withAuthController';
import ClientService from '../../../../services/ClientService';
import { generateInvalidError } from '../../../../helpers/errors';

interface DataSuccess {
    message: String
    clients?: clientListType[],
    client?: clientListType
}

interface DataError {
    message: String
}
type Data = DataSuccess | DataError

const route = (req: NextApiRequest, res: NextApiResponse<Data>): void => {
    switch (req.method) {
        case 'GET': {
            if (req.query.id) {
                const client = ClientService.getAllClients().find(client => client.id === req.query.id)
                res.status(200).json({
                    message: (client) ? 'OK' : 'Client not found',
                    client
                })
                return
            }
            const clients = ClientService.getAllClients();
            res.status(200).json({
                message: 'OK',
                clients
            })
            break
        }
        case 'POST': {
            const valid = ClientService.validateClient(req.body)
            if (!valid) {
                generateInvalidError(res);
                return
            }
            
            const client = ClientService.addClient(
                req.body,
            );
            res.status(200).json({
                message: (client) ? 'OK' : 'Client not found',
                client
            })
            break
        }

        case 'PUT': {
            const valid = ClientService.validateClient(req.body)
            if (!valid) {
                generateInvalidError(res);
                return
            }
            
            const client = ClientService.updateClient(
                req.body,
                { where: (client: clientListType) => client.id === req.body.id }
            );
            res.status(200).json({
                message: (client) ? 'OK' : 'Client not found',
                client
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