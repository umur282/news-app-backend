const parseBufferToJson = (bufferData) => {
  const stringData = bufferData.toString();
  const jsonData = JSON.parse(stringData);
  return jsonData;
}

module.exports = { parseBufferToJson };