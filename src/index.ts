import 'reflect-metadata'
import './utils/dotenv-config'
import { APP } from './containers/types'
import { IServer } from './server'

const load = async (): Promise<void> => {
  const { iocContainer } = await import('./containers/container')
  const server = iocContainer.get<IServer>(APP.server)
  server.start()
}

load().catch((error) => {
  console.log('error server', error)
  process.exit(1)
})
