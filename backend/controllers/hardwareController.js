import Hardware from "../models/hardwareSchema.js";
import hubspotPrivateApp from "../hubspot/hubspotConnection.js";

const getItems = async (req, res) => {
    try {
        const hardware = await Hardware.find();
        const hubspotResponse = await hubspotPrivateApp.get('/crm/v3/objects/hardwares');
        return res.status(200).json({
            hardware,
            hubspotData: hubspotResponse.data
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error to get Items', error: err });
    }
};

const postItem = async (req, res) => {
    try {
        const hardware = await Hardware.create(req.body);
    
        const hubspotResponse = await hubspotPrivateApp.post('/crm/v3/objects/hardwares', {
            properties: {
                name: req.body.name,
                category: req.body.category,
                price: req.body.price
            }
        });

        hardware.hubspotId = hubspotResponse.data.id;
        await hardware.save();

        return res.status(200).json(hardware);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error to create Item', error: err });
    }
};

const updateItem = async (req, res) => {
    try {
        const hardware = await Hardware.findById(req.params.id);

        if (!hardware) {
            return res.status(404).json({ message: 'Item not found' });
        }

        hardware.name = req.body.name;
        hardware.category = req.body.category;
        hardware.price = req.body.price;
        const updatedHardware = await hardware.save();

        if (!hardware.hubspotId) {
            return res.status(400).json({ message: 'HubSpot ID not found' });
        }

        await hubspotPrivateApp.patch(`/crm/v3/objects/hardwares/${hardware.hubspotId}`, {
            properties: {
                name: req.body.name,
                category: req.body.category,
                price: req.body.price
            }
        });

        return res.status(200).json(updatedHardware);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error to update Item', error: err });
    }
};

const deleteItem = async (req, res) => {
    try {
        const hardware = await Hardware.findById(req.params.id);
        
        if (!hardware) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (hardware.hubspotId) {
            await hubspotPrivateApp.delete(`/crm/v3/objects/hardwares/${hardware.hubspotId}`);
        }

        await Hardware.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error to delete Item', error: err });
    }
};


const getCategories = async (req, res) => {
    try {
        const categories = await Hardware.distinct('category');
        return res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error to get Categories', error: err });
    }
}

export { getItems, postItem, updateItem, deleteItem, getCategories }