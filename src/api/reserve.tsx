import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { data } = req.body;
    // Process the data here (e.g., save to a database)
    res.status(200).json({ message: "Data received: " + data });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
