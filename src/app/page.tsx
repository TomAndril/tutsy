import prisma from "./db";

async function getAllUsers() {
  const res = await prisma.user.findMany();
  if (res) {
    return res;
  }
  return null;
}

export default async function Home() {
  const data = await getAllUsers();
  return (
    <main>
      
    </main>
  );
}
