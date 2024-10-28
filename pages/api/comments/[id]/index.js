import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  console.log(id);

  if (request.method === "GET") {
    const foundComments = await Comment.find({ placeId: id });
    console.log("comments", foundComments);

    if (!foundComments) {
      response.status(404).json({ status: "Not Found" });
      return;
    }

    response.status(200).json(foundComments);
    return;
  }

  return;
}
