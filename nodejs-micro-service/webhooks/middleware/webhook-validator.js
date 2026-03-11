const z = require("zod")


const eventTypeEnum = z.enum([
    "order_placed",
    "order_cancelled",
    "order_dispatched"
])


const webhookSchema = z.enum({
    type: eventTypeEnum,
    id: z.string(),
    customer: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email()
    })
})

function validator(req, res, next) {
//   console.log(req.body,"validaqtor")
    try {
        webhookSchema.safeParse(req.body)
        return next()
    } catch (error) {
        return res.status(400).json({
            err: true,
            message: "Schema did not match",
            issues: error?.issues ?? undefined,
        })
    }

}

module.exports = {
    validator
}