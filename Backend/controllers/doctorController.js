import doctorModel from "../models/doctormodel.js";

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: "Doctor's availability changed successfully" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export { changeAvailability };