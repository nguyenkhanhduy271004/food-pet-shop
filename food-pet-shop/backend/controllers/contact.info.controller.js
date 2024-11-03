import { addContactInfoService } from "../services/contact.info.service.js";

const addContactInfoController = async (req, res) => {
    try {
        console.log(req.body.data);

        const response = await addContactInfoService(req.body.data);

        if (response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(500).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export { addContactInfoController };
