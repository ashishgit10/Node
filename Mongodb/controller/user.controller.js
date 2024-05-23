import User from "../models/User.model.js"

const register = async (req, res) => {
    const body = req.body
    try {
        await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            gender: body.gender,
        })
        return res.status(201).json({ status: "User Created Successfully" })
    } catch (err) {
        console.log("User Creation Unsuccessfully", err)
        return res.status(404).json({ status: "User Creation Unsuccessfully" })
    }

}


const find = async (req, res) => {
    try {
        const id = (req.params.id)
        const exist = await User.findById(id)
        return res.json(exist)
    } catch (err) {
        console.log("User not found", err)
        return res.status(404).json({ status: "User not found" })
    }
}

const update = async (req, res) => {
    try {
        const id = (req.params.id)
        await User.findByIdAndUpdate(id, { lastName: "Hero changed" })
        return res.json({ status: "Successfully changed" })

    } catch (err) {
        console.log("Unable to update User", err)
        return res.status(404).json({ status: "Unable to update User" })
    }

}
const removeUser = async (req, res) => {
    try {
        const id = (req.params.id)
        await User.findByIdAndDelete(id)
        return res.json({ status: "Successfully deleted" })
    } catch (err) {
        console.log("Unable to delete User", err)
        return res.status(404).json({ status: "Unable to delete User" })
    }

}

export { register, find, update, removeUser } 