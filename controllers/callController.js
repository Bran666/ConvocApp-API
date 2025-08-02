// Enlazamos el servicio(capa) de usuario
const callService = require("../services/callService");

const getAllCalls = async (req, res) => {
    const allCalls = await callService.getAllCalls();
    if (allCalls) {
        res.status(200).send({ status: "Ok", data: allCalls });
    } else {
        res.status(400).send({ status: "Error", message: null });
    }
};

const getCallById = async (req, res) => {
  const id = req.params.id;
  const call = await callService.getCallById(id);
  if (call) {
    res.status(200).send({ status: "Ok", data: call });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const createCall = async (req, res) => {
const {
  title,
  description,
  resources,
  callLink,
  openDate,
  closeDate,
  pageName,
  pageUrl,
  objective,
  notes,
  imageUrl,
  institutionId,
  lineId,
  targetAudienceId,
  interestId,
  userId,
  clickCount
} = req.body;

  const newCall = await callService.createCall(
  title,
  description,
  resources,
  callLink,
  openDate,
  closeDate,
  pageName,
  pageUrl,
  objective,
  notes,
  imageUrl,
  institutionId,
  lineId,
  targetAudienceId,
  interestId,
  userId,
  clickCount);

  if (newCall) {
    res.status(200).send({ status: "Ok", data: newCall });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const updateCall = async (req, res) => {
  const id = req.params.id;
  const {
  title,
  description,
  resources,
  callLink,
  openDate,
  closeDate,
  pageName,
  pageUrl,
  objective,
  notes,
  imageUrl,
  institutionId,
  lineId,
  targetAudienceId,
  interestId,
  userId,
  clickCount } = req.body;
  const updatedUser = await callService.updateCall(
  id,
  title,
  description,
  resources,
  callLink,
  openDate,
  closeDate,
  pageName,
  pageUrl,
  objective,
  notes,
  imageUrl,
  institutionId,
  lineId,
  targetAudienceId,
  interestId,
  userId,
  clickCount);
  if (updatedUser) {
    res.status(200).send({ status: "Ok", data: updatedUser });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

const deleteCall = async (req, res) => {
  const id = req.params.id;
  const deletedCall = await callService.deleteCall(id);
  if (deletedCall) {
    res.status(200).send({ status: "Ok", data: deletedCall });
  } else {
    res.status(400).send({ status: "failed", message: null });
  }
};

module.exports = {
  getAllCalls,
  getCallById,
  createCall,
  updateCall,
  deleteCall,
};
