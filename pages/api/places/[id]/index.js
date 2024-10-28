import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      response.status(404).json({ status: "Not Found" });
      return;
    }

    response.status(200).json(place);
    return;
  }

  if (request.method === "PUT") {
    const placeData = request.body;
    await Place.findByIdAndUpdate(id, placeData);

    response.status(200).json({ status: "Place updated." });

    return;
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: "Place deleted." });
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
}
