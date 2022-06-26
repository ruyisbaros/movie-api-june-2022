
exports.notFound = (req, res) => {

    res.status(404).json({ message: "Unknown endpoint! Server has no response for this endpoint." });
}