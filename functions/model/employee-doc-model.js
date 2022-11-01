exports.driverLicenseModel = (data) => {
  const driverLicenseData = {
    number: data.number ?? 0,
    type: data.type ?? "",
    restriction: data.restriction ?? "",
    imageURL: data.imageURL ?? "",
  };

  return driverLicenseData;
};

exports.otherDetails = (data) => {
  const otherDetailsData = {
    sssNumber: data.sssNumber ?? "",
    philHealthNumber: data.philHealthNumber ?? "",
    pagIbigNumber: data.pagIbigNumber ?? "",
    tinNumber: data.tinNumber ?? 0,
    employeeID: data.employeeID ?? 0,
    employeePosition: data.employeePosition ?? "",
    modOfPayment: data.modOfPayment ?? "",
  };
  return otherDetailsData;
};
