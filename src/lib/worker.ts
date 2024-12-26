import * as mediasoup from 'mediasoup'
import { config } from './config'
import { Worker } from 'mediasoup/node/lib/WorkerTypes'
import { Router } from 'mediasoup/node/lib/RouterTypes'

const worker: { worker: Worker; Router: Router }[] = []

let nextMSWorkerIdx: number = 0

export async function createWorker() {
  const worker = await mediasoup.createWorker({
    logLevel: config.mediasoup.worker.logLevel,
    logTags: config.mediasoup.worker.logTags,
    rtcMinPort: config.mediasoup.worker.rtcMinPort,
    rtcMaxPort: config.mediasoup.worker.rtcMaxPort,
  })
  console.log('mediasoup worker created')
  worker.on('died', async () => {
    console.error('mediasoup worker died, exiting...')
    process.exit(1)
  })
  const router = await worker.createRouter({ mediaCodecs: config.mediasoup.router.mediaCodecs })
  return { worker, router }
}
