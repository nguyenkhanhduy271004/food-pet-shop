import contactInfoModel from "../models/contact.info.model.js";

const addContactInfoService = async (data) => {
    try {
        const newContactInfo = new contactInfoModel({
            ...data
        })

        await newContactInfo.save();
        return { success: true, message: 'Contact added successfully' };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Contact failed successfully' };

    }
}

export { addContactInfoService }