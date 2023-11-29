export default function handler(req, res) {
  // const pinCodes = [2270,9070,1370,4370];
  const pinCodes = {
    2200: ["Mymensingh",'Mymensingh'],
    2370: ["Dhaka",'Dhaka'],
    2470: ["Sylhet",'Sylhet'],
    2570: ["Khulna",'Khulna']
  };
  res.status(200).json(pinCodes);
}
