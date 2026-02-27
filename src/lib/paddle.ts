import { Environment, Paddle } from '@paddle/paddle-node-sdk'

// Prevent instantiation on the client side
if (typeof window !== 'undefined') {
    throw new Error('Paddle SDK should only be initialized on the server.')
}

export const paddle = new Paddle(
    process.env.PADDLE_API_KEY as string,
    { environment: process.env.PADDLE_ENVIRONMENT === 'sandbox' ? Environment.sandbox : Environment.production }
)
