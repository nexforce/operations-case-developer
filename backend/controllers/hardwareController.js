import Hardware from "../models/hardwareSchema.js";

const getItems = async (req, res) => {
    try {
        const hardware = await Hardware.find();
        return res.status(200).json(hardware);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error', error: err });
    }
};

const postItem = async (req, res) => {
    try {
        const hardware = await Hardware.create(req.body);
        return res.status(200).json(hardware);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error', error: err });
    }
};

const updateItem = async (req, res) => {
    try {
        const hardware = await Hardware.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(hardware);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error', error: err });
    }
};

const deleteItem = async (req, res) => {
    try {
        const hardware = await Hardware.findByIdAndDelete(req.params.id);
        return res.status(200).json(hardware);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error', error: err });
    }
};

export { getItems, postItem, updateItem, deleteItem }