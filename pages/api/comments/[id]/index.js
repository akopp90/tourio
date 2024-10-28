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

  if (request.method === "POST") {
    const formData = request.body;
    console.log("formData", formData);
    await Comment.create(formData);
    return response.status(201).json({ status: "Comment created." });
  }

  if (request.method === "DELETE") {
    await Comment.findByIdAndDelete(id);
    return response
      .status(200)
      .json({ status: "Comment successfully deleted." });
  }

  return response.status(405).json({ message: "Method not allowed" });
}
