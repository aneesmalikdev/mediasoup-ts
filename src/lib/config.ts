import {
  RtpCodecCapability,
  TransportListenInfo,
  WorkerLogLevel,
  WorkerLogTag,
} from 'mediasoup/node/lib/types'
import os from 'os'

export const config = {
  listenIp: '0.0.0.0',
  listenPort: 1234,

  mediasoup: {
    numWorkers: os.cpus().length,
    worker: {
      rtcMinPort: 10000,
      rtcMaxPort: 10100,
      logLevel: 'debug' as WorkerLogLevel,
      logTags: ['info', 'ice', 'dtls', 'rtp', 'srtp', 'rtcp'] as WorkerLogTag[],
    },
    // enableWebRtcTransport: true,
    // enableRtpMux: true,
    // enableSctp: true,
    // sctpMaxMessageSize: 65536,
    // sctpChunkSize: 1024,
    // dtlsParameters: {
    //   role: 'server',
    //   certificate: '/path/to/certificate.pem',
    //   privateKey: '/path/to/private_key.pem',
    //   },
    router: {
      mediaCodecs: [
        {
          kind: 'audio',
          mimeType: 'audio/opus',
          //   name: 'opus',
          clockRate: 48000,
          channels: 2,
        },
        {
          kind: 'video',
          mimeType: 'video/VP8',
          //   name: 'VP8',
          clockRate: 90000,
          parameters: {
            'x-google-start-bitrate': 1000,
          },
          resolution: { width: 640, height: 480 },
          frameRate: 30,
        },
      ] as RtpCodecCapability[],
    },
    // webRtcTransport settings
    webRtcTransport: {
      listenIps: [
        {
          ip: '0.0.0.0.0',
          announcedIp: '127.0.0.1',
        },
      ] as TransportListenInfo[],
    },
  },
}
