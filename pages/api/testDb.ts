// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../dbUtils/createDbConnection";

type Data = {
  message: string;
  success: boolean;
};
const getPosts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const data = await connectToDatabase();
    const db = data?.db;

    let posts = await db?.collection("posts").find({}).toArray();
    return res.json({
      message: JSON.parse(JSON.stringify(posts)),
      success: true,
    });
  } catch (error) {
    // return the error
    console.error(error);
    // const err = new Error(error).message
    return res.json({
      //   message: `new Error(error).message,`,
      message: `Error`,
      success: false,
    });
  }
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET": {
      return getPosts(req, res);
    }
  }
}
