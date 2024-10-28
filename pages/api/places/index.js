import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();

    response.status(200).json(places);
    return;
  }
  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);

      response.status(200).json({
        status:
          "<Image src={'https://http.cat/200'} width={300px} height={300px}/> success!",
      });
      return;
    } catch (error) {
      console.error(error);
      response.status(400).json({
        error:
          "<Image src={'https://http.cat/400'} width={300px} height={300px}/>" &
          error.message,
      });
      return;
    }
  }

  response.status(405).json({
    status:
      "<Image src={'https://http.cat/405'} width={300px} height={300px}/> Method not allowed.",
  });
}
