const {
  createEmpDoc,
  getEmpDoc,
  deleteDoc,
} = require("../../repositories/employee-mod-repo");
const { response } = require("../../util/response");
const {
  driverLicenseModel,
  otherDetails,
} = require("../../model/employee-doc-model");
exports.createEmployeeDocuments = async (req, res) => {
  try {
    // TODO FILE UPLOAD INTEGRATION
    const driverLicenseDetails = req.body.driverLicenseDetails;
    const otherDetails = req.body.otherDetails;
    const otherDetailsToModel = otherDetails(otherDetails);
    const driverLicenseToModel = driverLicenseModel(
      driverLicenseDetails,
      otherDetailsToModel
    );
    createEmpDoc(driverLicenseToModel, otherDetails).then((val) => {
      response(res, 200, "successfully create a document", "success");
    });
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.getEmployeeDocuments = async (req, res) => {
  try {
    getEmpDoc().then((val) => {
      response(res, 200, "successfully create a document", val);
    });
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const id = req.body.documentID;
    deleteDoc(id).then((val) => {
      response(res, 200, "successfully delete a document", val);
    });
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const id = req.body.documentID;
    const status = req.body.status;
    updateStatus(id, status).then((val) => {
      response(res, 200, "successfully create a document", val);
    });
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};
