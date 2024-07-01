import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Example usage
//
// async function main() {
//   const allArtists = await db.artist.findMany();
//   console.log(allArtists);
// }
//
// main();

export default db;
